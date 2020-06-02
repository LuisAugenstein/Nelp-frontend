import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.scss";
import Navigator from "../navbarcomponents/Navigator";
import ChatSidebar from "./ChatSidebar";

const Chat = ({
  socket,
  user,
  currentMessagePartner,
  setCurrentMessagePartner,
}) => {
  const [chatSidebarOpen, setChatSidebarOpen] = useState(true);
  //myPartners = [{id, username, imageURL}, ...]
  const [myPartners, setmyPartners] = useState([]);
  //messages = [{id, sender, receiver, date, text}, ...]
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const getMessagePartners = (callback) => {
    if (!user || (!user.id && user.id !== 0)) return;
    socket.emit("getMessagePartners", { id: user.id }, (partners) => {
      if (partners.length === myPartners.length) return;
      setmyPartners(partners);
      if (callback) return callback(partners);
      if (partners.length === 0 || currentMessagePartner !== null) return;
      setCurrentMessagePartner(partners.find((p) => true));
    });
  };

  const getMessages = () => {
    if (!user || (!user.id && user.id !== 0) || !currentMessagePartner) return;
    socket.emit(
      "getMessages",
      { sender: user.id, receiver: currentMessagePartner.id },
      (newMessages) => setMessages(newMessages)
    );
  };

  useEffect(() => {
    if (!user || (!user.id && user.id !== 0)) return;
    getMessagePartners();
    /*socket.on("newMessagesAvailable", ({ msg }) => {
      if (msg.receiver !== user.id) return;
      getMessagePartners((partners) => {
        const partner = partners.find((p) => p.id === msg.sender);
        if (partner) setCurrentMessagePartner(partner);
      });
    });*/
  }, [user.id]);

  useEffect(() => {
    getMessages();
  }, [currentMessagePartner, user.id]);

  const sendMessage = () => {
    if (!user || !currentMessagePartner) return;
    const msg = {
      sender: user.id,
      receiver: currentMessagePartner.id,
      date: "",
      text: message,
    };
    socket.emit("addMessage", msg, (id) => {
      msg.id = id;
      setMessages([...messages, msg]);
      setMessage("");
    });
  };

  return (
    <div>
      <Navigator />
      <main className="chat-body">
        <ChatSidebar
          open={chatSidebarOpen}
          myPartners={myPartners}
          setCurrentMessagePartner={setCurrentMessagePartner}
          currentMessagePartner={currentMessagePartner}
          setMessages={setMessages}
        />
        <ScrollToBottom>
          <div className="chat_main">
            <ol id="messages" className="chat_messages">
              {messages.map((msg) => {
                let sender =
                  msg.sender === user.id
                    ? user.username
                    : currentMessagePartner.username;
                return (
                  <li
                    key={"message-" + msg.id}
                    className={
                      "message " +
                      (msg.sender === user.id ? "" : "message-other")
                    }
                  >
                    <div className="message_title">
                      <h4>{sender}</h4>
                      <span>{msg.date}</span>
                    </div>
                    <div className="message_body">
                      <p>{msg.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </ScrollToBottom>

        <div className="chat_footer">
          <div id="input-row">
            <div
              className="chat-sidebar-btn"
              onClick={() => setChatSidebarOpen(!chatSidebarOpen)}
            >
              {chatSidebarOpen ? "<" : ">"}
            </div>

            <input
              id="text-field"
              type="text"
              name="message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
            />
            <button id="submit-btn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
