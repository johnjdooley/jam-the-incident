
export default class Location {
    constructor (latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    distanceInMs(otherLocation)
    {
        let rlat1 = Math.PI*this.latitude/180;
        let rlat2 = Math.PI*otherLocation.latitude/180;
        let theta = this.longitude - otherLocation.longitude;
        let rtheta = Math.PI*theta/180;
        let dist =
            Math.sin(rlat1) * Math.sin(rlat2) + Math.cos(rlat1)*
            Math.cos(rlat2) * Math.cos(rtheta);
        dist = Math.acos(dist);
        dist = dist*180/Math.PI;
        dist = dist*60*1.1515;
    
        return dist*1.609344 * 1000;
    }
}