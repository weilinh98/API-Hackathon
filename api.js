class ApiGenerator {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.response = null;
    this.type = null;
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

  returnResponse() {
    return this.response;
  }

  processGetServerData(response) {
    if (this.type === "text") {
      this.response = response.split('\n');
    } else {
      this.response = response;
    }
    console.log(this.response, 'success');
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
