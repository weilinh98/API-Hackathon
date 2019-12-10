$(document).ready(intializeApp);

function intializeApp() {

  var destinationDrop = new Destination();
  destinationDrop.destinationsRender();
  var taco = new Taco();
  taco.addClickHandler();

}
