let btn = document.querySelector("#btn")
let content = document.querySelector("#content")


function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-IN"
    window.speechSynthesis.speak(text_speak) 
}

function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }else if(hours>=12 && hours<16){
        speak("Good afternoon sir")
    }else{
        speak("Good evening sir")
    }
}

// window.addEventListener('load',()=>{
//     wishMe()
// })

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (speechRecognition) {
    let recognition = new speechRecognition();
    recognition.continuous = false; // Optional: Set to true if you want continuous listening
    recognition.interimResults = false; // Optional: Set to true if you want partial results

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript.trim().toLowerCase(); // Trim and convert to lowercase
        content.innerText = transcript;
        takeCommand(transcript);
    };

    // Correct 'Click' event to lowercase 'click'
    btn.addEventListener('click', () => {
        recognition.start();
    });
} else {
    console.log("Speech recognition not supported by this browser.");
}

function takeCommand(message) {
    console.log("Received message",message)
    // Case-insensitive comparison for commands
    if (message.includes("hello")) {
        speak("Hello Sir, What can I help you with?");
    } else if (message.includes("how are you")) {
        speak("I am doing well, thank you!");
    }
    // You can add more commands as needed
}