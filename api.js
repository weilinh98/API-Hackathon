class ApiGenerator {
  constructor(apiUrl, componentCallback) {
    this.apiUrl = apiUrl;
    this.response = null;
    this.componentCallback = componentCallback;
    this.componentCallback = this.componentCallback.bind(this);
    this.processGetServerError = this.processGetServerError.bind(this);
  }

  getResponse(url, type) {
    this.type = type;
    var ajaxConfigObject = {
      dataType: type,
      url: url,
      method: "GET",

      success: this.componentCallback,
      error: this.processGetServerError,
    };
   return $.ajax(ajaxConfigObject);
  }

  returnResponse(response) {
    return this.response;
  }

  processGetServerError(error) {
    if (this.type === "text") {
      this.response = error.split('\n');
    } else {
      this.response = error;
    }
    console.log(this.response, 'error');
    //return this.response;
  }
}
