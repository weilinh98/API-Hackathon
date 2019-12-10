class ApiGenerator {
  constructor(apiUrl, componentCallback) {
    this.apiUrl = apiUrl;
    this.response = null;
    this.componentCallback = componentCallback;

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
   return $.ajax(ajaxConfigObject);
  }

  processGetServerData(response) {
    this.componentCallback(response);
  }

  processGetServerError(error) {
    console.log('error:', error);
  }
}
