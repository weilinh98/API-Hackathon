class Taco{
  constructor(destinationTime){
    this.randomTacoUrl = "http://taco-randomizer.herokuapp.com/random/";
    this.tacoGenerator = null;
    this.tacoAmount = (parseInt(destinationTime)/86400)*10;
    this.tacoResponse = null;
    this.getTacoDataFromServer = this.getTacoDataFromServer.bind(this);
    this.processGetTacoDataFromServer = this.processGetTacoDataFromServer.bind(this);
  }

  renderMain(){
    var container = $('<div>').attr('id', 'taco-container');
    var tacoSelection = $('<div>').addClass('taco-selection');
    var title = $('<h3>').text('Generate a Full Fantastic Taco Recipe for Your Trip!');
    this.tacoGenerator = $('<img>').attr({'id': 'taco-generator','src': 'assets-for-taco/taco-png-bfdi-3.png'}).on('click', this.getTacoDataFromServer);
    container.append('<video autoplay muted loop id="backgroundVideo"> <source src="assets-for-taco/starburst.mp4" type="video/mp4"> </video>')
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
      mixin: response.mixin.recipe,
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
    var coverImage = $('<img>').attr('src', 'assets-for-taco/taco-book.jpeg')
    var details = $('<div>').addClass('details')
    var tacoMain = $('<h3>').text(tacoName);
    var recipe = $('<div>').addClass('recipe');
    var part = $('<div>');
    for (var key in generatedRecipe) {
      part.text(generatedRecipe[key]).css({'margin-right': '2px'})
    }
    recipe.append(part);
    cover.append(coverImage);
    book.append(cover, details.append(tacoMain), recipe);
    $('#taco-container').append(tacoRecipe.append(book));
    cover.on('click', () => { cover.toggleClass('cover-rotate') });
    details.on('click', () => { details.toggleClass('details-rotate') });
    this.renderTacoAmount();
  }

  renderTacoAmount(){
    var tacoAmountDiv = $('<div>').addClass('taco-amount');
    var tacoTitle = $('<h2>').text("You can eat " + parseInt(this.tacoAmount) + " tacos during this travel!");
    var startAgain = $('<button>').text("Play Again!").on('click', () => {
      $('body').empty();
      var newModal = new Modal();
      newModal.createIntroModal();})
    tacoAmountDiv.append(tacoTitle, startAgain);
    $('#taco-container').append(tacoAmountDiv);
  }
}
