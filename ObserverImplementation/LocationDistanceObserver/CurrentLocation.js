module.exports = class CurrentLocation {
    constructor() {
        this.longitude = Math.floor(Math.random() * 1000);
        this.latitude = Math.floor(Math.random() * 1000);
    }
    

    changeLocation() {
        let dir = Math.round(Math.random() * 4);

        switch (dir) {
            case 0:
                this.incementLong();
                break;
            case 1:
                this.decrementLong();
                break;
            case 2:
                this.incementLat();
                break;
            case 3:
                this.decrementLat();
                break;
            default:
                break;
        }
    }

    incementLong() {
        this.longitude = (this.longitude + 10) % 1000;
    }

    decrementLong() {
        this.longitude = (this.longitude - 10);
        this.longitude = this.longitude < 0 ? 999 : this.longitude;
    }

    incementLat() {
        this.latitude = (this.latitude + 10) % 1000;
    }

    decrementLat() {
        this.latitude = (this.latitude - 10);
        this.latitude = this.latitude < 0 ? 999 : this.latitude;
    }
}

