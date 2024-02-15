// sofia-test-new-flow SEPARATE BRANCH

// Global variables
let userName = "buddy"
let mainFoodChoice = ""
let foodSubtype = ""
let partySize = "10"
let orderValue 
const onePizzaPrice = 15
const oneSaladPrice = 18
const onePastaPrice = 12
let orderConfirmed = false

// ------------------------------------------------
// DOM selectors (variables that point to selected DOM elements) goes here 👇
const chat = document.getElementById('chat')
const inputWrapper = document.getElementById("input-wrapper") // Select the input wrapper

// NAME
const nameButton = document.querySelector("button[class='send-btn']") // Select the submit button
const nameInput = document.getElementById("name-input") // Select the name input
const nameForm = document.getElementById("name-form")

// FOOD
const pizzaButton = document.createElement("button")
const pastaButton = document.createElement("button")
const saladButton = document.createElement("button")
const foodDiv = document.createElement("div")

//subtypeFood
const subtypeDiv = document.createElement("div")

// PIZZA
const italianButton = document.createElement("button")
const hawaiiButton = document.createElement("button")
const veganButton = document.createElement("button")

// PASTA
const carbonaraButton = document.createElement("button")
const bolognaiseButton = document.createElement("button")
const lasagneButton = document.createElement("button")

// SALAD
const caesarButton = document.createElement("button")
const capreseButton = document.createElement("button")
const greekButton = document.createElement("button")
// Party
const partyLabel = document.createElement("label")
const partyInput = document.createElement("input")
const partyButton = document.createElement("button")
const partyForm = document.createElement("form")

//user confirm
/*const confirmDiv = document.getElementById("button-form")*/
const yesButton = document.getElementById("yes")
const noButton = document.getElementById("no")
// const confirmDiv = document.createElement("div")
// const yesButton = document.createElement("button")
// const noButton = document.createElement("button")


// ------------------------------------------------
// Functions goes here 👇

// Function triggered by event! to show confirmation and end chat

const restartChat = () => {
  chat.innerHTML = ""
  greetUser()
}

const finalConfirm = () => {
  inputWrapper.innerHTML = ""
  if (orderConfirmed) {
    showMessage(`Yes`, "user")
    setTimeout(() => showMessage(`Perfect! We'll get right on that!`, "bot"), 1000)
    console.log("Order confirmed")
    } else {
      showMessage(`No`, "user")
      setTimeout(() => showMessage(`Too bad. But you're welcome back another time!`, "bot"), 1000)
      console.log("Order not confirmed")
  }
  setTimeout(() => restartChat(), 3000)
}

// Function to display order confirmation buttons
const displayUserConfirm = () => {
  console.log("Asking for order confirmation")
  showMessage(`Got it! You have ordered ${foodSubtype} for ${partySize} people, to a total of ${orderValue} €. Is that OK?`, "bot")
  inputWrapper.innerHTML =
  `<div id="button-form">
    <button id="yes" type="Submit">Yes</button>
    <button id="no" type="Submib">No</button>
  </div>`

  document.getElementById("yes").addEventListener("click", () =>  {
    orderConfirmed = true
    finalConfirm()
  })
  document.getElementById("no").addEventListener("click", () => {
    orderConfirmed = false
    finalConfirm()
  })
}

// Function to calculate order value based on food choice and party size
const calculateOrderValue = () => {
  console.log(`Calculate order value for ${partySize} people...`)
  switch (mainFoodChoice) {
    case "Pizza":
      orderValue = partySize * onePizzaPrice
      break;
    case "Pasta":
      orderValue = partySize * onePastaPrice
      break;
    case "Salad":
      orderValue = partySize * oneSaladPrice
      break;
    default:
      break;
  }
  displayUserConfirm()
}

// Function triggered by event! to handle party size value
const submitPartysize = (event) => {
  event.preventDefault()
  console.log("Partysize:", partySize)
  showMessage(partySize, "user")
  calculateOrderValue()
}

// Function to display party input
const displayPartyInput = () => {
  // Display form
  partyInput.type = "range"
  partyInput.id = "party-input"
  partyInput.value = "10"
  partyInput.max = "50"
  partyLabel.textContent = `Party size: ${partySize}`
  partyLabel.htmlFor = "party-input"
  partyButton.type = "submit"
  partyButton.textContent = "Send"

  partyForm.append(partyLabel, partyInput, partyButton)
  inputWrapper.replaceChild(partyForm, subtypeDiv)
  console.log("Showing party input and waiting...")
}

// Get size of party
const selectParty = () => {
  console.log(`Party!🥳`)
  setTimeout(() => {
    showMessage(`How many people are in your party? 🥳`, "bot")
    displayPartyInput() // Go to next step
  }, 1000)
}

// function triggered by event! save Subtype and send to showMessage, and move on (foodSubtype = subtype? can we just use subtype?)
const submitSubtype = (event) => {
  foodSubtype = event.target.textContent
  console.log("Subtype:", foodSubtype)
  showMessage(foodSubtype, "user")
  setTimeout(() => {
    showMessage(`Good choice! Our ${foodSubtype} is submlime.`, "bot")
    setTimeout(() => selectParty(), 500)// Go to next step
  }, 1000)
}

// function to display Pizza subtypes
const displayPizzaSubtypes = () => {
  // Display buttons
  italianButton.textContent = "Italian Pizza"
  hawaiiButton.textContent = "Hawaii Pizza"
  veganButton.textContent = "Vegan Pizza"

  subtypeDiv.append(italianButton, hawaiiButton, veganButton)
  inputWrapper.replaceChild(subtypeDiv, foodDiv)
  console.log("Showing pizza buttons")
}

// function to display Pasta subtypes
const displayPastaSubtypes = () => {
  // Display buttons
  carbonaraButton.textContent = "Pasta Carbonara"
  bolognaiseButton.textContent = "Spaghetti Bolognaise"
  lasagneButton.textContent = "Vegetarian Lasagne"

  subtypeDiv.append(carbonaraButton, bolognaiseButton, lasagneButton)
  inputWrapper.replaceChild(subtypeDiv, foodDiv)
  console.log("Showing pasta buttons")
}

// function to display Salad subtypes
const displaySaladSubtypes = () => {
  caesarButton.textContent = "Caesar Salad"
  capreseButton.textContent = "Caprese Salad"
  greekButton.textContent = "Greek Salad"

  subtypeDiv.append(caesarButton, capreseButton,greekButton)
  inputWrapper.replaceChild(subtypeDiv, foodDiv)
  console.log("Showing salad buttons")
}

// function triggered by event! to handle the food choice from event listeners and call on next function
const submitFoodChoice = (event) => {
  mainFoodChoice = event.target.textContent
  console.log("Main food: ", mainFoodChoice)
  showMessage(`${mainFoodChoice}`, "user")
  setTimeout(() => {
    showMessage(`Ok! What kind of ${mainFoodChoice}?`, "bot")
    switch (event.target.id) {
      case "pizza-btn":
        displayPizzaSubtypes() // Go to next step
        break;
      case "pasta-btn":
        displayPastaSubtypes() // Go to next step
        break;
      case "salad-btn":
        displaySaladSubtypes() // Go to next step
        break;
      default:
        showMessage("Something went wrong, try again", "bot")
        break;
    }
  }, 1000)
  
}

// Function to display food choices
const displayFood = () => {
  showMessage(`What kind of food would you like us to serve, ${userName}?`, "bot")
  // Display buttons
  pizzaButton.textContent = "Pizza" // Adds text in button
  pizzaButton.id = "pizza-btn" // Adds id to button
  pastaButton.textContent = "Pasta"
  pastaButton.id = "pasta-btn"
  saladButton.textContent = "Salad"
  saladButton.id = "salad-btn"

  foodDiv.append(pizzaButton, pastaButton, saladButton) // Places buttons in foodDiv
  inputWrapper.replaceChild(foodDiv, nameForm) // Replaces the nameForm with the new foodDiv
  console.log("Showing food buttons")
}

// function triggered by event! to save name and send to showMessage, and move on
const submitName = (event) => {
  event.preventDefault()
  nameInput.value ? userName = nameInput.value :
  nameInput.value = ""
  showMessage(nameInput.value, "user")
  setTimeout(() => displayFood(), 1000) // Go to next step, chooseFood
}
// Function to display message in chat
const showMessage = (message, sender) => {
  if (sender === 'user') {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
  } else if (sender === 'bot') {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }
  chat.scrollTop = chat.scrollHeight
}

// A function to start the conversation
const greetUser = () => {
  showMessage("Hello there, what's your name?", 'bot')
}

//------ Start from bottom up -------

// ------------------------------------------------
// Eventlisteners goes here 👇

// Here we invoke the first function to get the chatbot to ask the first question when
// the website is loaded. Normally we invoke functions like this: greeting()
// To add a little delay to it, we can wrap it in a setTimeout (a built in JavaScript function):
// and pass along two arguments:
// 1.) the function we want to delay, and 2.) the delay in milliseconds 
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greetUser, 1000)

// Name
nameButton.addEventListener("click", submitName) // Event listener for submit button in form

// Food
pizzaButton.addEventListener("click", (event) => submitFoodChoice(event))
pastaButton.addEventListener("click", (event) => submitFoodChoice(event)) 
saladButton.addEventListener("click", (event) => submitFoodChoice(event)) 

// Pizza
italianButton.addEventListener("click", (event) => submitSubtype(event)) // 
hawaiiButton.addEventListener("click", (event) => submitSubtype(event)) // 
veganButton.addEventListener("click", (event) => submitSubtype(event)) // 

// Pasta
carbonaraButton.addEventListener("click", (event) => submitSubtype(event)) // 
bolognaiseButton.addEventListener("click", (event) => submitSubtype(event)) // 
lasagneButton.addEventListener("click", (event) => submitSubtype(event)) // 

// Salad
caesarButton.addEventListener("click", (event) => submitSubtype(event))
capreseButton.addEventListener("click", (event) => submitSubtype(event))
greekButton.addEventListener("click", (event) => submitSubtype(event))

// Party
partyInput.addEventListener("input", () => {
  partySize = partyInput.value // Update variable partySize
  partyLabel.textContent = `Party size: ${partySize}` // Update input label
})
partyButton.addEventListener("click", submitPartysize)

// Confirm price
// yesButton.addEventListener("click", () => finalConfirm("yes"))
// noButton.addEventListener("click", () => finalConfirm("no"))


// ---------------------------------
/* OVERVIEW OF FUNCTIONS / FLOW
-->  greetUser 
Show greeting and ask for userName

submitName 
--> save name and send to showMessage,
calls next step

--> chooseFood 
ask for food choice, 
calls next step

--> displayFood 
changes to buttons with food alternatives

--> selectPizza || selectPasta || selectSalad 
logs mainFoodChoice and sends to showMessage
call next step display

--> displayPizzaSubtypes || displayPastaSubtypes || displaySaladSubtypes
change to buttons with subtypes correspondning to main choice,

--> selectSubtype
Logs subtype choice and sends to showMessage,
calls next step

--> selectParty


*/


