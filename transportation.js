class Transportation {
  constructor(parsecDistance) {
    this.parsecDistance = parsecDistance;
    this.marsDistance = 1.4e8;
    this.marsTime = 1.11e7;
    this.parsecToMile = 1.917e13;
    this.mileDistance = null;
    this.destinationTime = null;
    this.formattedTime = null;
  }

  convertParsecToMile() {
    return this.parsecDistance * this.parsecToMile;
  }

  calculateTravelTime() {
    return (this.parsecToMile / this.marsDistance * this.marsTime).toFixed(2);
  }

  formatTime() {
    this.mileDistance = this.convertParsecToMile();
    this.calculateTravelTime = this.calculateTravelTime();
    let timeInCalculation = this.calculateTravelTime;
    // let millennium = null;
    // let centry = null;
    // let decade = null;
    // let year = null;
    // let month = null;
    // let day = null;
    // let hour = null;
    // let minute = null;
    // let second = null;
    // const millenniumToSeconds = 3.15e10;
    // const centryToSeconds = 3.15e9;
    // const decadeToSeconds = 3.15e8;
    // const yearToSeconds = 3.15e7;
    // const monthToSeconds = 2.63e6;
    // const dayToSeconds = 86400;
    // const hourToSeconds = 3600;
    // const minuteToSeconds = 60;
    // if (timeInCalculation >= millenniumToSeconds) {
    //   millennium = this.separateTime(millenniumToSeconds, timeInCalculation);
    //   timeInCalculation = this.getRemainedTime(millenniumToSeconds);
    // }
    // if (timeInCalculation >= centryToSeconds) {
    //   centry = this.separateTime(centryToSeconds, timeInCalculation);
    //   timeInCalculation = this.getRemainedTime(centryToSeconds);
    // }
    // if (timeInCalculation >= decadeToSeconds) {
    //   decade = this.separateTime(decadeToSeconds, timeInCalculation);
    //   timeInCalculation = this.getRemainedTime(decadeToSeconds);
    // }
    // if (timeInCalculation >= )
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
      }
    }
    console.log("time needed: " + timeSegments.millennium.time + " millennium, " + timeSegments.centry.time + " centry, " + timeSegments.decade.time + " decade, " + timeSegments.year.time + " year, " + timeSegments.month.time + " month, " + timeSegments.day.time + " day, " + timeSegments.hour.time + " hour, " + timeSegments.minute.time + " minute, " + timeSegments.second.time + " second");
  }

  separateTime(timeConvertionNumber, remainingTime) {
    return Math.floor(remainingTime / timeConvertionNumber);
  }

  getRemainedTime(timeConvertionNumber) {
    return this.calculateTravelTime % timeConvertionNumber;
  }
}
//convert time to mm/cc/dd/yy/mm/dd/hh/mm/ss
//create entertainment class using time

//get spaceX spaceship info using api
//display spaceships dynamically
//dynamically display space ship data
//user choose spaceship

//use google map api to show route?
