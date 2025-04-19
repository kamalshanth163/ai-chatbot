import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import Greetings from "./data/Greetings";
import Questions from "./data/Questions";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [currentMode, setCurrentMode] = useState("Default");
    const conversationRef = useRef(null);
    const greetings = new Greetings();
    const questions = new Questions();

    // Scroll to bottom of conversation
    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [messages]);

    const appendMessage = (sender, text) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender, text, isHtml: typeof text === 'string' && text.startsWith('<') }
        ]);
    };

    const handleSend = useCallback(() => {
        if (!userInput.trim()) return;

        // Display user input
        appendMessage("user", userInput);

        setTimeout(() => {
            if (currentMode === "Training") {
                appendMessage("bot", `Training mode: Expected reply for "${userInput}"`);
                setCurrentMode("Default");
            } else {
                // Check greetings first
                const greetingReply = greetings.getReply(userInput);
                if (greetingReply) {
                    appendMessage("bot", greetingReply);
                    return;
                }

                // Then check questions
                const questionReply = questions.getReply(userInput);
                if (questionReply) {
                    appendMessage("bot", questionReply);
                    return;
                }

                // Default response if no matches
                appendMessage("bot", "I didn't understand that. Can you try asking something else?");
            }
        }, 500);

        setUserInput("");
    });

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const startTraining = () => {
        setCurrentMode("Training");
        appendMessage("bot", "Training mode started. What would be your expected reply?");
    };

    const stopTraining = () => {
        setCurrentMode("Default");
        appendMessage("bot", "Training has stopped. Say or ask something else.");
    };

    // const selectSubject = (subject) => {
    //     setCurrentMode("Default");
    //     appendMessage("bot", `You selected: ${subject}`);
    // }

    // Handle task option clicks
    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.classList.contains('task-types')) return;
            
            const optionElement = e.target.closest('[data-option]');
            if (optionElement) {
                const option = optionElement.getAttribute('data-option');
                setUserInput(option);
                handleSend();
            }
        };

        const conversation = conversationRef.current;
        if (conversation) {
            conversation.addEventListener('click', handleClick);
            return () => conversation.removeEventListener('click', handleClick);
        }
    }, [handleSend]);

    return (
        <div className="App">
          {/* Header */}
          <div className="header">
            <h1>AI Chatbot</h1>
          </div>
          
          {/* Chat Area */}
          <div ref={conversationRef} className="conversation" id="conversation">
              {messages.map((msg, index) => (
                  <div className={`message ${msg.sender}`} key={index}>
                    {msg.isHtml ? (
                        <div 
                            className={`chat ${msg.sender === "user" ? "userChat" : "botChat"}`}
                            dangerouslySetInnerHTML={{ __html: msg.text }}
                        />
                    ) : (
                        <div className={`chat ${msg.sender === "user" ? "userChat" : "botChat"}`}>
                            {msg.text}
                        </div>
                    )}
                  </div>                    
              ))}
          </div>

          {/* Input Area */}
          <div className="input-area">
              <input
                  type="text"
                  id="userInput"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Say or ask something..."
              />
              <button onClick={handleSend} id="sendBtn">
                  Send
              </button>
              <button 
                  onClick={startTraining}
                  id="trainMeBtn" 
                  style={{display: currentMode === "Training" ? "none" : "block" }}
              >
                  Train Me
              </button>
              <button 
                  onClick={stopTraining} 
                  id="stopTrainingBtn" 
                  style={{display: currentMode === "Training" ? "block" : "none" }}
              >
                  Stop Training
              </button>
          </div>
        </div>
    );
};

export default App;