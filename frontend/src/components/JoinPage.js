import { useState } from "react";

function JoinPage({ onJoin }) {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleJoin = () => {
    if (name.trim() !== "" && roomId.trim() !== "") {
      onJoin(name, roomId);
    } else {
      alert("Please enter name and meeting ID");
    }
  };

  return (
    <div className="join-container">
      <h1>Join Video Meeting</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter meeting ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      <button onClick={handleJoin}>Join Meeting</button>
    </div>
  );
}

export default JoinPage;