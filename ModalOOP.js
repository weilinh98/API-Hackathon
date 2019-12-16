class Modal {
  constructor() {

    this.generatesDestinations = this.generatesDestinations.bind(this);
    this.flyBySentences = this.flyBySentences.bind(this);
  }

  createIntroModal() {
    $("body").append('<video autoplay muted loop id="backgroundVideo"> <source src="assets-for-taco/starburst.mp4" type="video/mp4"> </video>');
    var modalContainer = $("<div>", {
      id: "introductionModal",
      class: "introductionModal",
    });
    var modalText = $("<div>", {
      class: "modalTextContainer",
    });
    var modalButton = $("<button>", {
      class: "triggerButton",
      id: "triggerButton",
      text: "~ Go Among The Stars ~",
    });
    modalText.text("You Can Change This To Anything You Like To Say!");
    modalButton.click(this.generatesDestinations);

    modalContainer.append(modalText, modalButton);
    $("body").append(modalContainer);
    setInterval(this.flyBySentences, 2000);
  }

  generatesDestinations() {
    clearInterval(this.flyBySentences);
    this.destroyModal();
    var destinationDrop = new Destination();
    destinationDrop.checkToRun();
  }

  flyBySentences() {
    $("div").remove(".fly");
    var randomIndex1 = (Math.floor(Math.random()*4)+1);
    var randomX = (Math.floor(Math.random() * 800));
    var randomy = (Math.floor(Math.random() * 800));
    var coordinates = {top: randomX, left: randomy};
    var fly1 = $("<div>", {
      class: 'fly1 fly',
      text: 'Where Do We Go ~',
    });
    var fly2 = $("<div>", {
      class: 'fly2 fly',
      text: 'What Do We Do ~',
    });
    var fly3 = $("<div>", {
      class: 'fly3 fly',
      text: 'Ultimate pursuit ~',
    });
    var fly4 = $("<div>", {
      class: 'fly4 fly',
      text: 'Eternal Stars -',
    });
    var currentFlyTagClass = 'fly'+randomIndex1;
    eval(currentFlyTagClass).appendTo("#introductionModal");
    eval(currentFlyTagClass).offset(coordinates);
  }

  destroyModal() {
    $("div").remove("#introductionModal");
  }
}
