import Location from "./location.js";

const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
};

export default class LocationDetector {
    clear() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    success(position) {
        this.position = new Location(position.coords.latitude, position.coords.longitude);
    }

    error() {
        this.position = new Location(-37.760471144507115, 144.96027260278717);
        console.error("Sorry, no position available.");
    }

    initialise() {
        this.position = new Location(0, 0);
        this.watchID = navigator.geolocation.watchPosition((position) => this.success(position), () => this.error(), options);
    }
}