let addToy = false;
const divCollection = document.querySelector("#toy-collection")


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

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toysArray => toysArray.forEach(renderToy))

function renderToy(toy){
  const divCard = document.createElement("div")
  divCard.className = "card"
  divCard.dataset.id = toy.id

  const h2 = document.createElement("h2")
  h2.textContent = toy.name

  const img = document.createElement("img")
  img.src = toy.image
  img.className = "toy-avatar"

  const p = document.createElement("p")
  p.textContent = toy.likes

  const button = document.createElement("button")
  button.className = "like-btn"
  button.textContent = "Like <3"

  // divCard.innerHTML = `
  //   <h2>${toy.name}</h2>
  //   <img src=${toy.image} class="toy-avatar" />
  //   <p>${toy.likes}</p>
  //   <button class="like-btn">Like <3</button>`

    divCard.append(h2, img, p, button)
    divCollection.append(divCard)
}

const form = document.querySelector(".add-toy-form")

form.addEventListener("submit", function(event){
  event.preventDefault()
  const name = event.target.name.value
  const img = event.target.image.value

  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {       
      "Content-Type": "application/json",
      Accept: "application/json"
  },
  body: JSON.stringify({
      name: name,
      image: img,
      likes: 0
  })
  })
  .then(response => response.json())
  .then(data => renderToy(data)) 
})

divCollection.addEventListener("click", function(event){
    if (event.target.className === "like-btn"){
      const cardDiv = event.target.closest(".card")
      const likes = cardDiv.querySelector("p")
      const totalLikes = parseInt(likes.textContent) + 1
      likes.textContent = totalLikes
      const id = cardDiv.dataset.id
      console.log(id)

      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {       
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
          likes: totalLikes
      })
      })
      .then(response => response.json())
      .then(data => console.log(data)) 

    }
})