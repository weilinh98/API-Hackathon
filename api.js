class ApiGenerator {
  constructor(apiUrl) {
    this.apiUrl = apiUrl
    console.log(this.apiUrl);

    this.processGetServerData = this.processGetServerData.bind(this);
    this.processGetServerError = this.processGetServerError.bind(this);
  }

  getResponse(url, type) {
    var ajaxConfigObject = {
      dataType: type,
      url: url,
      method: "GET",

      success: this.processGetServerData,
      error: this.processGetServerError
    };
    $.ajax(ajaxConfigObject);
  }

  processGetServerData(response) {
    console.log(" success", response);
    return response;
  }
  processGetServerError(response) {
    console.log("error", response);
    return response;
  }
}
