$(document).ready(intializeApp);

function intializeApp() {
  $('body').empty();
  var taco = new Taco();
  taco.addClickHandler();

  //var test = new Transportation(3);
  //test.sendApiRequest(test.rockets);
  var introModal = new Modal();
  introModal.createIntroModal();

}
