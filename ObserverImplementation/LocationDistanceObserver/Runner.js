const CurrentLocation = require("./CurrentLocation");

let currentLocation = new CurrentLocation();
let destination = {
    "lat": null,
    "long": null
};

destination.lat = Math.floor(Math.random() * 1000);
destination.long = Math.floor(Math.random() * 1000);

const calculateDifference = () => {
   return Math.sqrt(Math.pow(destination.lat - currentLocation.latitude, 2) + Math.pow(destination.long - currentLocation.longitude, 2));
}

setInterval(() => {
    currentLocation.changeLocation();
    console.log(calculateDifference());
}, 2000);

// const getDiffInDistance = () => {
//     currentLocation.changeLocation();
//     console.log(calculateDifference());
// }