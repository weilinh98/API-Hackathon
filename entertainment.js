class Taco{
  constructor(){
    this.randomTacoUrl = "http://taco-randomizer.herokuapp.com/random/";
    this.tacoGenerator = $('#taco-generator');
    this.tacoDomElement = null;
    this.tacoResponse = null;
    this.getTacoDataFromServer = this.getTacoDataFromServer.bind(this);
  }

  addClickHandler(){
    this.tacoGenerator.on('click', this.getTacoDataFromServer)
    console.log("add handler");
  }

  getTacoDataFromServer(){
    var ApiForTaco = new ApiGenerator(this.randomTacoUrl);
    this.tacoResponse = ApiForTaco.getResponse(this.randomTacoUrl, "json");
    this.processGetTacoDataFromServer(this.tacoResponse);
  }

  processGetTacoDataFromServer(response){

  }

  render(){
    this.randomTacoDomElement = $('div').text()
  }
}
