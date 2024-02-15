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
const firstFoodBtn = document.createElement("button")
const secondFoodBtn = document.createElement("button")
const thirdFoodBtn = document.createElement("button")
const foodDiv = document.createElement("div")
foodDiv.append(firstFoodBtn, secondFoodBtn, thirdFoodBtn) // Places buttons in div for food

// //subtypeFood
const firstSubtypeBtn = document.createElement("button")
const secondSubtypeBtn = document.createElement("button")
const thirdSubtypeBtn = document.createElement("button")
const subtypeDiv = document.createElement("div")
subtypeDiv.append(firstSubtypeBtn, secondSubtypeBtn, thirdSubtypeBtn) // Places buttons in div for subtypes

// Party
const partyLabel = document.createElement("label")
const partyInput = document.createElement("input")
const partyButton = document.createElement("button")
const partyForm = document.createElement("form")

//user confirm
const yesButton = document.getElementById("yes")
const noButton = document.getElementById("no")

// ------------------------------------------------
// Functions goes here 👇

// Function triggered by event! to show confirmation and end chat

const restartChat = () => {
  location.reload()
}

const submitDeliveryDate = (event) => {
  event.preventDefault()
  const datePicker = document.getElementById("date-picker")
  inputWrapper.innerHTML = ""
  showMessage(datePicker.value, "user")
  setTimeout(() => {
    showMessage(`Great, see you on ${datePicker.value}`, "bot")
    setTimeout(restartChat, 3000)
  }, 1000)

}

const displayDeliveryDatePicker = () => {
  inputWrapper.innerHTML = 
  `<form id="date-form">
    <label for="date-picker">Pick delivery date</label>
    <input id="date-picker" type="date">
    <button id="date-btn">Send</button>
  </form>`
  showMessage(`Perfect! When do you want this delivery?`, "bot")
  document.getElementById("date-btn").addEventListener("click", submitDeliveryDate)
}

const finalConfirm = () => {
  inputWrapper.innerHTML = ""
  if (orderConfirmed) {
    showMessage(`Yes`, "user")
    setTimeout(displayDeliveryDatePicker, 1000)
    console.log("Order confirmed")
    } else {
      showMessage(`No`, "user")
      setTimeout(() => showMessage(`Too bad. But you're welcome back another time!`, "bot"), 1000)
      console.log("Order not confirmed")
  }
}

// Function to display order confirmation buttons
const displayUserConfirm = () => {
  console.log("Asking for order confirmation")
  showMessage(
    `Got it! You have ordered ${foodSubtype} for ${partySize} people, to a total of ${orderValue} €. Is that OK?`, "bot"
    )
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
  setTimeout(displayUserConfirm, 1000)
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
  inputWrapper.append(partyForm)
  console.log("Showing party input and waiting...")
}

// Get size of party
const selectParty = () => {
  console.log(`Party!🥳`)
  setTimeout(() => {
    displayPartyInput() // Go to next step
    showMessage(`How many people are in your party? 🥳`, "bot")
  }, 1000)
}

// function triggered by event! save Subtype and send to showMessage, and move on (foodSubtype = subtype? can we just use subtype?)
const submitSubtype = (event) => {
  foodSubtype = event.target.textContent
  console.log("Subtype:", foodSubtype)
  showMessage(foodSubtype, "user")
  setTimeout(() => {
    inputWrapper.removeChild(subtypeDiv)
    showMessage(`Good choice! Our ${foodSubtype} is sublime.`, "bot")
    setTimeout(selectParty, 1000)// Go to next step
  }, 1000)
}

// function to display Pizza subtypes
const displayPizzaSubtypes = () => {
  // Display buttons
  firstSubtypeBtn.textContent = "Italian Pizza"
  secondSubtypeBtn.textContent = "Hawaii Pizza"
  thirdSubtypeBtn.textContent = "Vegan Pizza"

  inputWrapper.replaceChild(subtypeDiv, foodDiv)
  console.log("Showing pizza buttons")
}

// function to display Pasta subtypes
const displayPastaSubtypes = () => {
  // Display buttons
  firstSubtypeBtn.textContent = "Pasta Carbonara"
  secondSubtypeBtn.textContent = "Spaghetti Bolognaise"
  thirdSubtypeBtn.textContent = "Vegetarian Lasagne"

  inputWrapper.replaceChild(subtypeDiv, foodDiv)
  console.log("Showing pasta buttons")
}

// function to display Salad subtypes
const displaySaladSubtypes = () => {
  firstSubtypeBtn.textContent = "Caesar Salad"
  secondSubtypeBtn.textContent = "Caprese Salad"
  thirdSubtypeBtn.textContent = "Greek Salad"

  inputWrapper.replaceChild(subtypeDiv, foodDiv)
  console.log("Showing salad buttons")
}

// function triggered by event! to handle the food choice from event listeners and call on next function
const submitFoodChoice = (event) => {
  console.log(event)
  mainFoodChoice = event.target.textContent
  console.log("Main food: ", mainFoodChoice)
  showMessage(`${mainFoodChoice}`, "user")
  setTimeout(() => {
    showMessage(`Ok! What kind of ${mainFoodChoice}?`, "bot")
    switch (mainFoodChoice) {
      case "Pizza":
        displayPizzaSubtypes() // Go to next step
        break;
      case "Pasta":
        displayPastaSubtypes() // Go to next step
        break;
      case "Salad":
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

  // Assign class
  foodDiv.querySelectorAll("button").forEach(el => el.classList.add("food-btn"))

  // Display buttons
  firstFoodBtn.textContent = "Pizza" // Adds text in button
  secondFoodBtn.textContent = "Pasta"
  thirdFoodBtn.textContent = "Salad"

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

setTimeout(greetUser, 1000)

// Name
nameButton.addEventListener("click", submitName) // Event listener for submit button in form

// Food
foodDiv.querySelectorAll("button").forEach(el => el.addEventListener("click", (event) => submitFoodChoice(event)))
subtypeDiv.querySelectorAll("button").forEach(el => el.addEventListener("click", (event) => submitSubtype(event)))

// Party
partyInput.addEventListener("input", () => {
  partySize = partyInput.value // Update variable partySize
  partyLabel.textContent = `Party size: ${partySize}` // Update input label
})
partyButton.addEventListener("click", submitPartysize)
