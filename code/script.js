// DOM selectors (variables that point to selected DOM elements) goes here 👇
const chat = document.getElementById('chat')
const inputWrapper = document.getElementById('input-wrapper')
const nameButton = document.querySelector("button[class='send-btn']")
const nameInput = document.getElementById('name-input')

//const daySelection = document.getElementById('day')

//const daySelectionDrop = document.createElement('day')
//const dayInput= document.getElementById('day')

//globle variable
let userName = ""
let dayChoose = ""
let userChoseDay = ""



// Functions goes here 👇

// A function that will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  // The if statement checks if the sender is the user and if that's the case it inserts
  // an HTML section inside the chat with the posted message from the user
  if (sender === 'user') {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
    // The else if statement checks if the sender is the bot and if that's the case it inserts
    // an HTML section inside the chat with the posted message from the bot
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

  // This little thing makes the chat scroll to the last message when there are too many to
  // be shown in the chat box
  chat.scrollTop = chat.scrollHeight
}

// A function to start the conversation
const greetUser = () => {
  // Here we call the function showMessage, that we declared earlier with the argument:
  // "Hello there, what's your name?" for message, and the argument "bot" for sender
  showMessage("Hello there, I am Minibu 🐱 I am your weekly food assistance. what's your name?", 'bot')
  // Just to check it out, change 'bot' to 'user' here 👆 and see what happens
}
const nameFilling = (event) => {
  event.preventDefault();
  // Store the value in a variable so we can access it after we
  // clear it from the input
  userName = nameInput.value
  nameInput.value = ""
  showMessage(userName, "user")
  // After 1 second, show the next question by invoking the next function.
  // passing the name into it to have access to the user's name if we want
  // to use it in the next question from the bot.
  setTimeout(() => askDay(), 1000);
};

//bot ask user which day 
const askDay = () => {
  showMessage(`Nice to meet you ${userName}, which day do you want to prepare food for?`, 'bot')
  setTimeout(chooseDay, 1000)
}

//CSS later
const chooseDay = () => {
  inputWrapper.innerHTML = `
  <select id="day" >
    <option value=" " ><---Please select a day---></option>
    <option value= "Monday" >Monday</option>
    <option value= "Tuesday">Tuesday</option>
    <option value= "Wednesday">Wednesday</option>
    <option value= "Thursday">Thursday</option>
    <option value= "Friday">Friday</option>
    <option value= "Saturday">Saturday</option>
    <option value= "Sunday">Sunday</option>
  </select>`
  const daySelection= document.getElementById('day')
  daySelection.addEventListener('change', daySelected)
  }
  
const daySelected = (event) => {
  userChoseDay = event.target.value
  showMessage(`I chose ${userChoseDay}`, 'user')
  inputWrapper.innerHTML= ""
  setTimeout(foodSelect, 1000)
}

const foodSelect = () => {
  showMessage(`I have prepared two types of food for you on ${userChoseDay}. Please select the one you prefer`, 'bot')

}
  
 

  /*const daySelected = () =>{
  switch (dayChoose){
    case "Monday": 
      break
    case "Tuesday":
      break
    case "Wednesday":
      break
    case "Thursday":
      break
    case "Friday":
      break
    case "Saturday":
      break
    case "Sunday":
      break
    default:
      'Unknown';
  }
  showMessage(`You have chosen ${chooseDay}. I have prepare two choices for you, please click your meal!`, 'bot')
}*/


// Eventlisteners goes here 👇

nameButton.addEventListener('click', nameFilling)




//daySelection.addEventListener('select', )

// Here we invoke the first function to get the chatbot to ask the first question when
// the website is loaded. Normally we invoke functions like this: greeting()
// To add a little delay to it, we can wrap it in a setTimeout (a built in JavaScript function):
// and pass along two arguments:
// 1.) the function we want to delay, and 2.) the delay in milliseconds 
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greetUser, 1000)
 