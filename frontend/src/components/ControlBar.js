import { useState } from "react";
import { createLocalScreenTracks } from "livekit-client";

import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa";
import { FaPhoneSlash } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";

function ControlBar({ room, userName }) {

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const toggleMic = async () => {

    const enabled = room.localParticipant.isMicrophoneEnabled;

    await room.localParticipant.setMicrophoneEnabled(!enabled);

    setMicOn(!enabled);
  };

  const toggleCamera = async () => {

    const enabled = room.localParticipant.isCameraEnabled;

    await room.localParticipant.setCameraEnabled(!enabled);

    setCameraOn(!enabled);
  };

  const shareScreen = async () => {

    const tracks = await createLocalScreenTracks();

    tracks.forEach((track) => {
      room.localParticipant.publishTrack(track);
    });
  };

  const raiseHand = async () => {

    const message = {
      type: "raise-hand",
      user: userName
    };

    const encoded = new TextEncoder().encode(JSON.stringify(message));

    await room.localParticipant.publishData(encoded);
  };

  const leaveMeeting = () => {

    room.disconnect();
    window.location.reload();
  };

  return (
    <div className="controls">

      <button onClick={toggleMic}>
        {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
      </button>

      <button onClick={toggleCamera}>
        {cameraOn ? <FaVideo /> : <FaVideoSlash />}
      </button>

      <button onClick={shareScreen}>
        <FaDesktop />
      </button>

      <button onClick={raiseHand}>
        <FaHandPaper />
      </button>

      <button className="leave-btn" onClick={leaveMeeting}>
        <FaPhoneSlash />
      </button>

    </div>
  );
}

export default ControlBar;