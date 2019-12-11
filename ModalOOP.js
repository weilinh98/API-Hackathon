class Modal {
  constructor() {
    this.generatesDestinations = this.generatesDestinations.bind(this);
  }

  createIntroModal() {
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
      text: "Triggered!",
    });
    modalText.text("You Can Change This To Anything You Like To Say!");
    modalButton.click(this.generatesDestinations);

    modalContainer.append(modalText, modalButton);
    $("body").append(modalContainer);
  }

  generatesDestinations() {
    this.destroyModal();
    var destinationDrop = new Destination();
    destinationDrop.checkToRun();
    var taco = new Taco();
  }

  //below is a basic dynamic-creation structure if we want to do it dynamically;

  // createSkeleton() {
  //   var andrew = $("<div>", {
  //     id: "andrew",
  //     class: "temporart_container",
  //   });
  //   var yun = $("<div>", {
  //     id: "yun",
  //     class: "temporart_container",
  //   });
  //   var weilin = $("<div>", {
  //     id: "weilin",
  //     class: "temporart_container",
  //   });
  //   $("body").append(andrew, yun, weilin);
  // }

  destroyModal() {
    $("div").remove("#introductionModal");
  }
}
