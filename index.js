const revealManny = document.getElementById("section_three")
const revealGuitar = document.getElementById("section_one")
const revealPreK = document.getElementById("section_two")
const revealThird = document.getElementById("section_four")

document.getElementById("manny").addEventListener("click", function() {
    revealManny.style.display = "block";
    revealGuitar.style.display = "none";
    revealPreK.style.display = "none";  
    revealThird.style.display = "none";   
});


document.getElementById("guitar").addEventListener("click", function() {
    revealGuitar.style.display = "block";
    revealManny.style.display = "none";
    revealPreK.style.display = "none";  
    revealThird.style.display = "none";  
});

document.getElementById("prek").addEventListener("click", function() {
    revealPreK.style.display = "block";  
    revealGuitar.style.display = "none";
    revealManny.style.display = "none";
    revealThird.style.display = "none";  
});

document.getElementById("third").addEventListener("click", function() {
    revealThird.style.display = "block"; 
    revealPreK.style.display = "none";  
    revealGuitar.style.display = "none";
    revealManny.style.display = "none"; 
});