class ApiGenerator {
  constructor(apiUrl, componentCallback) {
    this.apiUrl = apiUrl;
    this.response = null;
    this.componentCallback = componentCallback;
    this.processGetServerData = this.processGetServerData.bind(this);
    this.processGetServerError = this.processGetServerError.bind(this);
  }

  getResponse(url, type) {
    this.type = type;
    var ajaxConfigObject = {
      dataType: type,
      url: url,
      method: "GET",
      
      success: this.processGetServerData,
      error: this.processGetServerError,
    };
    $.ajax(ajaxConfigObject);
  }

  processGetServerData(response) {
    this.componentCallback(response);
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
  }
}
