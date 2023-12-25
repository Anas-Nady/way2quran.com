import React from "react";

const AudioPlayer = ({ url }) => {
  return (
    <audio controls className="ml-2">
      <source src={url} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
