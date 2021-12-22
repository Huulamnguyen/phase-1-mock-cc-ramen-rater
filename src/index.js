// write your code here
const BASE_URL = 'http://localhost:3000/ramens'

function init(){
    getFirstRamen()
    getAllRamen()
    handleFormSubmit()
}
init()

// Get the first ramen and show it on the DOM when the page loaded
function getFirstRamen(){
    return fetch(BASE_URL)
    .then(response => response.json())
    .then(ramens => showFirstRamen(ramens[0]))
}

function showFirstRamen(ramen){
    // console.log(ramen)
    // Destructing ramen
    const {name, restaurant, image, rating, comment} = ramen
    document.querySelector(".detail-image").src = image
    document.querySelector(".name").innerText = name
    document.querySelector(".restaurant").innerText = restaurant
    document.querySelector("#rating-display").innerText = rating
    document.querySelector("#comment-display").innerText = comment
}

// Get all ramens data from database
function getAllRamen(){
    fetch(BASE_URL)
    .then(response => response.json())
    .then(ramens => ramens.forEach(renderRamenImage))
}

// Render each ramen and update to the DOM
function renderRamenImage(ramenObj){
    // Destructing ramenObject
    const {name, restaurant, image, rating, comment} = ramenObj
    
    // Create a new image tag with src, then append it to the div#ramen-menu
    const img = document.createElement('img')
    img.src = image
    document.getElementById("ramen-menu").appendChild(img)

    // Add a eventListener when click the image, it will update on the DOM
    img.addEventListener("click", () => {
        document.querySelector(".detail-image").src = image
        document.querySelector(".detail-image").alt = name
        document.querySelector(".name").innerText = name
        document.querySelector(".restaurant").innerText = restaurant
        document.querySelector("#rating-display").innerText = rating
        document.querySelector("#comment-display").innerText = comment
    })
}

function handleFormSubmit(){
    // Grab the form
    const form = document.getElementById("new-ramen")

    // when hit submit, get input values
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Create new ramen object and assign input values to it
        const newRamen = {
            name:e.target["new-name"].value,
            restaurant:e.target["new-restaurant"].value,
            image:e.target["new-image"].value,
            rating:e.target["new-rating"].value,
            comment:e.target["new-comment"].value
        }

        // Update new ramen object to the database
        fetch(BASE_URL, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(newRamen)
        })
        .then(r => r.json())
        .then(newEntity => renderRamenImage(newEntity))
        .catch(err => console.log(error))

        // Clear the input value in the form
        e.target.reset()
    })

}
