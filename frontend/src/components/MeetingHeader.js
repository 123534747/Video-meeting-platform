import { useEffect, useState } from "react";

function MeetingHeader({ roomId, participants }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="meeting-header">
      <span>Room: {roomId}</span>
      <span>Participants: {participants.length}</span>
      <span>Time: {formatTime()}</span>
    </div>
  );
}

export default MeetingHeader;