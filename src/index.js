let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


// Create cards for existing toys
function renderCard(toy) {

  const toyBox = document.querySelector('#toy-collection')
  let newCard = document.createElement('div')
  newCard.className = 'card'
  newCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img class='toy-avatar' src="${toy.image}">
    <p>${toy.likes} likes</p>
    <button class='like-btn' id="${toy.id}">like</button>
  `
  // Event listener for like button
  newCard.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes+=1
    newCard.querySelector('p').textContent = `${toy.likes} likes`
    updateLikes(toy)
  })

  // Add card to DOM
  toyBox.appendChild(newCard)

}

function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
   method: 'PATCH',
   headers: {
    "Content-Type": "application/json",
    "ACCEPT": "application/json"
   },
   body: JSON.stringify(toyObj)
  })
  .then(r => r.json())
  .then(toy => console.log(toy))
}
 


// Event Listeners
// for when new toy is added
const form = document.querySelector(".add-toy-form")
form.addEventListener('submit', handleSubmit)


// Event handlers
// taking new toy information and creating an object
// then invoking function to create a card
// then sending to server
function handleSubmit(e) {
  e.preventDefault()
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  renderNewToy(toyObj)
  collectToy(toyObj)
}

// DOM Render Functions
// Create card for new toy
function renderNewToy(toy) {
  const toyBox = document.querySelector('#toy-collection')
  let newCard = document.createElement('div')
  newCard.className = 'card'
  newCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img class='toy-avatar' src="${toy.image}">
    <p>${toy.likes} likes</p>
    <button class='like-btn' id="${toy.id}">like</button>
  `

  toyBox.appendChild(newCard)
  console.log('renderNewToy')
}

// Post to server
function collectToy(toy) {
  
  fetch('http://localhost:3000/toys', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}



// Fetch Requests
// Fetch request to get all existing toys in the server
// Parse and invoke function to create card for existing toys
function getToyData() {
  fetch('http://localhost:3000/toys')
  .then(r => r.json())
  .then(toyData => toyData.forEach(toy => renderCard(toy)))
}

// Initial Render
// Get Data and Render our Toys to the DOM
function initialize() {
  getToyData()
}

initialize()


