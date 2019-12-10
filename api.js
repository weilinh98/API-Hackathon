class ApiGenerator {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.response = null;
    this.type = null;
    this.processGetServerData = this.processGetServerData.bind(this);
    this.processGetServerError = this.processGetServerError.bind(this);
  }

  getResponse(url, type) {
    var ajaxConfigObject = {
      dataType: type,
      url: url,
      method: "GET",

      success: this.processGetServerData,
      error: this.processGetServerError,
    };
    $.ajax(ajaxConfigObject);
    this.type = type;
  }

  processGetServerData(response) {
    if (this.type === 'text') {
      this.response = response.split('\n');
      var destinations = new Destination(this.response);
    } else {
      console.log(response);
    }
  }
  processGetServerError(error) {
      console.log(error);
  }
}
