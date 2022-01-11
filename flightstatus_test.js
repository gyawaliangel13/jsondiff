jQuery(document).ready(function () {
  $('#initiate').click(function () {
    console.log("comapre")
  });

  $('#sample-data').on('change', function (event) {
    const fileList = event.target.files;
    var file = fileList[0];
    var reader = new FileReader();
    reader.onload = function (progressEvent) {
      var lines = this.result.split(/\r\n|\n/);
      for (var line = 0; line < lines.length; line++) {
        console.log(line + " --> " + lines[line]);
        makeAPICall()
      }
    };
    reader.readAsText(file);
  });

  async function makeAPICall(){
    console.log("MWS Response")
    let mwsRes = await getMWSResponse();
    //let mwsRes = {"FIS flight status":{"fieldErrors":"","presentationErrors":"","infoMessages":"","alertMessage":null,"messageParams":null,"flights":[{"sliceIndex":0,"operatingCarrierCode":"AA","operatingCarrierName":"American Airlines","otherGDSCrossReferencePNR":null,"marketingCarrierCode":null,"marketingCarrierName":null,"operationalDisclosureText":"American Airlines","flightNumber":"2007","partnerFlightNumber":null,"originCountryCode":null,"originAirportCode":"CLT","originCity":"Charlotte","destinationCountryCode":null,"destinationAirportCode":"DFW","destinationCity":"Dallas/ Fort Worth","arrivalDate":"2022-01-07T15:34:00.000-06:00","departDate":"2022-01-07T13:27:00.000-05:00","boardingTime":"2022-01-07T12:52:00.000-05:00","aircraftType":"Airbus A321","flightStatus":{"originInfo":{"gate":null,"terminal":null,"actualTime":null,"estimatedTime":"2022-01-07T13:27:00.000-05:00","baggageClaimArea":null,"flightStatus":"ON TIME"},"destinationInfo":{"gate":"A29","terminal":"A","actualTime":"2022-01-07T15:34:00.000-06:00","estimatedTime":"2022-01-07T15:34:00.000-06:00","baggageClaimArea":"A28","flightStatus":"ARRIVED"},"flightStatus":"ARRIVED","flifoFlightStatusPrimary":"ARRIVED AT GATE","flifoFlightStatusSecondary":"","flifoFlightStatusPrimaryColor":"#FF008712","flifoFlightStatusSecondaryColor":"","cancelled":false,"arrived":true,"departed":false,"validDataPresent":true},"priorLegFlightInfo":null,"wifiCarrier":true,"refreshTime":null,"seatNo":null,"updateRequired":false,"showUpgradeStandbyList":false,"allowFSN":true,"miles":null,"oaSegment":false}]}}
    if(mwsRes){
      mwsRes = JSON.stringify(mwsRes);
    }
    $('#textarealeft').val(mwsRes);

    console.log("FlightStatus Response")
    let fsRes = await getFSResponse();
    //let fsRes  = {"FIS flight status":{"fieldErrors":"","presentationErrors":"","infoMessages":"","alertMessage":null,"messageParams":null,"flights":[{"sliceIndex":0,"operatingCarrierCode":"AA","operatingCarrierName":"American Airlines","otherGDSCrossReferencePNR":null,"marketingCarrierCode":null,"marketingCarrierName":null,"operationalDisclosureText":"American Airlines","flightNumber":"2007","partnerFlightNumber":null,"originCountryCode":null,"originAirportCode":"CLT","originCity":"Charlotte","destinationCountryCode":null,"destinationAirportCode":"DFW","destinationCity":"Dallas/ Fort Worth","arrivalDate":"2022-01-07T15:34:00.000-06:00","departDate":"2022-01-07T13:27:00.000-05:00","boardingTime":"2022-01-07T12:52:00.000-05:00","aircraftType":"Airbus A321","flightStatus":{"originInfo":{"gate":null,"terminal":null,"actualTime":null,"estimatedTime":"2022-01-07T13:27:00.000-05:00","baggageClaimArea":null,"flightStatus":"ON TIME"},"destinationInfo":{"gate":"A29","terminal":"A","actualTime":"2022-01-07T15:34:00.000-06:00","estimatedTime":"2022-01-07T15:34:00.000-06:00","baggageClaimArea":"A28","flightStatus":"ARRIVED"},"flightStatus":"ARRIVED","flifoFlightStatusPrimary":"ARRIVED AT GATE","flifoFlightStatusSecondary":"","flifoFlightStatusPrimaryColor":"#FF008712","flifoFlightStatusSecondaryColor":"","cancelled":false,"arrived":true,"departed":false,"validDataPresent":true},"priorLegFlightInfo":null,"wifiCarrier":true,"refreshTime":null,"seatNo":null,"updateRequired":false,"showUpgradeStandbyList":false,"allowFSN":true,"miles":null,"oaSegment":false}]}}
    if(fsRes){
      fsRes = JSON.stringify(fsRes);
    }
    $('#textarearight').val(fsRes);
  }

  //Flight Status Response
  async function getFSResponse() {

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "_abck=5E4BAC4761BCF9AB93EEC56974D1F56C~-1~YAAQhWfNF+iGzZx9AQAArtZ0RwfThKkrVy5T4YaPS8Y4XKR5RDWo+JmOrckxE5eMZfdEJuDi2wSeW7E3t+hWsSapmzBz2uewp1I1m5+WYheuzhAOyNukcOv4KO2iafkmpxzYWVO4VC88B25aW++1Y9TCpMToQawrHqug+f8sPPns2Mw+FNnrHiDDVthomd7TvY1xdShRvUh4oetf0jWkT9mH4XPqiOvINpqw1efdYvZNoyd+TKUKk6jeDRYcD46XC5odkGtZ6tkgb0UGW8me8CS11cFNdaNVJw8oFRdVF1XSBzyqFqPIFvFB+8/SCuYIirzI5HpJHqqgvsOGuCk+e5wqTOF61Q057qZFPTMUPE/o13yagt1Erya52s/PWkefpewl~-1~-1~1639029008; bm_sz=2A4E5B06C523F65C967ADD4BF70BC19A~YAAQhWfNF+mGzZx9AQAArtZ0Rw7a/lMcqJGUowKWXNJEeHlcC6dHfSxsIXdCBcQZR5S9JxCCzEDNJ9dAZaO3h0D5lFusdY4uCrcMjO0YVPrSBxxva3YQnpb797KhTng/V45sHekXM000vMD1i5FlqGG/W1pKtPYFfyOJbYRQ2e8AMXK7WIpt46JDT295sSka26o9UD7ZSOHsXD76ey2dqxqBLk/iwTtnxHk7qViMy3pHkhHjnNWj8tBdqckIuUbtAsbr7WwYiyB/eXb+ZKPDdP/GrSChYl9/4TGxkqx3rA==~3228983~4473136");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let response = await fetch("https://cors-anywhere.herokuapp.com/https://cdn.kqa1.flyaa.aa.com/apiv2/mobile-flightstatus/upgrade-list/flightstatus?departureMonth=01&airlineCode=AA&departureDay=07&originCode=CLT&flightNumber=2007&destinationCode=DFW", requestOptions)
    console.log(response)
    if (response.status === 200) {
      let data = await response.text()
      console.log(data)
    }
    return response;

  }

  //MWS Response
  async function getMWSResponse() {

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "JSESSIONID=0000-H6Q3SGUd0ydsTQfhaIldq6:14vait3f8; Path=/; _abck=5E4BAC4761BCF9AB93EEC56974D1F56C~-1~YAAQhWfNF+iGzZx9AQAArtZ0RwfThKkrVy5T4YaPS8Y4XKR5RDWo+JmOrckxE5eMZfdEJuDi2wSeW7E3t+hWsSapmzBz2uewp1I1m5+WYheuzhAOyNukcOv4KO2iafkmpxzYWVO4VC88B25aW++1Y9TCpMToQawrHqug+f8sPPns2Mw+FNnrHiDDVthomd7TvY1xdShRvUh4oetf0jWkT9mH4XPqiOvINpqw1efdYvZNoyd+TKUKk6jeDRYcD46XC5odkGtZ6tkgb0UGW8me8CS11cFNdaNVJw8oFRdVF1XSBzyqFqPIFvFB+8/SCuYIirzI5HpJHqqgvsOGuCk+e5wqTOF61Q057qZFPTMUPE/o13yagt1Erya52s/PWkefpewl~-1~-1~1639029008; bm_sz=2A4E5B06C523F65C967ADD4BF70BC19A~YAAQhWfNF+mGzZx9AQAArtZ0Rw7a/lMcqJGUowKWXNJEeHlcC6dHfSxsIXdCBcQZR5S9JxCCzEDNJ9dAZaO3h0D5lFusdY4uCrcMjO0YVPrSBxxva3YQnpb797KhTng/V45sHekXM000vMD1i5FlqGG/W1pKtPYFfyOJbYRQ2e8AMXK7WIpt46JDT295sSka26o9UD7ZSOHsXD76ey2dqxqBLk/iwTtnxHk7qViMy3pHkhHjnNWj8tBdqckIuUbtAsbr7WwYiyB/eXb+ZKPDdP/GrSChYl9/4TGxkqx3rA==~3228983~4473136; ROUTEID=us-south_iqa; k_region=fb7c8adede2fdc4b7759bcf81f42e3e9|4b3e8df58dca081874c722d060077f4e");
    myHeaders.append("Device-ID", "mwsdevWaFmMpFJWZCX6NO6eRa27Un8");
    myHeaders.append("Timestamp", "1368555359387");
    myHeaders.append("Auth-Token", "bf1c089663a28fcbda25ab54e7afc0c2");
    myHeaders.append("accept", "application/vnd.aa.mobile.app+json;version=19.0");
    myHeaders.append("User-Agent", "iPhone mock");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let response = await fetch("https://cors-anywhere.herokuapp.com/https://cdn.kiqa.flyaa.aa.com/mws_v54/flightstatus?departureMonth=01&airlineCode=AA&departureDay=07&originCode=CLT&flightNumber=2007&destinationCode=DFW", requestOptions)
    console.log(response)
    if (response.status === 200) {
      let data = await response.text()
      console.log(data)
    }
    return response;

  }


});