
                // *** DECLARED VARIABLES *** //
                // *** __________________ *** //

let userID;    
let userNameObject;
let fullUserObject;      
let userName          = "";
let albumRank         = "";
let albumComment      = "";
let nameSuggestion    = "";
let albumLoved        = "";
let albumSuggestion   = "";
let artistSuggestion  = "";
let enterId           = document.getElementById('enter-id');
const topTen          = document.getElementById('top-ten')
const albumSearch     = document.getElementById('album-form');
const artistSearch    = document.getElementById('artist-form');
const searchDisplay   = document.getElementById('album-search-display');
const suggestionForm  = document.getElementById('suggestion');
const commentBox      = document.getElementById('comment-box');


              // *** FUNCTION DECLARATIONS *** //
              // *** _____________________ *** //


        // *** LOAD USER TOP TEN WHEN USERNAME IS ENTERED *** //
        // *** CALLED IN enterId SUBMIT EVENT LISTENER    *** //

function fetchUserData () {
  return fetch(`http://localhost:3000/userCollections`, {method: 'GET'})
  .then(res => res.json())
  .then(function (userData) {
    console.log(userData)
    let foundUser = userData.find((user) => {
      console.log(user)
      return userName === user.userName
    })
    if (foundUser) {
      userID = foundUser.id;
      for (let i = 0; i <foundUser.albums.length; i++) {
        debugger
        changeTopTenInfo(foundUser, i)
      }
    } else {
      userNameObject = {userName: `${userName}`}
      fullUserObject ={...userNameObject, ...userDataObject}
      createUserData(fullUserObject)
    }
  })
}


        // *** USE DATABASE TO RENDER INFO OF EACH ALBUM *** //
        // *** CALLED IN fetchUserData *** //

function changeTopTenInfo (user, i) {
  document.getElementById(`para-${i+1}`).innerHTML = ""
  document.getElementById(`para-${i+1}`).innerHTML = `artist: ${user.albums[i].artistName}<br>
  album: ${user.albums[i].collectionName}<br>
  genre: ${user.albums[i].primaryGenreName}<br>
  year: ${user.albums[i].releaseDate}`;
  document.getElementById(`cover-${i+1}`).innerHTML = `
  <img class='placed-cover' src=${user.albums[i].artworkUrl100} height="100" width="100">
  <input type="button" class='button2' id='remove-${i+1} text="X" value="X"></input>`;
  console.log('through the function')
  // document.getElementById(`remove-${i+1}`).style.display = ""
}


        // *** CREATE AN ALBUM IN THE SEARCH DISPLAY BOX *** //
        // *** CALLED IN artistSearch OR albumSearch SUBMIT EVENT LISTENER    *** //
        // ?????? VERY LONG, SHOULD/HOW CAN I BREAK THIS APART ???????? //

function renderAlbum (album) {
  let albumInfo = document.createElement('div');
  albumInfo.className = 'album-render-div';
  albumInfo.innerHTML = `
    <img style='padding-top: 10px' src="${album.artworkUrl100}" width="75" height="75">
    <p class='icon'>${album.artistName}<br>
    ${album.collectionName}</p>`;
  searchDisplay.appendChild(albumInfo);
          // *** CREATE NUMBER FORM WHEN AN ALBUM IN SEARCH RESULTS IS CLICKED *** //     
  albumInfo.addEventListener('click', () => {
      let checkExist = !!document.getElementById('number-form');
      if (checkExist === false) {
      let numForm = document.createElement('form');
      numForm.setAttribute('id', 'number-form');
      let numInputForm = document.createElement('input');
      numInputForm.setAttribute('type', 'number');
      numInputForm.setAttribute('min', '1');
      numInputForm.setAttribute('max', '10');
      numInputForm.setAttribute('id', 'number_control');
      numInputForm.setAttribute('name', 'number-ctrl');
      numForm.appendChild(numInputForm);
      let cancelAdd = document.createElement('BUTTON');
      cancelAdd.textContent = 'X';
      numForm.appendChild(cancelAdd);
      let submitNumber = document.createElement('input');
      submitNumber.setAttribute('type', 'submit');
      submitNumber.setAttribute('value', 'TOP TEN!');
      submitNumber.setAttribute('class', 'button');
      numForm.appendChild(submitNumber);
      albumInfo.appendChild(numForm);
            // *** MOVE ALBUM TO TOP TEN WITH NUMBER FORM *** // 
            // *** USING NUMBER FORM, CAPTURE ALBUM RANK *** //
  numForm.addEventListener ('submit', (e) => {
    e.preventDefault();
    searchDisplay.innerHTML = "";
    albumRank = e.target.number_control.value;
    let albumObject = {
      albumRank: e.target.number_control.value,
      artistName: album.artistName,
      collectionName: album.collectionName,
      primaryGenreName: album.primaryGenreName,
      releaseDate: album.releaseDate.slice(0, 4),
      artworkUrl100: album.artworkUrl100
    };
// ????????? When calling patchUserTopTen, how can I make that a separate object within
// ????????? the user collection array?
    console.log('album object:',albumObject)
    patchUserTopTen (albumObject);
            // *** USING ALBUM RANK, ADD ALBUM COVER *** //
            // *** AND ARTIST, ALBUM, GENRE, AND YEAR *** //
    if (albumRank == parseInt(document.getElementById(`match-ranking-${albumRank}`).innerText)) {
      document.getElementById(`para-${albumRank}`).innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0, 4)}`;
        document.getElementById(`cover-${albumRank}`).innerHTML = `
        <img class='placed-cover' src=${album.artworkUrl100} height="100" width="100">`
        window.location.hash = `album-${albumRank}`;
        // document.getElementById(`remove-${albumRank}`).style.visibility = 'visible'
      }
    })
  }
})
}

        // *** USES userDataObject (object with user name and albums key) TO CREATE NEW USER AND ID
        // *** IN DATABASE. CALLED IN fetchUserData, WHICH IS CALLED IN enterID LISTENER *** //
function createUserData (userObject) {
  fetch('http://localhost:3000/userCollections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(userObject)
  })
  .then(res => res.json())
  .then(user => {
    userID = user.id;
  })
}


function patchUserTopTen () {
  fetch(`http://localhost:3000/userCollections/${userID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(albumObject)
  })
  .then(res => res.json())
  .then(album => console.log(album))
}


        // *** VERIFY THAT USER COMMENT IS EQUAL TO TEN WORDS *** //
        // *** CALLED IN commentNUMBER EVENT LISTENERS *** //
function countWords (userComment) {
  let count = 0;
  for (let i = 0; i < userComment.length; i++){
     const space = userComment[i];
     if(space !== ' '){
        continue; };
        count++; };
     return count + 1;
};
 

                // *** EVENT LISTENERS *** //
                // *** _______________ *** //

        // *** ADD USERNAME TO TITLE AND SUGGESTION BOX *** //

// enterId.addEventListener('submit', (event) => {
//   event.preventDefault();
//   userName = event.target.user_id.value;
//   document.getElementById('userName-topten').innerText = 
//   `${userName}'s Top Ten Albums`;
//   commentBox.textContent = `Suggestions for ${userName}:`;
//   enterId.reset();
//   fetchUserData();
// })


//         // *** SEARCH ITUNES API WITH ALBUM PARAMETERS *** //

// albumSearch.addEventListener('submit', (event) => {
//   event.preventDefault();
//   searchDisplay.innerHTML = "";
//   let albumsArray = [];
//   return fetch(url(event.target.album_terms.value, 'album'), {method: 'GET'})
//   .then(res => res.json())
//   .then(function (albumData) {
//     albumsArray = albumData.results;
//     albumsArray.forEach(album => renderAlbum(album));
//     albumSearch.reset();
//     artistSearch.reset();
//   })
// })


//         // *** SEARCH ITUNES API WITH ARTIST PARAMETERS *** //
// let url = (searchTerm, type) => {
//   return `https://itunes.apple.com/search?term=${searchTerm}&entity=album&attribute=${type}Term`
// }
        
// artistSearch.addEventListener('submit', (event) => {
//   event.preventDefault();
//   searchDisplay.innerHTML = "";
//   let albumsArray = [];
//       // ????? IS IT POSSIBLE TO DECLARE THE INTERPOLATING URL OUTSIDE THE FUNCTION? //
//       // ????? ARTIST IS UNDEFINED // IF SO, CREATE FUNCTION THAT PASSES IN URL 
//   return fetch(url(event.target.artist_terms.value, 'artist'), {method: 'GET'})
//   .then(res => res.json())
//   .then(function (albumData) {
//     albumsArray = albumData.results;
//     albumsArray.forEach(album => renderAlbum(album));
//     artistSearch.reset();
//     albumSearch.reset();
//   })
// })
        

//       // *** DISPLAY COMMENT BOX AFTER CLICK ON '+ COMMENT' BUTTON *** //
//       // *** _____________________________________________________ *** //
//       // ?????? IS THERE A WAY TO DRY UP THIS SECTION ?????? //





// topTen.addEventListener('click', (event) => {
//   if (event.target.className === 'button') {
//     let numRank = parseInt(event.target.id.slice(15))
//     document.getElementById(`reason-${numRank}`).style.display = 'inline-block'
//     document.getElementById(`comment-button-${numRank}`).style.display = 'none'
//     document.getElementById(`reason-${numRank}`).addEventListener('submit', (e) => {
//       e.preventDefault();
//       ///////?????????????????????????
//       debugger
//       albumComment = e.currentTarget.reason.value
//       console.log('album Comment:', albumComment)
//       if (countWords(albumComment) !== 10) {
//         alert("That's not 10 words!")
//       } else {
//         document.getElementById(`reason-${numRank}`).textContent = albumComment
//       }
//     })
//   }
// })


//         // *** ADD SUGGESTION TO THE SUGGESTION BOX *** //

// suggestionForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   let nameSuggestion = event.target.name_suggestion.value;
//   let albumLoved = event.target.album_loved.value;
//   let albumSuggestion = event.target.album_suggestion.value;
//   let artistSuggestion = event.target.artist_suggestion.value;
//   let otherUserComment = document.createElement('p');
//   otherUserComment.textContent =
//   `${nameSuggestion} loves "${albumLoved}", too, and suggests you check out "${albumSuggestion}" by ${artistSuggestion}!`;
//   commentBox.appendChild(otherUserComment);
//   suggestionForm.reset()
// })



  
// // google dataset.html event.target.dataset.id