class Destination {

  constructor() {
    this.responsePlanet = null;
    this.responseDistance = null;
    this.responseTemp = null;
    this.responseMass = null;

    this.planetApi = null;
    this.planetDistance = null;
    this.planetTemp = null;
    this.planetMass = null;

    this.destinationUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select= pl_name';
    this.destinationDistanceUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select= st_dist';
    this.destinationTemp = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select= st_teff';
    this.destinationMass = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select= st_mass';

    this.confirmButton = $('<button>', {
      class: 'confirm_destination_button'
    }).text('confirm');
    this.imageUrl = ['images/space1.jpg', 'images/space2.jpg', 'images/space3.jpg', 'images/space4.jpg', 'images/space5.jpg', 'images/space6.jpg', 'images/space7.jpg'];

    this.returnValues1 = this.returnValues1.bind(this);
    this.returnValues2 = this.returnValues2.bind(this);
    this.returnValues3 = this.returnValues3.bind(this);
    this.returnValues4 = this.returnValues4.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  getResponse1() {
    this.planetApi = new ApiGenerator(this.destinationUrl, this.returnValues1);
    this.planetApi.getResponse(this.destinationUrl, 'text');
  }
  getResponse2() {
    this.planetDistance = new ApiGenerator(this.destinationDistanceUrl, this.returnValues2);
    this.planetDistance.getResponse(this.destinationDistanceUrl, 'text');

    this.planetTemp = new ApiGenerator(this.destinationTemp, this.returnValues3);
    this.planetTemp.getResponse(this.destinationTemp, 'text');

    this.planetMass = new ApiGenerator(this.destinationMass, this.returnValues4);
    this.planetMass.getResponse(this.destinationMass, 'text');
  }

  returnValues1(response) {
    this.responsePlanet = response.split('\n');
    this.destinationsRender();
  }
  returnValues2(response) {
    this.responseDistance = response.split('\n');
  }
  returnValues3(response) {
    this.responseTemp = response.split('\n');
  }
  returnValues4(response) {
    this.responseMass = response.split('\n');
  }

  checkToRun() {
    this.getResponse1();
    this.getResponse2();
  }

// I transformed a form into a drop-down menu; There is a better way! Just do the drop-down menu directly without creating a select and option first;

  destinationsRender() {
    var wholeContainer = $("<div>", {
      class: "wholeContainer",
      id: "wholeContainer",
    })
    // formContainer contains essentially every drop-down options and itself;
    var formContainer = $("<div>", {
      class: "formContainer",
    });
    var sideContainer = $("<div>", {
      class: "sideContainer",
    });
    // the original select-drop-down menu that will be hiden;
    var form = $("<select>", {
      name: "destinations",
      id: "selections",
      class: "destinations",
    });
    // the current selected element container;
    var selectContainer = $("<div>", {
      id: "selectContainer",
      class: "selectContainer select-selected",
    });
    // all the drop-down options, which would be hiden until #selectContainer is clicked;
    var optionContainer = $("<div>", {
      id: "options",
      class: "options select_hide",
    });

    for (var i = 0; i < this.responsePlanet.length; i++) {
      // original drop-down options;
      var option = $("<option>", {
        class: "destination_options",
        value: this.responsePlanet[i],
        text: this.responsePlanet[i],
      });
      if (i === 0) {
        selectContainer.text('Select Your Dream Planet');
      } else {
        var optionDiv = $("<div>", {
          class: "option_divs",
          text: option.text(),
        });
        optionDiv.on("click", this.handleChange);
        optionContainer.append(optionDiv);
      }
      form.append(option);
    }
    selectContainer.on("click", function (event) {
      event.stopPropagation();
      $("#options").toggleClass("select_hide");
      $(event.currentTarget).toggleClass("select_arrow_display");
    });

    var distance = $("<div>", {
      id: "distanceDisplay",
    });
    var temperature = $("<div>", {
      id: "temperatureDisplay",
    });
    var mass = $("<div>", {
      id: "massDisplay",
    });
    formContainer.append(form, selectContainer, optionContainer);
    sideContainer.append(distance, temperature, mass);
    wholeContainer.append(formContainer, sideContainer);
    $("body").append(wholeContainer);
    wholeContainer.click(this.handleClick);
    this.imageRender();
  }

  imageRender() {
    // image container
    var imageContainer = $("<div>", {
      class: "imageContainer",
    });
    imageContainer.appendTo(".sideContainer");
  }

  imageChange() {
    $(".imageContainer").empty();
    var randomNumber = Math.floor(Math.random()*this.imageUrl.length);
    var image = $("<img>", {
      class: "sideImage",
      src: this.imageUrl[randomNumber],
    });
    $(".imageContainer").append(image);
  }

  handleChange(event) {
    var currentText = $(event.currentTarget).text();
    var indexNumber = this.responsePlanet.indexOf(currentText);
    var distance = this.responseDistance[indexNumber];
    var temperature = this.responseTemp[indexNumber];
    var mass = this.responseMass[indexNumber];

    $("#distanceDisplay").text('Distance To The Destination Planet: ' + distance + ' parsec');
    $("#temperatureDisplay").text('Planet equailibrium Temperature(K):' + temperature);
    $("#massDisplay").text('Planet Stellar Mass (solar mass):' + mass);

    $(".sideContainer").append(this.confirmButton);
    $("#selectContainer").text('The Chosen One: ' + currentText.toUpperCase());
    this.handleCancel();
    // confirmButton
    $(".confirm_destination_button").click(() => {
      var rocket = new Transportation(parseInt(distance));
      $('#wholeContainer').empty();
      rocket.sendApiRequest(rocket.rockets);
    });
    this.imageChange();
  }

  handleClick() {
    if ($("#options").hasClass("sekect_hide")) {
      $("#wholeContainer").off("click", this.handleCancel);
    } else {
      $("#wholeContainer").on("click", this.handleCancel);
    }
  }

  handleCancel() {
    $("#options").addClass("select_hide");
  }
}
