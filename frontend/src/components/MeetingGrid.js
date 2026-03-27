import { useEffect, useState } from "react";
import { Room, createLocalVideoTrack } from "livekit-client";
import VideoTile from "./VideoTile";

function MeetingGrid({ roomId, userName, setRoom }) {

  const [tracks, setTracks] = useState([]);
  const [activeSpeaker, setActiveSpeaker] = useState(null);
  const [raisedHands, setRaisedHands] = useState([]);

  useEffect(() => {

    const joinRoom = async () => {

      const res = await fetch(
        `http://localhost:5000/token?room=${roomId}&user=${userName}`
      );

      const data = await res.json();

      const room = new Room();

      await room.connect(
        "wss://videoplatformmarch2026-hfbrndlo.livekit.cloud",
        data.token
      );

      setRoom(room);

      const videoTrack = await createLocalVideoTrack();

      await room.localParticipant.publishTrack(videoTrack);

      setTracks([
        {
          track: videoTrack,
          name: userName
        }
      ]);

      // Active speaker detection
      room.on("active-speaker-change", (speakers) => {

        if (speakers.length > 0) {
          setActiveSpeaker(speakers[0].identity);
        } else {
          setActiveSpeaker(null);
        }

      });

      // Participant join notification
      room.on("participant-connected", (participant) => {
        alert(`${participant.identity} joined`);
      });

      room.on("data-received", (payload, participant) => {

        const message = JSON.parse(new TextDecoder().decode(payload));

        if (message.type === "raise-hand") {
          setRaisedHands((prev) => [...prev, message.user]);
        }
 
      });

    };

    joinRoom();

  }, [roomId, userName, setRoom]);

  return (
    <div className="grid-container">

      {tracks.map((t, index) => (
        <VideoTile
          key={index}
          track={t.track}
          name={t.name}
          active={activeSpeaker === t.name}
          raised={raisedHands.includes(t.name)}
        />
      ))}

    </div>
  );
}

export default MeetingGrid;