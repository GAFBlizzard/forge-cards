
function setupConverter() {
   converterOutputArea = document.getElementById("converterOutput")

   isGoogleAPIReady = false

   // Load the Google API client library.
   gapi.load('client', initGoogleAPI);
}

function initGoogleAPI() {
   // Initialize the Google API client library.
   gapi.client.init({'apiKey': 'AIzaSyAnircUPPMsqEMmomdmkZUOnTEFyhkE9qA',
                     'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
                     'clientId': '928458196088-t993q1qavldumq7rurmco4qt52ta9aon.apps.googleusercontent.com',
                     'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly'}).then(function () {
      isGoogleAPIReady = true
   }, function(reason) {
      converterOutputArea.innerHTML = 'Failed to initialize Google API:  ' + reason
   });
}

function doConvert() {
   if (isGoogleAPIReady) {
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1BuF4bbXN2teLlAunvpZuFGsVe9lBMcYnaVKv-NTJigo',
        range: 'Sheet1!A2:K371'
      }).then((response) => {
         converterOutputArea.innerHTML = response.values
      });
   }
   else {
      converterOutputArea.innerHTML = 'Google API was not initialized.'
   }
} // end function doConvert()


