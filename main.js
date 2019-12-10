$(document).ready(intializeApp);

function intializeApp() {

  var destinationDrop = new Destination();
  destinationDrop.checkToRun();
  var taco = new Taco();
  taco.addClickHandler();

}
