const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const sendButton = document.getElementById("send");
const micButton = document.getElementById("mic");
const response = document.getElementById("response");

function addMessage(text, type) {
const message = document.createElement("div");
message.className = "message " + type;

if (type === "user") {
    message.textContent = "YOU: " + text;
} else {
    message.textContent = "FRIDAY: " + text;
}

chat.appendChild(message);
chat.scrollTop = chat.scrollHeight;

}

function speak(text) {
if ("speechSynthesis" in window) {
window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
}

}

function getFridayResponse(command) {
const text = command.toLowerCase();

if (text.includes("hello") || text.includes("hi friday")) {
    return "Hello Boss. How may I assist you?";
}

if (text.includes("time")) {
    const now = new Date();

    return "The current time is " +
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
}

if (text.includes("date")) {
    return "Today is " +
        new Date().toLocaleDateString([], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
}

if (text.includes("youtube")) {
    window.open("https://www.youtube.com", "_blank");
    return "Opening YouTube.";
}

if (text.includes("whatsapp")) {
    window.open("https://web.whatsapp.com", "_blank");
    return "Opening WhatsApp.";
}

if (text.includes("status")) {
    return "All FRIDAY systems are online and operating normally.";
}

if (text.includes("who are you")) {
    return "I am FRIDAY, your personal artificial intelligence assistant.";
}

if (text.includes("thank")) {
    return "You are welcome, Boss.";
}

if (text.includes("bye") || text.includes("goodbye")) {
    return "Goodbye Boss. FRIDAY will be ready when you need me.";
}

return "I understand your command: " + command +
    ". My advanced AI connection is not configured yet.";

}

function processCommand(command) {
if (!command.trim()) {
return;
}

addMessage(command, "user");

input.value = "";

response.textContent = "Processing your command...";

setTimeout(() => {
    const answer = getFridayResponse(command);

    addMessage(answer, "ai");

    response.textContent = answer;

    speak(answer);
}, 500);

}

sendButton.addEventListener("click", () => {
processCommand(input.value);
});

input.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
processCommand(input.value);
}
});

/* Quick Command Buttons */

function quickCommand(command) {
processCommand(command);
}

/* Voice Recognition */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (SpeechRecognition) {

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

micButton.addEventListener("click", () => {
    response.textContent = "Listening...";
    micButton.style.transform = "scale(1.15)";

    recognition.start();
});

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;

    response.textContent = "You said: " + command;

    processCommand(command);
};

recognition.onerror = () => {
    response.textContent =
        "Voice recognition error. Please try again.";

    micButton.style.transform = "scale(1)";
};

recognition.onend = () => {
    micButton.style.transform = "scale(1)";
};

} else {

micButton.addEventListener("click", () => {
    response.textContent =
        "Voice recognition is not supported in this browser.";
});

}

/* Startup Message */

window.addEventListener("load", () => {
setTimeout(() => {
speak("Hello Boss. Friday systems are online.");
}, 800);
});
