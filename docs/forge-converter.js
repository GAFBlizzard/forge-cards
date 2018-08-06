
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
        spreadsheetId: '1WjIUAbedu062U6_pi__G2bNWmhggfxJaq-ixft4o6rs',
        range: 'Sheet1!A2:K371'
      }).then((response) => {
         newInnerHTML = '{\n   "CardData": [\n'

         for (cardIndex = 0; cardIndex < response.result.values.length; cardIndex++)
         {
            if (cardIndex != 0) {
               newInnerHTML += ',\n'
            }

            newInnerHTML += '      {\n         "Number": "';
            if (response.result.values[cardIndex].length >= 1) {
               newInnerHTML += response.result.values[cardIndex][0]
            }
            newInnerHTML += '",\n         "Name": "';
            if (response.result.values[cardIndex].length >= 2) {
               newInnerHTML += response.result.values[cardIndex][1]
            }
            newInnerHTML += '",\n         "House": "';
            if (response.result.values[cardIndex].length >= 3) {
               newInnerHTML += response.result.values[cardIndex][2]
            }
            newInnerHTML += '",\n         "Type": "';
            if (response.result.values[cardIndex].length >= 4) {
               newInnerHTML += response.result.values[cardIndex][3]
            }
            newInnerHTML += '",\n         "Rarity": "';
            if (response.result.values[cardIndex].length >= 5) {
               newInnerHTML += response.result.values[cardIndex][4]
            }
            newInnerHTML += '",\n         "Amber": "';
            if (response.result.values[cardIndex].length >= 6) {
               newInnerHTML += response.result.values[cardIndex][5]
            }
            newInnerHTML += '",\n         "Power": "';
            if (response.result.values[cardIndex].length >= 7) {
               newInnerHTML += response.result.values[cardIndex][6]
            }
            newInnerHTML += '",\n         "Armor": "';
            if (response.result.values[cardIndex].length >= 8) {
               newInnerHTML += response.result.values[cardIndex][7]
            }
            newInnerHTML += '",\n         "Traits": "';
            if (response.result.values[cardIndex].length >= 9) {
               newInnerHTML += response.result.values[cardIndex][8]
            }
            newInnerHTML += '",\n         "Keywords": "';
            if (response.result.values[cardIndex].length >= 10) {
               newInnerHTML += response.result.values[cardIndex][9]
            }
            newInnerHTML += '",\n         "Text": "';
            if (response.result.values[cardIndex].length >= 11) {
               newInnerHTML += response.result.values[cardIndex][10]
            }
            newInnerHTML += '"\n      }';
         }

         newInnerHTML += '\n   ]\n}\n';

         converterOutputArea.innerHTML = newInnerHTML;
      });
   }
   else {
      converterOutputArea.innerHTML = 'Google API was not initialized.'
   }
}

function doConvertToLua() {
   if (isGoogleAPIReady) {
      converterOutputArea.innerHTML = 'Please wait...'

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1BuF4bbXN2teLlAunvpZuFGsVe9lBMcYnaVKv-NTJigo',
        range: 'Sheet1!A2:K371'
      }).then((response) => {
         newInnerHTML = 'cardData = {\n'

         for (cardIndex = 0; cardIndex < response.result.values.length; cardIndex++)
         {
            if (cardIndex != 0) {
               newInnerHTML += ',\n'
            }

            newInnerHTML += '  { number = "';
            if (response.result.values[cardIndex].length >= 1) {
               newInnerHTML += response.result.values[cardIndex][0]
            }
            newInnerHTML += '", name = "';
            if (response.result.values[cardIndex].length >= 2) {
               newInnerHTML += response.result.values[cardIndex][1]
            }
            newInnerHTML += '", house = "';
            if (response.result.values[cardIndex].length >= 3) {
               newInnerHTML += response.result.values[cardIndex][2]
            }
            newInnerHTML += '", type = "';
            if (response.result.values[cardIndex].length >= 4) {
               newInnerHTML += response.result.values[cardIndex][3]
            }
            newInnerHTML += '", rarity = "';
            if (response.result.values[cardIndex].length >= 5) {
               newInnerHTML += response.result.values[cardIndex][4]
            }
            newInnerHTML += '", amber = "';
            if (response.result.values[cardIndex].length >= 6) {
               newInnerHTML += response.result.values[cardIndex][5]
            }
            newInnerHTML += '", power = "';
            if (response.result.values[cardIndex].length >= 7) {
               newInnerHTML += response.result.values[cardIndex][6]
            }
            newInnerHTML += '", armor = "';
            if (response.result.values[cardIndex].length >= 8) {
               newInnerHTML += response.result.values[cardIndex][7]
            }
            newInnerHTML += '", traits = "';
            if (response.result.values[cardIndex].length >= 9) {
               newInnerHTML += response.result.values[cardIndex][8]
            }
            newInnerHTML += '", keywords = "';
            if (response.result.values[cardIndex].length >= 10) {
               newInnerHTML += response.result.values[cardIndex][9]
            }
            newInnerHTML += '", text = "';
            if (response.result.values[cardIndex].length >= 11) {
               newInnerHTML += response.result.values[cardIndex][10]
            }
            newInnerHTML += '" }';
         }

         newInnerHTML += '\n}\n';

         converterOutputArea.innerHTML = newInnerHTML;
      });
   }
   else {
      converterOutputArea.innerHTML = 'Google API was not initialized.'
   }
}


