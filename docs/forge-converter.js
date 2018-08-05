
function setupConverter() {
   converterOutputArea = document.getElementById("converterOutput")

   isGoogleAPIReady = false

   // Load the Google API client library.
   gapi.load('client', initGoogleAPI);
}

function initGoogleAPI() {
   // Initialize the Google API client library.
   gapi.client.init({'apiKey': 'AIzaSyAnircUPPMsqEMmomdmkZUOnTEFyhkE9qA',
                     'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']}).then(function() {
                     'clientId': '928458196088-eqip5j7vces8s7vldntivmqi1mcn3ukq.apps.googleusercontent.com',
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
        range: 'A2:K371'
      }).then((response) => {
         converterOutputArea.innerHTML = response.values
      });
   }
   else {
      converterOutputArea.innerHTML = 'Google API was not initialized.'
   }
} // end function doConvert()


