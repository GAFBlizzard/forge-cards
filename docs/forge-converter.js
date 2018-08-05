
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
      converterOutputArea.innerHTML = 'Please wait...'

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1BuF4bbXN2teLlAunvpZuFGsVe9lBMcYnaVKv-NTJigo',
        range: 'Sheet1!A2:K371'
      }).then((response) => {
         converterOutputArea.innerHTML = '{\n   "CardData": [\n'

         for (cardIndex = 0; cardIndex < response.result.values.length; cardIndex++)
         {
            if (cardIndex != 0) {
               converterOutputArea.innerHTML += ',\n'
            }

            converterOutputArea.innerHTML += '      { ';
            converterOutputArea.innerHTML += '         "Number": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][0]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '         "Name": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][1]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '         "House": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][2]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '         "Type": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][3]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '         "Rarity": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][4]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '         "Amber": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][5]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '         "Power": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][6]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '         "Armor": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][7]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '         "Traits": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][8]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '         "Keywords": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][9]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '         "Text": "';
            converterOutputArea.innerHTML += response.result.values[cardIndex][10]
            converterOutputArea.innerHTML += '",\n';
            converterOutputArea.innerHTML += '      }';
         }

         converterOutputArea.innerHTML += '\n   ]\n}\n';
      });
   }
   else {
      converterOutputArea.innerHTML = 'Google API was not initialized.'
   }
}


