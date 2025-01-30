import { useState, useRef, useEffect } from "react";
import "./chatbot.scss";
import axios from "axios";
import { AiOutlineSend, AiOutlineCloseCircle } from "react-icons/ai";
import jwtDecode from "jwt-decode";
const ChatBot = () => {
  const [chatbot, setChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // const [botMessage, setBotMessage] = useState();

  const handleChatbot = () => {
    setChatbot(!chatbot);
  };
  useEffect(scrollToBottom, [messages]);
  const sendMessage = async () => {
    const userMessage = userInput.trim();
    if (!userMessage) return;
    // Display user message
    setMessages([...messages, { sender: "You", text: userMessage }]);
    setUserInput("");
    setMessages([
      ...messages,
      { sender: "You", text: userMessage },
      { sender: "Bot", text: "Typing..." },
    ]);
    // Send to API
    // const response = await fetch('http://localhost:12500/api/chat', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ Body: userMessage,"9898989" }),
    // });
    // // Get response
    // var response;
    axios
      .post("https://chat1.ocpl.tech:12500/api/chat", {
        message: userMessage,
        number: user.mobile,
      })
      .then((response) => {
        // // console.log(response.data.response);
        const data = response.data.response;
        const botMessage = data;
        setMessages([
          ...messages,
          { sender: "You", text: userMessage },
          { sender: "Bot", text: botMessage },
        ]);
      });
    // Display bot message
  };
  const onInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <div className="chatbot">
      <div className="d-flex justify-content-between align-items-center">
        <img
          src="https://aestra.ocpl.tech/static/media/Whats.58cb76dcea94be0580dc.webp"
          className={`${
            chatbot ? `width-50` : `logo-chatbot`
          } bg-dark rounded-circle`}
          onClick={handleChatbot}
          alt="LOGO"
        />
      </div>
      {chatbot && (
        <div className="container chatbot-inner">
          <div className="card bg-white text-white">
            <div className="card-body ">
              <div className="d-flex justify-content-between align-items-center">
                <div className="offline-message">
                  <span className="online">
                    <span>We are online</span>
                  </span>
                </div>
                <AiOutlineCloseCircle
                  onClick={() => setChatbot(false)}
                  className="close-bot"
                />
              </div>
              <div className="overflow-auto">
                <h3 className="initial-msg">
                  Hello There. How can I help you today?
                </h3>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-3 message ${
                      message.sender === "You" ? "user-msg" : "bot-msg"
                    }`}
                  >
                    <strong>{message.sender}:</strong> {message.text}
                  </div>
                ))}

                <div ref={chatEndRef} />
              </div>
              <form>
                <div className="input-group mt-3">
                  <textarea
                    className="form-control"
                    value={userInput}
                    rows="1"
                    cols="2"
                    onChange={onInputChange}
                    onKeyDown={onEnterPress}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={sendMessage}
                  >
                    <AiOutlineSend />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
