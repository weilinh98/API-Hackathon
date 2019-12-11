class ApiGenerator {
  constructor(apiUrl, componentCallback) {
    this.apiUrl = apiUrl;
    this.response = null;
    this.componentCallback = componentCallback;
    this.processGetServerSuccess = this.processGetServerSuccess.bind(this);
    this.processGetServerError = this.processGetServerError.bind(this);
  }

  getResponse(url, type) {
    this.type = type;
    var ajaxConfigObject = {
      dataType: type,
      url: url,
      method: "GET",

      success: this.processGetServerSuccess,
      error: this.processGetServerError,
    };
   return $.ajax(ajaxConfigObject);
  }

  returnResponse(response) {
    return this.response;
  }

  processGetServerSuccess(response) {
    this.componentCallback(response);
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
