class ApiGenerator {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.response = null;

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
  }

  returnResponse() {
    return this.response;
  }

  processGetServerData(response) {
    this.response = response.split('\n');
    console.log(this.response, 'success');
  }
  processGetServerError(error) {
    this.response = error.split('\n');
    console.log(this.response, 'error');
  }
}
