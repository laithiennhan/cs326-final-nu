const pinpointList = document.getElementById('pinpoint-list');

const addPinpointBtn = document.getElementById('add-pinpoint')
const createRouteBtn = document.getElementById('create-route-btn');
const loadRouteBtn = document.getElementById('load-routes-btn');

const pinpoints = []
const fakeUserId = "0123456789" 

const addPinpoint = (e) => {
  const location = document.getElementById("pinpoint-input").value
  if (location === ''){
    alert('Please enter a location')
  } else {
    document.getElementById("pinpoint-input").value = ""
    const pinpoint = document.createElement("li")
    const t = document.createTextNode(location)
    pinpoint.className = "list-group-item d-flex justify-content-between align-items-center";
    pinpoint.appendChild(t)
    pinpointList.appendChild(pinpoint);
    pinpoints.push(location)
  } 
}

const timeInput = document.getElementById("time-input")
const speedInput = document.getElementById("speed-input")

const createRoute = async (e) => {
  e.preventDefault()
  speed = speedInput.value
  time = timeInput.value
  if (speed === ''){
    alert("Please select a speed")
    return
  }
  if (time === ''){
    alert("Please select a time")
    return
  }
  const dates = getDate();
  if (dates.length === 0) {
    alert("Please select a date")
    return
  }
  if (pinpointList.length === 0){
    alert("add locations")
    return
  }

  const response = await fetch('/api/paths', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pinpoints, dates, speed, time }),
  })

  const { data, message, status } = await response.json();
  if (status === 200) {
    location.href = "";
  } else {
    console.log("Error: " + status)
  }
}

const getUserRoutes = async (e) => {
  e.preventDefault();
  e.stopPropagation()
  const response = await fetch(`/api/paths/all/${fakeUserId}`,{
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
  })
  const { data, message, status } = await response.json();
  if (status === 200) {
    // location.href = "";
  } else {
    console.log("Error: " + response)
  }
  console.log(data)
  return data
}

const getDate = () => {
  res = []
  for (const date of ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]){
    if ( document.getElementById(date).checked ) {
      res.push(date)
    }
  }
  return res
}

addPinpointBtn.addEventListener("click", addPinpoint)
createRouteBtn.addEventListener("click", createRoute)
loadRouteBtn.addEventListener("click", getUserRoutes)