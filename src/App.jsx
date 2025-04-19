import React, { useState } from "react";
import "./App.css";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [previousUserInput, setPreviousUserInput] = useState("");
    const [previousCount, setPreviousCount] = useState(0);
    const [currentMode, setCurrentMode] = useState("Default");

    const appendMessage = (sender, text) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender, text },
        ]);
    };

    const handleSend = () => {
        if (!userInput.trim()) return;

        // Check for repeating inputs
        if (userInput.toLowerCase().replace(/\s/g, "") === previousUserInput.toLowerCase().replace(/\s/g, "")) {
            setPreviousCount(previousCount + 1);
        } else {
            setPreviousUserInput(userInput);
            setPreviousCount(1);
        }

        // Display user input
        appendMessage("user", userInput);

        if (previousCount === 2) {
            appendMessage("bot", "Hmm.. Sounds like you're repeating yourself");
        } else if (previousCount === 3) {
            appendMessage("bot", "Please don't waste my time..");
        } else if (previousCount === 4) {
            appendMessage("bot", "Are we really doing this??");
        } else if (previousCount === 5) {
            appendMessage("bot", "I am done!!");
        } else if (previousCount >= 6) {
            appendMessage("bot", "#GoHome");
        } else {
            // Handle bot response
            setTimeout(() => {
                if (currentMode === "Training") {
                    appendMessage("bot", `Training mode: Expected reply for "${previousUserInput}" is "${userInput}"`);
                    setCurrentMode("Default");
                } else {
                    // Simulate bot response
                    appendMessage("bot", `You said: "${userInput}"`);
                }
            }, 1000);
        }

        setUserInput("");
    };

    const startTraining = () => {
        setCurrentMode("Training");
        appendMessage("bot", "Training mode started. What would be your expected reply?");
    };

    const stopTraining = () => {
        setCurrentMode("Default");
        appendMessage("bot", "Training has stopped. Say or ask something else.");
    };

    // const selectOption = (option) => {
    //     appendMessage("user", option);
    //     setTimeout(() => {
    //         appendMessage("bot", `You selected: "${option}"`);
    //     }, 1000);
    // };

    return (
        <div className="App">

          {/* Header */}
          <div className="header">
            <h1>AI Chatbot</h1>
          </div>
          
          {/* Chat Area */}
          <div id="conversation" className="conversation">
              {messages.map((msg, index) => (
                  <div className="message" key={index}>
                    <div className={`chat ${msg.sender === "user" ? "userChat" : "botChat"}`}>
                        {msg.text}
                    </div>
                  </div>                    
              ))}
          </div>

          {/* Input Area */}
          <div className="input-area">
              <input
                  id="userInput"
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Say or ask something..."
              />
              <button id="sendBtn" onClick={handleSend}>
                  Send
              </button>
              <button id="trainMeBtn" onClick={startTraining}>
                  Train Me
              </button>
              <button id="stopTrainingBtn" onClick={stopTraining}>
                  Stop Training
              </button>
          </div>
        </div>
    );
};

export default App;