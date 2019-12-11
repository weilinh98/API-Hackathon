class Transportation {
  constructor(parsecDistance) {
    this.parsecDistance = parsecDistance;
    this.marsDistance = 1.4e8;
    this.marsTime = 1.11e7;
    this.parsecToMile = 1.917e13;
    this.mileDistance = null;
    this.destinationTime = null;
    this.formattedTime = null;
    this.request = null;
    this.response = null;
    this.selectedRocket = null;
    this.parentContainer = $('body');
    this.rockets = "https://api.spacexdata.com/v3/rockets/";
    this.dragons = "https://api.spacexdata.com/v3/dragons/";
    this.launchpads = "https://api.spacexdata.com/v3/launchpads/";
    this.classAttr = {
      pageContainer: 'transportation_page_container',
      titleContainer: 'transportation_title_container',
      titleSpan: 'transportation_title_span',
      rocketContainer: 'trainsportation_rocket_container',
      rocketImageContainer: 'transportation_rocket_image_container',
      rocketNameContainer: 'transportation_rocket_name_container',
      rocketNameSpan: 'transportation_rocket_name_span',
      rocketTextContainer: 'transportation_rocket_text_container',
      rocketTimeContainer: 'transportation_rocket_time_container',
      rocketButtonContainer: 'transportation_rocket_button_container',
      rocketInfoSpan: 'transportation_rocket_info_span',
      rocketTimeSpan: 'transportation_rocket_time_span'
    };

    this.retrieveResponse = this.retrieveResponse.bind(this);
    this.createRocketSelectionPage = this.createRocketSelectionPage.bind(this);
    this.getSingleRocketInfo = this.getSingleRocketInfo.bind(this);
    this.createRocketInfoPage = this.createRocketInfoPage.bind(this);
  }

  convertParsecToMile() {
    return this.parsecDistance * this.parsecToMile;
  }

  calculateTravelTime() {
    return (this.mileDistance / this.marsDistance * this.marsTime).toFixed(2);
  }

  formatTime(mod) {
    this.mileDistance = this.convertParsecToMile();
    this.destinationTime = this.calculateTravelTime();
    let timeInCalculation = (this.destinationTime * 2.25* Math.pow(2/3, mod-1)).toFixed(2);
    this.destinationTime = timeInCalculation;
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
    timeInCalculation = parseInt(timeInCalculation);
    for (let key in timeSegments) {
      if (timeInCalculation >= timeSegments[key].convertion) {
        timeSegments[key].time = this.separateTime(timeSegments[key].convertion, timeInCalculation);
        timeInCalculation = this.getRemainedTime(timeSegments[key].convertion, timeInCalculation);
      } else {
        timeSegments[key].time = 0;
      }
    }
    this.formattedTime ="Total travel time: " + timeSegments.millennium.time + " millennium, " + timeSegments.centry.time + " centry, "
      + timeSegments.decade.time + " decade, " + timeSegments.year.time + " year, " + timeSegments.month.time + " month, "
      + timeSegments.day.time + " day, " + timeSegments.hour.time + " hour, " + timeSegments.minute.time + " minute, "
      + timeSegments.second.time + " second";
    return {
      timeInSeconds: this.destinationTime,
      formattedTime: this.formattedTime
    }
  }

  separateTime(timeConvertionNumber, remainingTime) {
    return Math.floor(remainingTime / timeConvertionNumber);
  }

  getRemainedTime(timeConvertionNumber, remainingTime) {
    return remainingTime % timeConvertionNumber;
  }

  sendApiRequest(typeUrl) {
    this.request = new ApiGenerator(typeUrl, this.retrieveResponse);
    this.request.getResponse(typeUrl, "json");
  }

  retrieveResponse(response) {
    this.response = response;
    this.createRocketSelectionPage();
  }

  renderContainer(component, classAttr) {
    return $('<div>', {
      class: classAttr
    }).append(component);
  }

  renderSpan(text, classAttr) {
    return $('<span>', {
      class: classAttr
    }).text(text);
  }

  renderRocketImage(imgUrl, description) {
    return $('<img>', {
      src: imgUrl,
      alt: description
    });
  }

  createRocketSelectionPage() {
    this.parentContainer.empty();
    const titleDiv = this.renderContainer(this.renderSpan("Choose a vessel for your trip", this.classAttr.titleSpan), this.classAttr.titleContainer);
    this.parentContainer.append(this.renderContainer(titleDiv, this.classAttr.pageContainer));
    const pageContainer = $('.transportation_page_container');
    for (var i = 0; i < this.response.length; i++) {
      pageContainer.append(this.renderContainer(this.renderContainer(this.renderRocketImage(this.response[i].flickr_images[1], this.response[i].description), this.classAttr.rocketImageContainer),
        this.classAttr.rocketContainer).attr('rocket_id', this.response[i].rocket_id).append(this.renderContainer(this.renderSpan(this.response[i].rocket_name, this.classAttr.rocketNameSpan), this.classAttr.rocketNameContainer)));
    }
    $('.' + this.classAttr.rocketContainer).off();
    $('.' + this.classAttr.rocketContainer).click(this.getSingleRocketInfo);
  }

  getSingleRocketInfo() {
    this.selectedRocket = $(event.currentTarget).attr('rocket_id');
    const rocketName = this.rockets + this.selectedRocket;
    const singleRocket = new ApiGenerator(rocketName, this.createRocketInfoPage);
    singleRocket.getResponse(rocketName, "json");
    this.parentContainer.empty();
  }

  createRocketInfoPage(response) {
    this.formatTime(response.id);
    const titleDiv = this.renderContainer(this.renderSpan("You chose " + response.rocket_name, this.classAttr.titleSpan), this.classAttr.titleContainer);
    //const imageDiv = this.renderContainer(this.renderRocketImage(response.flickr_images[1], response.description), this.classAttr.rocketImageContainer + "2");
    const imageDiv = $('<div>', {
      class: this.classAttr.rocketImageContainer + "2"
    }).css("background-image", "url(" + response.flickr_images[1] + ")");
    const textDiv = $('<div>').append(this.renderContainer(this.renderSpan(response.description, this.classAttr.rocketInfoSpan), "innerRocketInfoText"), this.renderContainer(this.renderSpan(this.formattedTime, this.classAttr.rocketTimeSpan), "innerRocketInfoText"));
    const buttonDiv = this.renderContainer($('<button>').addClass('button confirmRocket').text('confirm'), this.classAttr.rocketButtonContainer).append($('<button>').addClass('button cancelRocket').text("cancel"));
    this.parentContainer.append(imageDiv.append($('<div>', {
      class: 'transportation_rocket_info_content_container'
    }).append(titleDiv, textDiv, buttonDiv)));

    $('.cancelRocket').off();
    $('.confirmRocket').off();
    $('.confirmRocket').click(() => {
      $('body').empty();
      const newTaco = new Taco();
      newTaco.renderMain();
    });
    $('.cancelRocket').click(() => {
      this.sendApiRequest(this.rockets);
    });
  }
}
