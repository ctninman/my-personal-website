document.addEventListener('DOMContentLoaded', () => {
  console.log(`Now I will load ${userName}'s chosen albums`)
})


// *** DECLARED VARIABLES *** //

        let enterId = document.getElementById('enter-id')
let userName = ""
let averageYear = document.getElementById('average-year')
let albumSearch = document.getElementById('album-form')
let artistSearch = document.getElementById('artist-form')
let searchDisplay = document.getElementById('album-search-results')


        // *** ADD USERNAME TO TITLE *** //

enterId.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('event target called here:',event.target)
  userName = event.target.user_id.value
  document.getElementById('userName-topten').innerText = 
  `${userName}'s Top Ten Albums`
  averageYear.innerText = 
  `The average release date for ${userName}’s Top Ten is:`
})


        // *** SEARCH ITUNES API WITH ALBUM PARAMETERS *** //

albumSearch.addEventListener('submit', (event) => {
  event.preventDefault()
  let album = event.target.album_terms.value
  let albumsArray = []
  console.log(album)
  return fetch(`https://itunes.apple.com/search?term=${album}&entity=album&attribute=albumTerm`, {method: 'GET'})
  .then(res => res.json())
  .then(function (albumData) {
    albumsArray = albumData.results;
    albumsArray.forEach(album => renderAlbum(album));
  })
})


        // *** SEARCH ITUNES API WITH ARTIST PARAMETERS *** //

artistSearch.addEventListener('submit', (event) => {
  event.preventDefault()
  let artist = event.target.artist_terms.value
  console.log(artist)
  return fetch(`https://itunes.apple.com/search?term=${artist}&entity=album&attribute=artistTerm`, {method: 'GET'})
  .then(res => res.json())
  .then(function (albumData) {
    albumsArray = albumData.results;
    albumsArray.forEach(album => renderAlbum(album));
  })
})


        // *** CREATE AN ALBUM IN THE SEARCH DISPLAY BOX *** //

function renderAlbum (album) {
  let albumInfo = document.createElement('div')
  albumInfo.className = 'album-render-div'
  albumInfo.innerHTML = `
    <img src="${album.artworkUrl100}" width="75" height="75">
    <p>${album.artistName}<br>
    ${album.collectionName}</p>
    `
  searchDisplay.appendChild(albumInfo)
        // *** MOVE ALBUM TO TOP TEN *** // 
  albumInfo.addEventListener('click', function () {
    console.log (album.artistName, album.collectionName)
  })
}


        // *** 


// mainSearch.addEventListener('submit', (event) => {
//   event.preventDefault()
//   userList.innerHTML = ""
//   let userName = formSubmit.value
//   fetch (`https://api.github.com/search/users?q=${userName}`, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/vnd.github.v3+json'
//     }
//   })
//   .then(resp => resp.json())
//   .then(function (userData) {
//     let usersArray = userData.items
//     usersArray.forEach(user => createParagraph(user))
//   })
// })