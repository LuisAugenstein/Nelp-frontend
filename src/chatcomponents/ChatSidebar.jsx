import React from "react";

const ChatSidebar = ({
  open,
  myPartners,
  setCurrentMessagePartner,
  currentMessagePartner,
  setMessages
}) => {
  return (
    <div className={"chat-sidebar chat-sidebar-" + (open ? "open" : "closed")}>
      <h2 id="header">Chatraum</h2>
      <ol className="users">
        {currentMessagePartner &&
          myPartners.map(p => {
            return (
              <li
                id={currentMessagePartner.id === p.id ? "current-partner" : ""}
                key={p.id}
                onClick={() => {
                  if (currentMessagePartner.id === p.id) return;
                  setMessages([]);
                  setCurrentMessagePartner({
                    id: p.id,
                    username: p.username,
                    imageURL: p.imageURL
                  });
                }}
              >
                {p.username}
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default ChatSidebar;
