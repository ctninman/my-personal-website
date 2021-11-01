document.addEventListener('DOMContentLoaded', () => {
  console.log(`Now I will load ${userName}'s chosen albums`)
})


        // *** DECLARED VARIABLES *** //

let enterId         = document.getElementById('enter-id')
let userName        = ""
let albumRanking    = ""
let albumComment    = ""
let nameSuggestion  = ""
let albumLoved      = ""
let albumSuggestion = ""
let artistSuggestion= ""
let averageYear     = document.getElementById('average-year')
let albumSearch     = document.getElementById('album-form')
let artistSearch    = document.getElementById('artist-form')
let searchDisplay   = document.getElementById('album-search-display')
let suggestionForm  = document.getElementById('suggestion')
let suggestionBox   = document.getElementById('comment-box')
let albumCovers     = document.getElementsByClassName('album-cover')
let commentBox      = document.getElementById('comment-box')

        // *** ALBUM COVER PLACEHOLDER ID'S *** //

let coverOne   = document.getElementById('cover-one');
let coverTwo   = document.getElementById('cover-two');
let coverThree = document.getElementById('cover-three');
let coverFour  = document.getElementById('cover-four')
let coverFive  = document.getElementById('cover-five')
let coverSix   = document.getElementById('cover-six')
let coverSeven = document.getElementById('cover-seven')
let coverEight = document.getElementById('cover-eight')
let coverNine  = document.getElementById('cover-nine')
let coverTen   = document.getElementById('cover-ten')

        // *** ALBUM INFO PARAGRAPH ID'S *** //

let paraOne   = document.getElementById('para-one')
let paraTwo   = document.getElementById('para-two')
let paraThree = document.getElementById('para-three')
let paraFour  = document.getElementById('para-four')
let paraFive  = document.getElementById('para-five')
let paraSix   = document.getElementById('para-six')
let paraSeven = document.getElementById('para-seven')
let paraEight = document.getElementById('para-eight')
let paraNine  = document.getElementById('para-nine')
let paraTen   = document.getElementById('para-ten')

        // *** COMMENT BUTTON FOR EACH ALBUM *** //

let commentButtonOne   = document.getElementById('comment-button-one')
let commentButtonTwo   = document.getElementById('comment-button-two')
let commentButtonThree = document.getElementById('comment-button-three')
let commentButtonFour  = document.getElementById('comment-button-four')
let commentButtonFive  = document.getElementById('comment-button-five')
let commentButtonSix   = document.getElementById('comment-button-six')
let commentButtonSeven = document.getElementById('comment-button-seven')
let commentButtonEight = document.getElementById('comment-button-eight')
let commentButtonNine  = document.getElementById('comment-button-nine')
let commentButtonTen   = document.getElementById('comment-button-ten')

        // *** COMMENT BOX FOR EACH ALBUM *** //

let commentOne   = document.getElementById('reason-one')
let commentTwo   = document.getElementById('reason-two')
let commentThree = document.getElementById('reason-three')
let commentFour  = document.getElementById('reason-four')
let commentFive  = document.getElementById('reason-five')
let commentSix   = document.getElementById('reason-six')
let commentSeven = document.getElementById('reason-seven')
let commentEight = document.getElementById('reason-eight')
let commentNine  = document.getElementById('reason-nine')
let commentTen   = document.getElementById('reason-ten')


        // *** ADD USERNAME TO TITLE *** //

enterId.addEventListener('submit', (event) => {
  event.preventDefault();
  userName = event.target.user_id.value
  commentBox.textContent += ` for ${userName}:`
  document.getElementById('userName-topten').innerText = 
  `${userName}'s Top Ten Albums`
  averageYear.innerText = 
  `The average release date for ${userName}’s Top Ten is:`
  .then(enterId.reset());
})


        // *** SEARCH ITUNES API WITH ALBUM PARAMETERS *** //

albumSearch.addEventListener('submit', (event) => {
  event.preventDefault()
  searchDisplay.innerHTML = ""
  let album = event.target.album_terms.value
  let albumsArray = []
  console.log(album)
  return fetch(`https://itunes.apple.com/search?term=${album}&entity=album&attribute=albumTerm`, {method: 'GET'})
  .then(res => res.json())
  .then(function (albumData) {
    albumsArray = albumData.results;
    albumsArray.forEach(album => renderAlbum(album));
    albumSearch.reset()
  })
})


        // *** SEARCH ITUNES API WITH ARTIST PARAMETERS *** //

artistSearch.addEventListener('submit', (event) => {
  event.preventDefault()
  searchDisplay.innerHTML = ""
  let artist = event.target.artist_terms.value
  console.log(artist)
  return fetch(`https://itunes.apple.com/search?term=${artist}&entity=album&attribute=artistTerm`, {method: 'GET'})
  .then(res => res.json())
  .then(function (albumData) {
    // let searchResultsDisplay = document.createElement('h6')
    // searchResultsDisplay = `'Showing results for:', ${artist}`
    // searchDisplay.appendChild(searchResultsDisplay)
    albumsArray = albumData.results;
    albumsArray.forEach(album => renderAlbum(album));
    artistSearch.reset()
  })
})


        // *** CREATE AN ALBUM IN THE SEARCH DISPLAY BOX *** //

function renderAlbum (album) {
  let albumInfo = document.createElement('div')
  albumInfo.className = 'album-render-div'
  albumInfo.innerHTML = `
    <img style='padding-top: 10px' src="${album.artworkUrl100}" width="75" height="75">
    <p class='icon'>${album.artistName}<br>
    ${album.collectionName}</p>
    `
  searchDisplay.appendChild(albumInfo)
        // *** MOVE ALBUM TO TOP TEN WITH NUMBER FORM *** // 
  albumInfo.addEventListener('click', () => {
    let checkExist = !!document.getElementById('number-form')
    if (checkExist === false) {
    let numForm = document.createElement('form')
    numForm.setAttribute('id', 'number-form')
    let numInputForm = document.createElement('input')
    numInputForm.setAttribute('type', 'number')
    numInputForm.setAttribute('min', '1')
    numInputForm.setAttribute('max', '10')
    numInputForm.setAttribute('id', 'number_control')
    numInputForm.setAttribute('name', 'number-ctrl')
    numForm.appendChild(numInputForm)
    let cancelAdd = document.createElement('BUTTON')
    cancelAdd.textContent = 'X'
    numForm.appendChild(cancelAdd)
    let submitNumber = document.createElement('input')
    submitNumber.setAttribute('type', 'submit')
    submitNumber.setAttribute('value', 'TOP TEN!')
    submitNumber.setAttribute('class', 'button')
    numForm.appendChild(submitNumber)
    albumInfo.appendChild(numForm)
   
    // cancelAdd.addEventListener('click', () => {
    //   numForm.remove()
    // })
            // *** USING NUMBER FORM, CAPTURE ALBUM RANK *** //
    numForm.addEventListener ('submit', (e) => {
      e.preventDefault()
      searchDisplay.innerHTML = ""
    albumRanking = e.target.number_control.value
            // *** USING ALBUM RANK, ADD ALBUM COVER *** //
            // *** AND ARTIST, ALBUM, GENRE, AND YEAR *** //
      if (albumRanking == 1) {
        coverOne.innerHTML = ""
        let albumCover = document.createElement('img')
        albumCover.src = `${album.artworkUrl100}`
        albumCover.id = 'album-cover-one'
        albumCover.className = 'placed-cover'
        coverOne.appendChild(albumCover)
        paraOne.innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0,4)}`
      }
      if (albumRanking == 2) {
        coverTwo.innerHTML = ""
        let albumCover = document.createElement('img')
        albumCover.src = `${album.artworkUrl100}`
        albumCover.id = 'album-cover-two'
        albumCover.className = 'placed-cover'
        coverTwo.appendChild(albumCover)
        paraTwo.innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0,4)}`
      } 
      if (albumRanking == 3) {
        coverThree.innerHTML = ""
        let albumCover = document.createElement('img')
        albumCover.src = `${album.artworkUrl100}`
        albumCover.id = 'album-cover-three'
        albumCover.className = 'placed-cover'
        coverThree.appendChild(albumCover)
        paraThree.innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0,4)}`
      }
      if (albumRanking == 4) {
        coverFour.innerHTML = ""
        let albumCover = document.createElement('img')
        albumCover.src = `${album.artworkUrl100}`
        albumCover.id = 'album-cover-four'
        albumCover.className = 'placed-cover'
        coverFour.appendChild(albumCover)
        paraFour.innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0,4)}`
      } 
      if (albumRanking == 5) {
        coverFive.innerHTML = ""
        let albumCover = document.createElement('img')
        albumCover.src = `${album.artworkUrl100}`
        albumCover.id = 'album-cover-five'
        albumCover.className = 'placed-cover'
        coverFive.appendChild(albumCover)
        paraFive.innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0,4)}`
      }
      if (albumRanking == 6) {
        coverSix.innerHTML = ""
        let albumCover = document.createElement('img')
        albumCover.src = `${album.artworkUrl100}`
        albumCover.id = 'album-cover-six'
        albumCover.className = 'placed-cover'
        coverSix.appendChild(albumCover)
        paraSix.innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0,4)}`
      } 
      if (albumRanking == 7) {
        coverSeven.innerHTML = ""
        let albumCover = document.createElement('img')
        albumCover.src = `${album.artworkUrl100}`
        albumCover.id = 'album-cover-seven'
        albumCover.className = 'placed-cover'
        coverSeven.appendChild(albumCover)
        paraSeven.innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0,4)}`
      }
      if (albumRanking == 8) {
        coverEight.innerHTML = ""
        let albumCover = document.createElement('img')
        albumCover.src = `${album.artworkUrl100}`
        albumCover.id = 'album-cover-eight'
        albumCover.className = 'placed-cover'
        coverEight.appendChild(albumCover)
        paraEight.innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0,4)}`
      } 
      if (albumRanking == 9) {
        coverNine.innerHTML = ""
        let albumCover = document.createElement('img')
        albumCover.src = `${album.artworkUrl100}`
        albumCover.id = 'album-cover-nine'
        albumCover.className = 'placed-cover'
        coverNine.appendChild(albumCover)
        paraNine.innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0,4)}`
      }
      if (albumRanking == 10) {
        coverTen.innerHTML = ""
        let albumCover = document.createElement('img')
        albumCover.src = `${album.artworkUrl100}`
        albumCover.id = 'album-cover-ten'
        albumCover.className = 'placed-cover'
        coverTen.appendChild(albumCover)
        paraTen.innerHTML = `artist: ${album.artistName}<br>
        album: ${album.collectionName}<br>
        genre: ${album.primaryGenreName}<br>
        year: ${album.releaseDate.slice(0,4)}`
      } 
  })
  }
})
}

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
  suggestionBox.appendChild(otherUserComment);
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

// class Album {
//   constructor (artist, album, genre, year, cover) {
//     this.artist = artist;
//     this.album = album;
//     this.genre = genre;
//     this.year = year;
//     this.cover = cover;
//   }
//   createAlbumInfo (array) {
//     array.artistName = artist;
//     array.collectionName = album;
//     array.artworkUrl100 = cover;
//   }
// }
  
