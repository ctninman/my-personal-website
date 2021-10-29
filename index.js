        // *** DECLARED VARIABLES *** //
let enterId = document.getElementById('enter-id')
let userName = ""
let averageYear = document.getElementById('average-year')

        // *** ADD USERNAME TO TITLE *** //
enterId.addEventListener('submit', (event) => {
    event.preventDefault();
    userName = event.target.user_id.value
    document.getElementById('userName-topten').innerText = 
    `${userName}'s Top Ten Albums`
    averageYear.innerText = 
    `The average release date for ${userName}’s Top Ten is:`
})
