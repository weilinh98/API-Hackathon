class Destination {

  constructor() {
    this.responsePlanet = null;
    this.responseDistance = null;
    this.planetApi = new ApiGenerator(this.destinationUrl);
    this.planetDistance = new ApiGenerator(this.destinationDistanceUrl);
    this.destinationUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select= pl_name';
    this.destinationDistanceUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select= st_dist';

    this.retrieveResponse = this.retrieveResponse.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  apiRender() {
    this.planetApi.getResponse(this.destinationUrl, 'text');
    this.planetDistance.getResponse(this.destinationDistanceUrl, 'text');
    setTimeout(this.retrieveResponse, 2000);
  }

  retrieveResponse() {
    this.responsePlanet = this.planetApi.returnResponse();
    this.responseDistance = this.planetDistance.returnResponse();
  }

  destinationsRender() {
    this.apiRender();
    var form = $("<select>", {
      name: "destinations",
      id: "selections",
    });
    setTimeout(function() {
      for (var i = 0; i < this.responsePlanet.length; i++) {
        var option = $("<option>", {
          class: "destination_options",
          value: this.responsePlanet[i],
          text: this.responsePlanet[i],
        });
        form.append(option);
      }
      var distance = $("<div>", {
        id: "distanceDisplay",
      });
      $("#andrew").append(form, distance);
      form.on("change", this.handleChange);
    }.bind(this), 2000);
  }

  handleChange() {
    var currentText = $("#selections option:selected").text();
    var indexNumber = this.responsePlanet.indexOf(currentText);
    var distance = this.responseDistance[indexNumber];
    $("#distanceDisplay").text(distance + 'parsec');
  }
}
