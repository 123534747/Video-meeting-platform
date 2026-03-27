import { useState } from "react";
import "./meeting.css";

import MeetingGrid from "./components/MeetingGrid";
import ControlBar from "./components/ControlBar";
import Layout from "./components/Layout";
import JoinPage from "./components/JoinPage";
import MeetingHeader from "./components/MeetingHeader";
import ChatPanel from "./components/ChatPanel";

function App() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [participants, setParticipants] = useState([]);
  const [room, setRoom] = useState(null);


  const handleJoin = (name, room) => {
    setUserName(name);
    setRoomId(room);
    setParticipants([name]);
  };

  const addParticipant = () => {
    const names = ["Rahul", "Sneha", "Arjun", "David", "Priya"];
    const randomName = names[Math.floor(Math.random() * names.length)];

    setParticipants((prev) => [...prev, randomName]);
  };

  if (!userName) {
    return <JoinPage onJoin={handleJoin} />;
  }

  return (
    <Layout participants={participants}>

      <MeetingHeader roomId={roomId} participants={participants} />

      <h1 className="title">Video Meeting</h1>

      <button className="add-user-btn" onClick={addParticipant}>
        + Simulate User Join
      </button>

      <MeetingGrid
        roomId={roomId}
        userName={userName}
        setRoom={setRoom}
      />

      {room && <ControlBar room={room} userName={userName} />}
      {room && <ChatPanel room={room} userName={userName} />}

    </Layout>
  );
}

export default App;