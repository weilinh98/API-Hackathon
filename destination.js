class Destination {

  constructor() {
    this.responsePlanet = ['1', '2', '3', '4'];
    this.responseDistance = ['4', '3', '2', '1'];
    this.planetApi = null;
    this.planetDistance = null;
    this.destinationUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select= pl_name';
    this.destinationDistanceUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select= st_dist';
    this.confirmButton = $('<button>', {
      class: 'confirm_destination_button'
    }).text('confirm');
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  checkToRun() {
    this.destinationsRender();
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
    formContainer.append(form, selectContainer, optionContainer);
    $("#wholeContainer").append(formContainer, distance);
    $("body").append(wholeContainer);
    $("#wholeContainer").click(this.handleClick);
  }

  handleChange(event) {
    var currentText = $(event.currentTarget).text();
    var indexNumber = this.responsePlanet.indexOf(currentText);
    var distance = this.responseDistance[indexNumber];
    $("#distanceDisplay").text('Distance To The Destination Planet: ' + distance + ' parsec');
    $("#distanceDisplay").append(this.confirmButton);
    $("#selectContainer").text(currentText);
    this.handleCancel();
    $(".confirm_destination_button").click(() => {
      var rocket = new Transportation(parseInt(distance));
      $('#wholeContainer').empty();
      rocket.sendApiRequest(rocket.rockets);
    });
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
