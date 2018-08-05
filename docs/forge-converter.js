
function setupConverter() {
   converterOutputArea = document.getElementById("converterOutput")

   isGoogleAPIReady = false

   // Load the Google API client library.
   gapi.load('client', initGoogleAPI);
}

function initGoogleAPI() {
   // Initialize the Google API client library.
   gapi.client.init({'apiKey': 'AIzaSyAnircUPPMsqEMmomdmkZUOnTEFyhkE9qA',
                     'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']}).then(function () {
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
         converterOutputArea.innerHTML = ''

         for (cardIndex = 0; cardIndex < response.result.values.length; cardIndex++)
         {
            converterOutputArea.innerHTML += '{ '
            for (columnIndex = 0; columnIndex < response.result.values[cardIndex].length; columnIndex++)
            {
               if (columnIndex != 0) {
                  converterOutputArea.innerHTML += ', '
               }

               converterOutputArea.innerHTML += ('"' + response.result.values[cardIndex][columnIndex] + '" ')
            }
            converterOutputArea.innerHTML += '}\n'
         }
      });
   }
   else {
      converterOutputArea.innerHTML = 'Google API was not initialized.'
   }
} // end function doConvert()


