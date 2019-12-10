class Taco{
  constructor(){
    this.randomTacoUrl = "http://taco-randomizer.herokuapp.com/random/";
    this.tacoGenerator = $('#taco-generator');
    this.tacoDomElement = null;
    this.tacoResponse = null;
    this.getTacoDataFromServer = this.getTacoDataFromServer.bind(this);
    this.processGetTacoDataFromServer = this.processGetTacoDataFromServer.bind(this);
  }

  addClickHandler(){
    this.tacoGenerator.on('click', this.getTacoDataFromServer);
  }

  getTacoDataFromServer(){
    var ApiForTaco = new ApiGenerator(this.randomTacoUrl, this.processGetTacoDataFromServer);
    this.tacoResponse = ApiForTaco.getResponse(this.randomTacoUrl, "json");
    this.processGetTacoDataFromServer(this.tacoResponse);
  }

  processGetTacoDataFromServer(response){
    var unprocessedTaco = {
      baseLayer: response.base_layer.slug.replace(/_/g, " "),
      condiment: response.condiment.slug.replace(/_/g, " "),
      mixin: response.mixin.slug.replace(/_/g, " "),
      seasoning: response.seasoning.slug.replace(/_/g, " "),
      shell: response.shell.slug.replace(/_/g, " "),
    };
    var taco = this.formatTacoName(unprocessedTaco);
    var tacoName = taco.baseLayer + " with " + taco.condiment + " garnished with " + taco.mixin + " topped off with " + taco.seasoning + " wrapped in " + taco.shell;
    this.updateRecipeOnDom(tacoName);
  }

  formatTacoName(taco) {
    for (var key in taco) {
      var partNameInArray = taco[key].split(" ");
      var partWord = null;
      for (var i = 0; i < partNameInArray.length; i++) {
        if (partNameInArray[i] === "us") {
          partWord = "US";
        }
        else {
          partWord = partNameInArray[i].replace(partNameInArray[i].charAt(0), partNameInArray[i].charAt(0).toUpperCase());
        }
        partNameInArray[i] = partWord;
      }
      taco[key] = partNameInArray.join(" ");
    }
    return taco;
  }

  updateRecipeOnDom(taconame) {
    $('#taco-name').text(taconame);
    $('.taco-recipe').show();
  }

}
