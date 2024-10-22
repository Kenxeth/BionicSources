//  background stuff 
let options = {
    "element": "#granim-canvas",
    "direction": "left-right",
    "states": {
        "default-state":{
            gradients:[
                ["#000000", "#2c3e50"],
                ["#000428", "#004e92"],
            ],
            transitionSpeed: 2000,
            loop: true,
        }
    }
};
let granimInstance = new Granim(options);


let map;

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: 40.7831, lng: -73.9712 };
    // The map, centered at Uluru
     map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: uluru,
    });
  }

function addMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

// Uses lat/lng coordinates to get nearby places info of choice
async function getNearbyPlaces(lat, lng) {
    const proxy = "https://nextjs-cors-anywhere.vercel.app/api?endpoint=" //Proxy for API calls in localhost
    const nearbyPlacesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" //API URL for nearby places

    //Easier, more organized way to add URL Parameters to API request
    const options = new URLSearchParams({
        key: "keyIsHidden",
        radius: 16000, //Radius in meters. Basically, how far you want to look for places. So, I want to look as far as 16K meters for places
        location: lat + "," + lng, //latitute, longitude e.g. 40,-79
        keyword: "Hospitals" // Place search term. Could be something like "Rehab Center", "Recycling Centers", "Arcade", etc
    })

    // Try/Catch block to handle errors. "Tries the code" then if there are errors, "catches the errors" (not required, but good to have)
    try {
        const response = await fetch(proxy + nearbyPlacesAPI + options); //Fetch the API request. Combining the proxy with API URL & the options
        const data = await response.json(); //Data returned from the previous line. Here, we're turning the response into JSON
        return data; //Returning data
    }
    catch (err) {
        console.error(err.message); //If there are errors, log the error message
        return null; //Returning null
    }
}

// Transforms zip code into valid lat/lng coordinates
async function getCoordinatesWithZipCode(zip) {
    const proxy = "https://nextjs-cors-anywhere.vercel.app/api?endpoint=" //Proxy for API calls in localhost
    const geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?" //API URL for geocoding (turning address into lat/lng coordinates)

    //Easier, more organized way to add URL Parameters to API request
    const options = new URLSearchParams({
        key: "AIzaSyD5TYxI5yg7zRiJKWGyqm7P3a7ubq2ngUg", //API key
        address: zip //Zip code parameter (zip code)
    })

    // Try/Catch block to handle errors. "Tries the code" then if there are errors, "catches the errors" (not required, but good to have)
    try {
        const response = await fetch(proxy + geocodingAPI + options); //Fetch the API request. Combining the proxy with API URL & the options
        const data = await response.json(); //Data returned from the previous line. Here, we're turning the response into JSON
        return data; //Returning data
    }
    catch (err) {
        console.error(err.message); //If there are errors, log the error message
        return null; //Returning null
    }
}

// Main function that incorporates all the above functions and stores their return values, or data, in variables
async function doYourThing() {
    const zip = "10001"; //Zip code of interest
    const coordinates = await getCoordinatesWithZipCode(zip); //Get coordinates with zip code & store in variable

    //Use the coordinates to get nearby places. The coordinates are used as parameters for the nearby places API request
    const placeData = await getNearbyPlaces(coordinates.results[0].geometry.location.lat, coordinates.results[0].geometry.location.lng);
    console.log(placeData.results);

    for (let place of placeData.results) {
        addMarker(place.geometry.location);
    }
}

doYourThing();

//Run the main function, which does everything that was mentioned above
