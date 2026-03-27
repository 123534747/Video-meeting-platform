import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

function VideoTile({ track, name, active,  raised }) {

  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {

    if (track && videoRef.current) {
      track.attach(videoRef.current);
    }

    return () => {
      if (track) {
        track.detach();
      }
    };

  }, [track]);

  return (
    <div className={`video-box ${active ? "active-speaker" : ""}`}>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="video-element"
      />

      <div className="video-footer">

        <span>{name}  {raised && "✋"}</span>

        <span>
          {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </span>

      </div>

    </div>
  );

  
  
}

export default VideoTile;