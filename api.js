class ApiGenerator {
  constructor(apiUrl, componentCallback) {
    this.apiUrl = apiUrl;
    this.response = null;
    this.componentCallback = componentCallback;
    this.componentCallback = this.componentCallback.bind(this);
    this.processGetServerError = this.processGetServerError.bind(this);
  }

  getResponse(url, type) {
    var ajaxConfigObject = {
      dataType: type,
      url: url,
      method: "GET",

      success: this.componentCallback,
      error: this.processGetServerError,
    };
    $.ajax(ajaxConfigObject);
  }

  returnResponse(response) {
    return this.response;
  }

  processGetServerError(error) {
    this.response = error.split('\n');
    console.log(this.response, 'error');
  }
}
