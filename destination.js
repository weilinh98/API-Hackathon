class Destination {

  constructor(response) {
    this.responsePlanet = [1, 2, 3, 4];
    this.responseDistance = [5, 6, 7, 8];
    // this.planetApi = new ApiGenerator(this.destinationUrl);
    // this.planetDistance = new ApiGenerator(this.destinationDistanceUrl);
    // this.destinationUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select= pl_name';
    // this.destinationDistanceUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select= st_dist';

    // this.retrieveResponse = this.retrieveResponse.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  // apiRender() {
  //   this.planetApi.getResponse(this.destinationUrl, 'text');
  //   this.planetDistance.getResponse(this.destinationDistanceUrl, 'text');
  //   setTimeout(this.retrieveResponse, 1000);
  // }

  // retrieveResponse() {
  //   this.responsePlanet = this.planetApi.returnResponse();
  //   this.responseDistance = this.planetDistance.returnResponse();
  // }

  destinationsRender() {
    // this.apiRender();

    // formContainer contains essentially every drop-down options and itself;
    var formContainer = $("<div>", {
      class: "formContainer",
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
      class: "options select-hide",
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
        optionDiv.on("click", function() {
        });


        optionContainer.append(optionDiv);
      }
      form.append(option);
      selectContainer.on("click", function(event) {
        event.stopPropagation();
        this.closeAllSelect(this);
        optionContainer.toggleClass("select-hide");
      });
    }

    var distance = $("<div>", {
      id: "distanceDisplay",
    });

    formContainer.append(form, selectContainer, optionContainer);
    $("#andrew").append(formContainer, distance);
    form.on("change", this.handleChange);
  }

  handleChange() {
    var currentText = $("#selections option:selected").text();
    var indexNumber = this.responsePlanet.indexOf(currentText);
    var distance = this.responseDistance[indexNumber];
    $("#distanceDisplay").text('Distance To The Destination Planet: ' + distance + 'parsec');
  }

  this.closeAllSelect(element) {

  }
}
