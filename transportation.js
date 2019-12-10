class Transportation {
  constructor(parsecDistance) {
    this.parsecDistance = parsecDistance;
    this.marsDistance = 1.4e8;
    this.marsTime = 1.11e7;
    this.parsecToMile = 1.917e13;
    this.mileDistance = null;
    this.destinationTime = null;
    this.formattedTime = null;
    this.rockets = {
      url: "https://api.spacexdata.com/v3/rockets",
      data: []
    };
    this.dragons = {
      url: "https://api.spacexdata.com/v3/dragons",
      data: []
    };
    this.launchpads = {
      url: "https://api.spacexdata.com/v3/launchpads",
      data: []
    };
  }

  convertParsecToMile() {
    return this.parsecDistance * this.parsecToMile;
  }

  calculateTravelTime() {
    return (this.mileDistance / this.marsDistance * this.marsTime).toFixed(2);
  }

  formatTime() {
    this.mileDistance = this.convertParsecToMile();
    this.calculateTravelTime = this.calculateTravelTime();
    let timeInCalculation = this.calculateTravelTime;
    let timeSegments = {
      millennium: {
        convertion: 3.15e10,
        time: null
      },
      centry: {
        convertion: 3.15e9,
        time: null
      },
      decade: {
        convertion: 3.15e8,
        time: null
      },
      year: {
        convertion: 3.15e7,
        time: null
      },
      month: {
        convertion: 2.63e6,
        time: null
      },
      day: {
        convertion: 86400,
        time: null
      },
      hour: {
        convertion: 3600,
        time: null
      },
      minute: {
        convertion: 60,
        time: null
      },
      second: {
        convertion: 1,
        time: null
      }
    }
    for (let key in timeSegments) {
      if (timeInCalculation >= timeSegments[key].convertion) {
        timeSegments[key].time = this.separateTime(timeSegments[key].convertion, timeInCalculation);
        timeInCalculation = this.getRemainedTime(timeSegments[key].convertion);
      } else {
        timeSegments[key].time = 0;
      }
    }
    console.log("time needed: " + timeSegments.millennium.time + " millennium, " + timeSegments.centry.time + " centry, " + timeSegments.decade.time + " decade, " + timeSegments.year.time + " year, " + timeSegments.month.time + " month, " + timeSegments.day.time + " day, " + timeSegments.hour.time + " hour, " + timeSegments.minute.time + " minute, " + timeSegments.second.time + " second");
    this.formattedTime = timeSegments.millennium.time + " millennium, " + timeSegments.centry.time + " centry, " + timeSegments.decade.time + " decade, " + timeSegments.year.time + " year, " + timeSegments.month.time + " month, " + timeSegments.day.time + " day, " + timeSegments.hour.time + " hour, " + timeSegments.minute.time + " minute, " + timeSegments.second.time + " second"
    return {
      timeInSeconds: this.calculateTravelTime,
      formattedTime: this.formattedTime
    }
  }

  separateTime(timeConvertionNumber, remainingTime) {
    return Math.floor(remainingTime / timeConvertionNumber);
  }

  getRemainedTime(timeConvertionNumber) {
    return this.calculateTravelTime % timeConvertionNumber;
  }

  sendApiRequest(type) {
    const apiRequest = new ApiGenerator(type.url);
    const apiRequestResponse = apiRequest.getResponse(type.url, "json");
    console.log("apiRequest is: ", apiRequest);
    console.log("apiRequestResponse is: ", apiRequestResponse);
  }
}
//create entertainment class using time

//get spaceX spaceship info using api
//display spaceships dynamically
//dynamically display space ship data
//user choose spaceship

//use google map api to show route?
