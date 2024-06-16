import Location from "./location.js";

export default class Quest {
    constructor (name, instructions, location, person, image, searchImage, caseNo, hotspotCoords) {
        this.name = name;
        this.instructions = instructions;
        this.location = new Location(location[0], location[1]);
        this.person = person;
        this.image = image;
        this.searchImage = searchImage;
        this.caseNo = caseNo;
        this.hotspotCoords = hotspotCoords;
      }
}