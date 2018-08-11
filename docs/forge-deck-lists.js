
function getDeckLists() {
   scriptOutputArea = document.getElementById("scriptOutput");
   scriptOutputArea.innerHTML = 'Please wait...';

   isGoogleAPIReady = false;

   // Load the Google API client library.
   gapi.load('client', initGoogleAPI);
}

function initGoogleAPI() {
   // Initialize the Google API client library.
   gapi.client.init({'apiKey': 'AIzaSyBG5VmU_QlYEGXIcCKSuEY68Cuwl-PA86Y',
                     'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']}).then(function () {
      isGoogleAPIReady = true;

      getDeckListsFull();
   }, function(reason) {
      scriptOutputArea.innerHTML = 'Failed to initialize Google API:  ' + reason;
   });
}

function getDeckListsFull() {
   if (isGoogleAPIReady) {
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '12E3C5bTjFKJaKISshQEBYRTRkSw26f6n0S1M4Qayk5w',
        range: 'Sheet1!B:F'
      }).then((response) => {
         newInnerHTML = 'deckData = {\n';

         for (deckIndex = 0; deckIndex < response.result.values.length; deckIndex++) {
            deckName = response.result.values[deckIndex][0];
            deckFactions = response.result.values[deckIndex][1];
            deckCardsA = response.result.values[deckIndex][2];
            deckCardsB = response.result.values[deckIndex][3];
            deckCardsC = response.result.values[deckIndex][4];
            if (deckIndex != 0) {
               newInnerHTML += ',\n';
            }
            newInnerHTML += '  { deckName = "';
            newInnerHTML += deckName.replace(/"/g, "\\\"");
            newInnerHTML += '", deckString = "';
            newInnerHTML += deckName.replace(/"/g, "\\\"");
            newInnerHTML += '~';
            newInnerHTML += deckFactions;
            newInnerHTML += '~';
            newInnerHTML += deckCardsA;
            newInnerHTML += '~';
            newInnerHTML += deckCardsB;
            newInnerHTML += '~';
            newInnerHTML += deckCardsC;
            newInnerHTML += '" }';
         }

         newInnerHTML += '\n}';
         scriptOutputArea.innerHTML = newInnerHTML;
      });
   }
   else {
      scriptOutputArea.innerHTML = 'Google API was not initialized.';
   }
}


