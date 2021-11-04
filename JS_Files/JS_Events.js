document.addEventListener('DOMContentLoaded', () => {
  // *** Eventually: Check for user login info and load *** //
  console.log(`Now I will load ${userName}'s chosen albums`)
})


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
  debugger
  fetchUserData();
})


        // *** SEARCH ITUNES API WITH ALBUM PARAMETERS *** //

albumSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  searchDisplay.innerHTML = "";
  let albumsArray = [];
  return fetch(url(event.target.album_terms.value, 'album'), {method: 'GET'})
  .then(res => res.json())
  .then(function (albumData) {
    albumsArray = albumData.results;
    albumsArray.forEach(album => renderAlbum(album));
    albumSearch.reset();
    artistSearch.reset();
  })
})


        // *** SEARCH ITUNES API WITH ARTIST PARAMETERS *** //
let url = (searchTerm, type) => {
  return `https://itunes.apple.com/search?term=${searchTerm}&entity=album&attribute=${type}Term`
}
        
artistSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  searchDisplay.innerHTML = "";
  let albumsArray = [];
      // ????? IS IT POSSIBLE TO DECLARE THE INTERPOLATING URL OUTSIDE THE FUNCTION? //
      // ????? ARTIST IS UNDEFINED // IF SO, CREATE FUNCTION THAT PASSES IN URL 
  return fetch(url(event.target.artist_terms.value, 'artist'), {method: 'GET'})
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
      // ?????? IS THERE A WAY TO DRY UP THIS SECTION ?????? //


topTen.addEventListener('click', (event) => {
  if (event.target.className === 'button') {
    let numRank = parseInt(event.target.id.slice(15))
    document.getElementById(`reason-${numRank}`).style.display = 'inline-block'
    document.getElementById(`comment-button-${numRank}`).style.display = 'none'
    document.getElementById(`reason-${numRank}`).addEventListener('submit', (e) => {
      e.preventDefault();
      albumComment = e.currentTarget.reason.value
      if (countWords(albumComment) !== 10) {
        alert("That's not 10 words!")
      } else {
        document.getElementById(`reason-${numRank}`).textContent = albumComment
      }
    })
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
  
// google dataset.html event.target.dataset.id