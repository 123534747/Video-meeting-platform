import { useState } from "react";

function ChatPanel({ room, userName }) {

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = async () => {

    if (!text) return;

    const message = {
      user: userName,
      text: text
    };

    const encoded = new TextEncoder().encode(JSON.stringify(message));

    await room.localParticipant.publishData(encoded);

    setMessages(prev => [...prev, message]);

    setText("");

  };

  // receive messages
  room.on("data-received", (payload, participant) => {

    const decoded = JSON.parse(new TextDecoder().decode(payload));

    setMessages(prev => [...prev, decoded]);

  });

  return (
    <div className="chat-panel">

      <div className="chat-messages">

        {messages.map((m, index) => (
          <div key={index} className="chat-message">
            <b>{m.user}:</b> {m.text}
          </div>
        ))}

      </div>

      <div className="chat-input">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatPanel;