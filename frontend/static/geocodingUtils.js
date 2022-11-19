const mapboxToken = "pk.eyJ1IjoibGFpdGhpZW5uaGFuMDkiLCJhIjoiY2xhbXVvdDQ3MGdlcDNycXRud3QydnlzaSJ9.2OA98XNN6-jP-H14l-b0rQ"

export const validateAddress = async (pinpoint) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pinpoint}.json?access_token=${mapboxToken}`
  const res = await fetch(url)
  const result = await res.json()
  if (result["features"].length > 0) {
    return result["features"][0]["place_name"]
  } else {
    throw new Error("Please try a valid address")
  }
}

