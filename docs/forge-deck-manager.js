
function setupScripts() {
   setButtonsEnabled(false);

   deckRecordedResultArea = document.getElementById("deckRecordedResult");
   addDeckResultArea = document.getElementById("addDeckResult");
   deckIDInput = document.getElementById("deckID");
   deckNameInput = document.getElementById("deckName");
   deckDescriptionInput = document.getElementById("deckDescription");
   scriptOutputArea = document.getElementById("scriptOutput");

   isGoogleAPIReady = false;

   // Load the Google API client library.
   gapi.load('client', initGoogleAPI);
}

function initGoogleAPI() {
   // Initialize the Google API client library.
   gapi.client.init({'apiKey': 'AIzaSyBG5VmU_QlYEGXIcCKSuEY68Cuwl-PA86Y',
                     'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']}).then(function () {
      isGoogleAPIReady = true;

      setButtonsEnabled(true);
   }, function(reason) {
      deckRecordedResultArea.innerHTML = 'Failed to initialize Google API:  ' + reason;
      console.error("%O", reason);
   });
}

function setButtonsEnabled(shouldBeEnabled) {
   checkDeckButton = document.getElementById("checkDeckButton");
   checkDeckButton.disabled = !shouldBeEnabled;

   addDeckButton = document.getElementById("addDeckButton");
   addDeckButton.disabled = !shouldBeEnabled;
}

function checkIfDeckExists(addDeckMode) {
   untrimmedDeckID = deckIDInput.value;
   untrimmedDeckName = deckNameInput.value;
   addDeckFullPending = false;
   newInnerHTML = '';

   // Remove starting and ending whitespace.
   deckName = untrimmeDdeckName.trim();
   deckID = untrimmeDdeckID.trim();

   if (addDeckMode) {
      resultArea = addDeckResultArea;
   }
   else {
      resultArea = deckRecordedResultArea;
   }

   if (isGoogleAPIReady) {
      if ((deckID != '') || (deckName != '')) {
         resultArea.innerHTML = 'Please wait...';

         gapi.client.sheets.spreadsheets.values.get({
           spreadsheetId: '12E3C5bTjFKJaKISshQEBYRTRkSw26f6n0S1M4Qayk5w',
           range: 'Sheet1!A:B'
         }).then((response) => {
            newInnerHTML = '';
            deckFound = false;
            matchConflict = false;
            stillNeedID = false;

            for (deckIndex = 0; ((!deckFound) && (deckIndex < response.result.values.length)); deckIndex++) {
               checkDeckID = response.result.values[deckIndex][0];
               checkDeckName = response.result.values[deckIndex][1];

               if ((deckID != '') && (checkDeckID != "unknown") && (deckID == checkDeckID)) {
                  deckFound = true;

                  // Also make sure the name, if provided, matches.
                  if (deckName != '') {
                     if (deckName != checkDeckName) {
                        matchConflict = true;
                     }
                  }
               }
               else if ((deckName != '') && (deckName == checkDeckName)) {
                  deckFound = true;

                  // If the database has an ID, also make sure the ID, if provided, matches.
                  if (checkDeckID != "unknown") {
                     if (deckID != '') {
                        if (deckID != checkDeckID) {
                           matchConflict = true;
                        }
                     }
                  }
                  else {
                     stillNeedID = true;
                  }
               }
               else {
                  // Nothing needs done.
               }
            }

            if (deckFound) {
               if (!matchConflict) {
                  if (!stillNeedID) {
                     newInnerHTML = '<b><font color="#000000">Deck already recorded.</font></b>';
                  }
                  else {
                     newInnerHTML = '<b><font color="#000000">Deck recorded with no ID.  If you have the ID, please record the deck again!</font></b>';

                     if (addDeckMode) {
                        addDeckFullPending = true;
                     }
                  }
               }
               else {
                  newInnerHTML = '<b><font color="#000000">Partial match found.  Please carefully check what you entered, and tell the mod creator if you are sure.</font></b>';
               }
            }
            else {
               newInnerHTML = '<b><font color="#00AA00">Deck not found.</font></b>';

               if (addDeckMode) {
                  addDeckFullPending = true;
               }
            }

            resultArea.innerHTML = newInnerHTML;

            if (addDeckFullPending) {
               addDeckFull();
            }
         });
      }
      else {
         resultArea.innerHTML = '<b><font color="#ff0000">Please enter a deck ID and/or deck name.</font></b>';
      }
   }
   else {
      resultArea.innerHTML = '<b><font color="#ff0000">Google API was not initialized.</font></b>';
   }
}

function addDeck() {
   checkIfDeckExists(true);
}

function addDeckFull() {
   // At this point, the Google API is known to be initialized.

   successful = true
   addDeckResultArea.innerHTML = 'Please wait...';

   // If rerecording, make sure the ID was provided.
   if (successful) {
      if (stillNeedID) {
         if (deckID == '') {
            newInnerHTML = '<b><font color="#ff0000">Deck already recorded but ID is missing.  Please only rerecord if you have the ID.</font></b>';
            successful = false;
         }
      }
   }

   // Make sure a name was provided.
   if (successful) {
      if (deckName == '') {
         newInnerHTML = '<b><font color="#ff0000">Missing deck name.</font></b>';
         successful = false;
      }
   }

   // Make sure a description was provided.
   if (successful) {
      deckDescription = deckDescriptionInput.value;
      if (deckDescription == '') {
         newInnerHTML = '<b><font color="#ff0000">Missing deck description.</font></b>';
         successful = false;
      }
   }

   if (successful) {
      factionASelect = document.getElementById("factionA");
      factionBSelect = document.getElementById("factionB");
      factionCSelect = document.getElementById("factionC");

      factionA = factionASelect.value;
      factionB = factionBSelect.value;
      factionC = factionCSelect.value;

      // Make sure all 3 factions are different.
      if ((factionA != factionB)    &&
          (factionA != factionC)    &&
          (factionB != factionC)) {
         factionString = factionA + ',' + factionB + ',' + factionC;
      }
      else {
         newInnerHTML = '<b><font color="#ff0000">All 3 factions must be different.</font></b>';
         successful = false;
         factionString = '';
      }
   }

   if (successful) {
      factionACardsInput = document.getElementById("factionACards");
      factionBCardsInput = document.getElementById("factionBCards");
      factionCCardsInput = document.getElementById("factionCCards");

      factionACards = factionACardsInput.value;
      factionBCards = factionBCardsInput.value;
      factionCCards = factionCCardsInput.value;

      // Make sure cards were entered for all 3 factions.
      if ((factionACards != '')     &&
          (factionBCards != '')     &&
          (factionCCards != '')) {
         cardANumberStrings = factionACards.split(/ *, */);
         cardBNumberStrings = factionBCards.split(/ *, */);
         cardCNumberStrings = factionCCards.split(/ *, */);
         cardANumbers = []
         cardBNumbers = []
         cardCNumbers = []
         outputAString = '';
         outputBString = '';
         outputCString = '';

         // Make sure exactly 12 cards were entered per faction.
         if ((cardANumberStrings.length == 12)     &&
             (cardBNumberStrings.length == 12)     &&
             (cardCNumberStrings.length == 12)) {
            if (successful) {
               for (cardIndex = 0; cardIndex < cardANumberStrings.length; cardIndex++) {
                  if (cardANumberStrings[cardIndex] != "") {
                     cardANumbers[cardIndex] = parseInt(cardANumberStrings[cardIndex], 10);

                     if ((cardANumbers[cardIndex] >= 1) && (cardANumbers[cardIndex] <= 370)) {
                        if (cardIndex > 0) {
                           outputAString += ',';
                        }

                        outputAString += cardANumbers[cardIndex];
                     }
                     else {
                        newInnerHTML = '<b><font color="#ff0000">Invalid card number "' + cardANumbers[cardIndex] + '".</font></b>';
                        successful = false;
                        break;
                     }
                  }
                  else {
                     newInnerHTML = '<b><font color="#ff0000">Each faction must have exactly 12 card numbers.</font></b>';
                     successful = false;
                     break;
                  }
               }
            }

            if (successful) {
               for (cardIndex = 0; cardIndex < cardBNumberStrings.length; cardIndex++) {
                  if (cardBNumberStrings[cardIndex] != "") {
                     cardBNumbers[cardIndex] = parseInt(cardBNumberStrings[cardIndex], 10);

                     if ((cardBNumbers[cardIndex] >= 1) && (cardBNumbers[cardIndex] <= 370)) {
                        if (cardIndex > 0) {
                           outputBString += ',';
                        }

                        outputBString += cardBNumbers[cardIndex];
                     }
                     else {
                        newInnerHTML = '<b><font color="#ff0000">Invalid card number "' + cardBNumbers[cardIndex] + '".</font></b>';
                        successful = false;
                        break;
                     }
                  }
                  else {
                     newInnerHTML = '<b><font color="#ff0000">Each faction must have exactly 12 card numbers.</font></b>';
                     successful = false;
                     break;
                  }
               }
            }

            if (successful) {
               for (cardIndex = 0; cardIndex < cardCNumberStrings.length; cardIndex++) {
                  if (cardCNumberStrings[cardIndex] != "") {
                     cardCNumbers[cardIndex] = parseInt(cardCNumberStrings[cardIndex], 10);

                     if ((cardCNumbers[cardIndex] >= 1) && (cardCNumbers[cardIndex] <= 370)) {
                        if (cardIndex > 0) {
                           outputCString += ',';
                        }

                        outputCString += cardCNumbers[cardIndex];
                     }
                     else {
                        newInnerHTML = '<b><font color="#ff0000">Invalid card number "' + cardCNumbers[cardIndex] + '".</font></b>';
                        successful = false;
                        break;
                     }
                  }
                  else {
                     newInnerHTML = '<b><font color="#ff0000">Each faction must have exactly 12 card numbers.</font></b>';
                     successful = false;
                     break;
                  }
               }
            }

            if (successful) {
// TODO NEXT IMPLEMENT
/*
               gapi.client.sheets.spreadsheets.values.append({
                 spreadsheetId: '12E3C5bTjFKJaKISshQEBYRTRkSw26f6n0S1M4Qayk5w',
                 range: 'Sheet1!A:B',
                 valueInputOption: "RAW",
                 insertDataOption: "INSERT_ROWS",
                 resource: {
                   values: [[ 'abc', '123', 'XYZ' ]]
                 }
               }).then((response) => {
                  // Success.
                  addDeckResultArea.innerHTML = '<b><font color="#00AA00">Deck successfully recorded.</font></b>';
               });
*/

               if (deckID == '') {
                  deckID = 'unknown';
               }

               // Success.
               addDeckResultArea.innerHTML = '<b><font color="#00AA00">Success.</font></b>';
               scriptOutputArea.innerHTML = deckID + '~' + deckName + '~' + factionString + "~" + outputAString + "~" + outputBString + "~" + outputCString + "~" + deckDescription;
            }
         }
         else {
            newInnerHTML = '<b><font color="#ff0000">Each faction must have exactly 12 card numbers.</font></b>';
            successful = false;
            factionString = '';
         }
      }
      else {
         newInnerHTML = '<b><font color="#ff0000">Numbers must be provided for all factions.</font></b>';
         successful = false;
         factionString = '';
      }
   }

   if (!successful) {
      addDeckResultArea.innerHTML = newInnerHTML;
   }
}


