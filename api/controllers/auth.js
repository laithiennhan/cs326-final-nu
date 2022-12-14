import passport from "passport";
import User from "../models/users.js";
import { ExpressError } from "../utils/index.js";
import { MiniCrypt } from "../utils/miniCrypt.js";

const mc = new MiniCrypt();

export const login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json(info);
		}
		if (req.user && req.user._id !== user._id) {
			return next(new ExpressError("Another user has already logged in", 401));
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			return next();
		});
	})(req, res, next);
};

export const postLogin = (req, res, next) => {
	const redirectUrl = req.session.returnTo || "/";
	delete req.session.returnTo;
	res.status(200).json({ status: 200, message: "Log In", data: { redirectUrl } });
};

export const signup = async (req, res, next) => {
	const { username, email, password } = req.body;
	const foundUser = await User.findOne({ username });
	if (foundUser) {
		throw new ExpressError("User already exist", 405);
	}
	const [salt, hash] = mc.hash(password);
	const user = new User({ email, username, description: "", hash, salt });
	await user.save();
	req.login(user, (err) => {
		if (err) return next(err);
		res.status(200).json({ status: 200, message: "Sign Up" });
	});
};

export const logout = (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
		res.redirect("/");
	});
};

export const getCurrentUser = (req, res, next) => {
	res.status(200).json({
		status: 200,
		message: "",
		data: { ...req.user._doc, hash: undefined, salt: undefined },
	});
};
