



document.addEventListener('DOMContentLoaded', () => {
  // *** Eventually: Check for user login info and load *** //
  console.log(`Now I will load ${userName}'s chosen albums`)
})


// *** DECLARED VARIABLES *** //
// *** __________________ *** //

let enterId         = document.getElementById('enter-id');
// ?????? IS IT OK TO MAKE THE USER ID IN A GLOBAL VARIABLE ?????? //
// ?????? userID IS CALLED TO LOAD USER CONTENT ?????? //
let userID;          
let userName        = "";
let albumRank       = "";
let albumComment    = "";
let nameSuggestion  = "";
let albumLoved      = "";
let albumSuggestion = "";
let artistSuggestion= "";
let albumSearch     = document.getElementById('album-form');
let artistSearch    = document.getElementById('artist-form');
let searchDisplay   = document.getElementById('album-search-display');
let suggestionForm  = document.getElementById('suggestion');
let commentBox      = document.getElementById('comment-box');

        // *** COMMENT BUTTON FOR EACH ALBUM *** //

let commentButtonOne   = document.getElementById('comment-button-one');
let commentButtonTwo   = document.getElementById('comment-button-two');
let commentButtonThree = document.getElementById('comment-button-three');
let commentButtonFour  = document.getElementById('comment-button-four');
let commentButtonFive  = document.getElementById('comment-button-five');
let commentButtonSix   = document.getElementById('comment-button-six');
let commentButtonSeven = document.getElementById('comment-button-seven');
let commentButtonEight = document.getElementById('comment-button-eight');
let commentButtonNine  = document.getElementById('comment-button-nine');
let commentButtonTen   = document.getElementById('comment-button-ten');

        // *** COMMENT BOX FOR EACH ALBUM *** //

let commentOne   = document.getElementById('reason-one');
let commentTwo   = document.getElementById('reason-two');
let commentThree = document.getElementById('reason-three');
let commentFour  = document.getElementById('reason-four');
let commentFive  = document.getElementById('reason-five');
let commentSix   = document.getElementById('reason-six');
let commentSeven = document.getElementById('reason-seven');
let commentEight = document.getElementById('reason-eight');
let commentNine  = document.getElementById('reason-nine');
let commentTen   = document.getElementById('reason-ten');


              // *** FUNCTION DECLARATIONS *** //
              // *** _____________________ *** //

        // *** LOAD USER TOP TEN WHEN USERNAME IS ENTERED *** //
        // *** CALLED IN enterId SUBMIT EVENT LISTENER    *** //

function fetchUserData (userDataObject) {
  return fetch(`http://localhost:3000/userCollections`, {method: 'GET'})
  .then(res => res.json())
  .then(function (userData) {
    console.log(userData)
    userData.find((user) => {
      console.log(user)
      if (userName === user.userName) {
        userID = user.id;
        for (let i = 0; i <user.albums.length; i++) {
          changeTopTenInfo(user, i)
        } 
// ?????????? GOAL, IF USER NAME IS FOUND, LOAD THAT USERS COLLECTION, THIS WORKS BUT CONTINUES TO ITERATE
// ?????????? THROUGH ALL USERS AFTER. IF I FIND A MATCHING USER NAME, RETURN THAT COLLECTION
// ?????????? IF THERE IS NO MATCH, RUN createUserData. CURRENTLY CREATES NEW USER FOR EACH EXISTING USER
// ?????????? NOT NAMED EQUAL TO userID 
      // } else {
      //   let userDataObject = {
      //     userName: `${userName}`,
      //     albums: ""
      //   }
      //   createUserData(userDataObject);
      }
    })
  })
}

        // *** USE DATABASE TO RENDER INFO OF EACH ALBUM *** //
        // *** CALLED IN fetchUserData *** //
function changeTopTenInfo (user, i) {
  document.getElementById(`para-${i+1}`).innerHTML = `artist: ${user.albums[i].artistName}<br>
  album: ${user.albums[i].collectionName}<br>
  genre: ${user.albums[i].primaryGenreName}<br>
  year: ${user.albums[i].releaseDate}`;
  document.getElementById(`cover-${i+1}`).innerHTML = `
  <img class='placed-cover' src=${user.albums[i].artworkUrl100} height="100" width="100">
  <input type="button" class='button2' id='remove-${i+1} text="X" value="X"></input>`;
  console.log('through the function')
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
          <img class='placed-cover' src=${album.artworkUrl100} height="100" width="100">
          <input type="button" class='button2' id='remove-${albumRank}' text="X" value="X"></input>`;
          window.location.hash = `album-${albumRank}`;
      }
    })
  }
})
}


function createUserData (userDataObject) {
  fetch('http://localhost:3000/userCollections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(userDataObject)
  })
  .then(res => res.json())
  .then(user => {
    userID = user.id;
  })
}


function patchUserTopTen (albumObject) {
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
 
                // *** EVENT LISTENERS *** //
                // *** _______________ *** //

        // *** ADD USERNAME TO TITLE AND SUGGESTION BOX *** //

enterId.addEventListener('submit', (event) => {
  event.preventDefault();
  userName = event.target.user_id.value;
  document.getElementById('userName-topten').innerText = 
  `${userName}'s Top Ten Albums`;
  commentBox.textContent = `Suggestions for ${userName}:`;
  enterId.reset();
  // createUserData(userDataObject);
  fetchUserData();
})


        // *** SEARCH ITUNES API WITH ALBUM PARAMETERS *** //

albumSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  searchDisplay.innerHTML = "";
  let albumsArray = [];
  return fetch(`https://itunes.apple.com/search?term=${event.target.album_terms.value}&entity=album&attribute=albumTerm`, {method: 'GET'})
  .then(res => res.json())
  .then(function (albumData) {
    albumsArray = albumData.results;
    albumsArray.forEach(album => renderAlbum(album));
    albumSearch.reset();
    artistSearch.reset();
  })
})


        // *** SEARCH ITUNES API WITH ARTIST PARAMETERS *** //
      
artistSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  searchDisplay.innerHTML = "";
  let albumsArray = [];
      // ????? IS IT POSSIBLE TO DECLARE THE INTERPOLATING URL OUTSIDE THE FUNCTION? //
      // ????? ARTIST IS UNDEFINED // IF SO, CREATE FUNCTION THAT PASSES IN URL 
  return fetch(`https://itunes.apple.com/search?term=${event.target.artist_terms.value}&entity=album&attribute=artistTerm`, {method: 'GET'})
  .then(res => res.json())
  .then(function (albumData) {
    albumsArray = albumData.results;
    albumsArray.forEach(album => renderAlbum(album));
    artistSearch.reset();
    albumSearch.reset();
  })
})
        

      // *** DISPLAY COMMENT BOX AFTER CLICK ON '+ COMMENT' BUTTON *** //
      // *** _____________________________________________________ *** //

commentButtonOne.addEventListener('click', () => {
  commentOne.style.display = 'inline-block'
  commentButtonOne.style.display = 'none'
})

commentButtonTwo.addEventListener('click', () => {
  commentTwo.style.display = 'inline-block'
  commentButtonTwo.style.display = 'none'
})

commentButtonThree.addEventListener('click', () => {
  commentThree.style.display = 'inline-block'
  commentButtonThree.style.display = 'none'
})

commentButtonFour.addEventListener('click', () => {
  commentFour.style.display = 'inline-block'
  commentButtonFour.style.display = 'none'
})

commentButtonFive.addEventListener('click', () => {
  commentFive.style.display = 'inline-block'
  commentButtonFive.style.display = 'none'
})

commentButtonSix.addEventListener('click', () => {
  commentSix.style.display = 'inline-block'
  commentButtonSix.style.display = 'none'
})

commentButtonSeven.addEventListener('click', () => {
  commentSeven.style.display = 'inline-block'
  commentButtonSeven.style.display = 'none'
})

commentButtonEight.addEventListener('click', () => {
  commentEight.style.display = 'inline-block'
  commentButtonEight.style.display = 'none'
})

commentButtonNine.addEventListener('click', () => {
  commentNine.style.display = 'inline-block'
  commentButtonNine.style.display = 'none'
})

commentButtonTen.addEventListener('click', () => {
  commentTen.style.display = 'inline-block'
  commentButtonTen.style.display = 'none'
})

        // *** SUBMIT 10 WORD COMMENT FOR ALBUM *** //
        // *** ________________________________ *** //
    
commentOne.addEventListener('submit', (e) => {
  e.preventDefault();
  albumComment = e.target.reason_one_text.value
  if (countWords(albumComment) !== 10) {
    alert("That's not 10 words!")
  } else {
    document.getElementById('reason-form-one').textContent = albumComment
  }
})

commentTwo.addEventListener('submit', (e) => {
  e.preventDefault();
  albumComment = e.target.reason_two_text.value
  if (countWords(albumComment) !== 10) {
    alert("That's not 10 words!")
  } else {
    document.getElementById('reason-form-two').textContent = albumComment
  }
})

commentThree.addEventListener('submit', (e) => {
  e.preventDefault();
  albumComment = e.target.reason_three_text.value
  if (countWords(albumComment) !== 10) {
    alert("That's not 10 words!")
  } else {
    document.getElementById('reason-form-three').textContent = albumComment
  }
})

commentFour.addEventListener('submit', (e) => {
  e.preventDefault();
  albumComment = e.target.reason_four_text.value
  if (countWords(albumComment) !== 10) {
    alert("That's not 10 words!")
  } else {
    document.getElementById('reason-form-four').textContent = albumComment
  }
})

commentFive.addEventListener('submit', (e) => {
  e.preventDefault();
  albumComment = e.target.reason_five_text.value
  if (countWords(albumComment) !== 10) {
    alert("That's not 10 words!")
  } else {
    document.getElementById('reason-form-five').textContent = albumComment
  }
})

commentSix.addEventListener('submit', (e) => {
  e.preventDefault();
  albumComment = e.target.reason_six_text.value
  if (countWords(albumComment) !== 10) {
    alert("That's not 10 words!")
  } else {
    document.getElementById('reason-form-six').textContent = albumComment
  }
})

commentSeven.addEventListener('submit', (e) => {
  e.preventDefault();
  albumComment = e.target.reason_seven_text.value
  if (countWords(albumComment) !== 10) {
    alert("That's not 10 words!")
  } else {
    document.getElementById('reason-form-seven').textContent = albumComment
  }
})

commentEight.addEventListener('submit', (e) => {
  e.preventDefault();
  albumComment = e.target.reason_eight_text.value
  if (countWords(albumComment) !== 10) {
    alert("That's not 10 words!")
  } else {
    document.getElementById('reason-form-eight').textContent = albumComment
  }
})

commentNine.addEventListener('submit', (e) => {
  e.preventDefault();
  albumComment = e.target.reason_nine_text.value
  if (countWords(albumComment) !== 10) {
    alert("That's not 10 words!")
  } else {
    document.getElementById('reason-form-nine').textContent = albumComment
  }
})

commentTen.addEventListener('submit', (e) => {
  e.preventDefault();
  albumComment = e.target.reason_ten_text.value
  if (countWords(albumComment) !== 10) {
    alert("That's not 10 words!")
  } else {
    document.getElementById('reason-form-ten').textContent = albumComment
  }
})


        // *** ADD SUGGESTION TO THE SUGGESTION BOX *** //

suggestionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let nameSuggestion = event.target.name_suggestion.value;
  let albumLoved = event.target.album_loved.value;
  let albumSuggestion = event.target.album_suggestion.value;
  let artistSuggestion = event.target.artist_suggestion.value;
  let otherUserComment = document.createElement('p');
  otherUserComment.textContent =
  `${nameSuggestion} loves "${albumLoved}", too, and suggests you check out "${albumSuggestion}" by ${artistSuggestion}!`;
  commentBox.appendChild(otherUserComment);
  suggestionForm.reset()
})


function countWords (comment) {
  let count = 0;
  for (let i = 0; i < comment.length; i++){
     const space = comment[i];
     if(space !== ' '){
        continue; };
        count++; };
     return count + 1;
};
  
