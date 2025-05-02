import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import Greetings from "./data/Greetings";
import Questions from "./data/Questions";
import Login from "./auth/Login";
import Register from "./auth/Register";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [previousUserInput, setPreviousUserInput] = useState("");

    const [currentChatMode, setCurrentChatMode] = useState("Default");
    const [currentTrainMode, setCurrentTrainMode] = useState("Question");

    const conversationRef = useRef(null);

    const greetings = new Greetings();
    const questions = new Questions();

    const [learnings, setLearnings] = useState(new Map());

    // Check if the user is logged in from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Persist login state
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn"); // Clear login state
    };

    const toggleToRegister = () => {
        setIsRegistering(true);
    };

    const toggleToLogin = () => {
        setIsRegistering(false);
    };


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
        setPreviousUserInput(userInput);
        appendMessage("user", userInput);
    
        setTimeout(() => {
            if (currentChatMode === "Training") {
                if (currentTrainMode === "Question") {
                    appendMessage("bot", `Please provide your expected reply for "${userInput}"`);
                    setCurrentTrainMode("Answer");
                } else {
                    appendMessage("bot", `Your expected reply for "${previousUserInput}" is "${userInput}"`);
                    appendMessage("bot", `Please provide another question.`);

                    // Update learnings Map with new key-value pair
                    setLearnings(prevLearnings => {
                        const newLearnings = new Map(prevLearnings);
                        newLearnings.set(previousUserInput.toLowerCase().trim(), userInput);
                        return newLearnings;
                    });
                    
                    setCurrentTrainMode("Question");
                }
            } else {
                // First check learnings
                const learnedResponse = learnings.get(userInput.toLowerCase().trim());
                if (learnedResponse) {
                    appendMessage("bot", learnedResponse);
                    return;
                }
    
                // Then check greetings
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
    
                // Default response
                appendMessage("bot", "I didn't understand that. Can you try asking something else?");
            }
        }, 500);
    
        setUserInput("");
    }, [currentChatMode, currentTrainMode, previousUserInput, learnings, appendMessage]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const startTraining = () => {
        setCurrentChatMode("Training");
        appendMessage("bot", "Training started. Please provide a question.");
    };

    const stopTraining = () => {
        setCurrentChatMode("Default");
        appendMessage("bot", "Training has stopped. Say or ask something else.");
    };

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


    if (!isLoggedIn) {
        return isRegistering ? (
          <Register onRegister={toggleToLogin} toggleToLogin={toggleToLogin} />
        ) : (
          <Login onLogin={handleLogin} toggleToRegister={toggleToRegister} />
        );
    }

    return (
        <div className="App">
          {/* Header */}
          <div className="header">
            <h1>AI Chatbot, A Student Assistant</h1>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
          </div>

          <hr />
          
          {/* Chat Area */}
          <div ref={conversationRef} className="conversation" id="conversation">
            {messages.length === 0 ? (
                <div className="welcome-container">
                    <div className="welcome-text">Welcome to "Student Assistant AI Chatbot"</div>
                    <ul>
                        <li>Greet</li>
                        <li>View your subjects</li>
                        <li>View tasks of your subject</li>
                        <li>Train the chatbot</li>
                    </ul>
                </div>
            ) : (
                messages.map((msg, index) => (
                <div className={`message ${msg.sender}`} key={index}>
                    {/* {msg.isHtml ? ( */}
                        <div 
                            className={`chat ${msg.sender === "user" ? "userChat" : "botChat"}`}
                            dangerouslySetInnerHTML={{ __html: msg.text }}
                        />
                    {/* ) : (
                        <div className={`chat ${msg.sender === "user" ? "userChat" : "botChat"}`}>
                            {msg.text}
                        </div>
                    )} */}
                </div>
                ))
            )}
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
                  style={{display: currentChatMode === "Training" ? "none" : "block" }}
              >
                  Train Me
              </button>
              <button 
                  onClick={stopTraining} 
                  id="stopTrainingBtn" 
                  style={{display: currentChatMode === "Training" ? "block" : "none" }}
              >
                  Stop Training
              </button>
          </div>
        </div>
    );
};

export default App;