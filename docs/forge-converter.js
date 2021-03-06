
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

function setupAndGetJson(holderID) {
   converterOutputArea = document.getElementById(holderID)

   isGoogleAPIReady = false

   // Load the Google API client library.
   gapi.load('client', initGoogleAPIAndConvert);
}

function initGoogleAPIAndConvert() {
   // Initialize the Google API client library.
   gapi.client.init({'apiKey': 'AIzaSyAnircUPPMsqEMmomdmkZUOnTEFyhkE9qA',
                     'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']}).then(function () {
      isGoogleAPIReady = true
      doConvert(converterOutputArea.id)
   }, function(reason) {
      converterOutputArea.innerHTML = 'Failed to initialize Google API:  ' + reason
   });
}

function doConvert(holderID) {
   localConverterOutputArea = document.getElementById(holderID)

   if (isGoogleAPIReady) {
      localConverterOutputArea.innerHTML = 'Please wait...'

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

            newInnerHTML += '      {\n         "number": "';
            if (response.result.values[cardIndex].length >= 1) {
               newInnerHTML += response.result.values[cardIndex][0]
            }
            newInnerHTML += '",\n         "name": "';
            if (response.result.values[cardIndex].length >= 2) {
               newInnerHTML += response.result.values[cardIndex][1].replace(/"/g, "\\\"")
            }
            newInnerHTML += '",\n         "house": "';
            if (response.result.values[cardIndex].length >= 3) {
               newInnerHTML += response.result.values[cardIndex][2]
            }
            newInnerHTML += '",\n         "type": "';
            if (response.result.values[cardIndex].length >= 4) {
               newInnerHTML += response.result.values[cardIndex][3]
            }
            newInnerHTML += '",\n         "rarity": "';
            if (response.result.values[cardIndex].length >= 5) {
               newInnerHTML += response.result.values[cardIndex][4]
            }
            newInnerHTML += '",\n         "amber": "';
            if (response.result.values[cardIndex].length >= 6) {
               newInnerHTML += response.result.values[cardIndex][5]
            }
            newInnerHTML += '",\n         "power": "';
            if (response.result.values[cardIndex].length >= 7) {
               newInnerHTML += response.result.values[cardIndex][6]
            }
            newInnerHTML += '",\n         "armor": "';
            if (response.result.values[cardIndex].length >= 8) {
               newInnerHTML += response.result.values[cardIndex][7]
            }
            newInnerHTML += '",\n         "traits": "';
            if (response.result.values[cardIndex].length >= 9) {
               newInnerHTML += response.result.values[cardIndex][8]
            }
            newInnerHTML += '",\n         "keywords": "';
            if (response.result.values[cardIndex].length >= 10) {
               newInnerHTML += response.result.values[cardIndex][9]
            }
            newInnerHTML += '",\n         "text": "';
            if (response.result.values[cardIndex].length >= 11) {
               newInnerHTML += response.result.values[cardIndex][10].replace(/"/g, "\\\"")
            }
            newInnerHTML += '"\n      }';
         }

         newInnerHTML += '\n   ]\n}\n';

         localConverterOutputArea.innerHTML = newInnerHTML;
      });
   }
   else {
      localConverterOutputArea.innerHTML = 'Google API was not initialized.'
   }
}

function doConvertToLua() {
   if (isGoogleAPIReady) {
      converterOutputArea.innerHTML = 'Please wait...'

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1WjIUAbedu062U6_pi__G2bNWmhggfxJaq-ixft4o6rs',
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
               newInnerHTML += response.result.values[cardIndex][1].replace(/"/g, "\\\"")
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
               newInnerHTML += response.result.values[cardIndex][10].replace(/"/g, "\\\"")
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


