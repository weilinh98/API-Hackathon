$(document).ready(intializeApp);

function intializeApp() {
  var taco = new Taco();
  taco.addClickHandler();
  //var destinationDrop = new Destination();
  //destinationDrop.destinationsRender();
  var test = new Transportation(3);
  test.sendApiRequest(test.rockets);
  var introModal = new Modal();
  introModal.createIntroModal();
}
