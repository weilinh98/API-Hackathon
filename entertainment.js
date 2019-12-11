class Taco{
  constructor(){
    this.randomTacoUrl = "http://taco-randomizer.herokuapp.com/random/";
    this.tacoGenerator = $('#taco-generator');
    this.detailsPage = $('.details');
    this.cover = $('.cover');
    this.tacoDomElement = null;
    this.tacoResponse = null;
    this.getTacoDataFromServer = this.getTacoDataFromServer.bind(this);
    this.processGetTacoDataFromServer = this.processGetTacoDataFromServer.bind(this);
  }

  addClickHandler(){
    this.tacoGenerator.on('click', this.getTacoDataFromServer);
    this.cover.on('click', ()=>{this.cover.addClass('cover-rotate')});
    this.detailsPage.on('click', ()=> {this.detailsPage.addClass('details-rotate')});
  }

  getTacoDataFromServer(){
    var ApiForTaco = new ApiGenerator(this.randomTacoUrl, this.processGetTacoDataFromServer);
    ApiForTaco.getResponse(this.randomTacoUrl, "json");
  }

  processGetTacoDataFromServer(response){
    console.log(response);
    var taco = {
      baseLayer: response.base_layer.name,
      condiment: response.condiment.name,
      mixin: response.mixin.slug.name,
      seasoning: response.seasoning.name,
      shell: response.shell.name,
    };
    var recipe = {
      baseLayer: response.base_layer.recipe,
      condiment: response.condiment.recipe,
      mixin: response.mixin.slug.recipe,
      seasoning: response.seasoning.recipe,
      shell: response.shell.recipe,
    }
    var tacoName = taco.baseLayer + " with " + taco.condiment + " garnished with " + taco.mixin + " topped off with " + taco.seasoning + " wrapped in " + taco.shell;
    this.updateRecipeOnDom(tacoName, recipe);
  }


  updateRecipeOnDom(taconame, recipe) {
    $('.details').text(taconame);
    for(var key in recipe){
      var section = $('<div>').text(recipe[key]);
      $('.recipe').append(section);
    }
    $('.taco-recipe').show();
  }

}
