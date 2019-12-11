class Taco{
  constructor(){
    this.randomTacoUrl = "http://taco-randomizer.herokuapp.com/random/";
    this.tacoGenerator = null;
    this.detailsPage = $('.details');
    this.cover = $('.cover');
    this.tacoDomElement = null;
    this.tacoResponse = null;
    this.getTacoDataFromServer = this.getTacoDataFromServer.bind(this);
    this.processGetTacoDataFromServer = this.processGetTacoDataFromServer.bind(this);
  }

  renderMain(){
    var container = $('<div>').attr('id', 'taco-container');
    var tacoSelection = $('<div>').addClass('taco-selection');
    var title = $('<h3>').text('Generate a Full Fantastic Taco Recipe for Your Trip!');
    this.tacoGenerator = $('<button>').attr('id', 'taco-generator').text('Get my Taco!').on('click', this.getTacoDataFromServer);
    $('body').append(container.append(tacoSelection.append(title, this.tacoGenerator)));
  }

  getTacoDataFromServer(){
    this.tacoGenerator.remove();
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
    this.renderRecipe(tacoName, recipe);
  }

  renderRecipe(tacoName, generatedRecipe) {
    var tacoRecipe = $('<div>').addClass('taco-recipe');
    var book = $('<div>').addClass('book');
    var cover = $('<div>').addClass('cover');
    var coverImage = $('<img>').attr('src', './taco-book.jpeg')
    var details = $('<div>').addClass('details').text(tacoName);
    var recipe = $('<div>').addClass('recipe').text(tacoRecipe);
    var part;
    for (var key in generatedRecipe) {
      part = $('<div>').text(generatedRecipe[key])
      recipe.append(part);
    }
    cover.append(coverImage);
    book.append(cover, details, recipe);
    $('body').append(tacoRecipe.append(book));
    cover.on('click', () => { cover.addClass('cover-rotate') });
    details.on('click', () => { details.addClass('details-rotate') });
  }

}
