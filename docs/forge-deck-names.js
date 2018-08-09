
function getDeckNames() {
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

      getDeckNamesFull();
   }, function(reason) {
      scriptOutputArea.innerHTML = 'Failed to initialize Google API:  ' + reason;
   });
}

function getDeckNamesFull() {
   if (isGoogleAPIReady) {
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '12E3C5bTjFKJaKISshQEBYRTRkSw26f6n0S1M4Qayk5w',
        range: 'Sheet1!B:B'
      }).then((response) => {
         newInnerHTML = '';

         for (deckIndex = (response.result.values.length - 1); deckIndex >= 0; deckIndex--) {
            checkDeckName = response.result.values[deckIndex][0];
            newInnerHTML += checkDeckName;
            newInnerHTML += '<br/>\n';
         }

         scriptOutputArea.innerHTML = newInnerHTML;
      });
   }
   else {
      scriptOutputArea.innerHTML = 'Google API was not initialized.';
   }
}


