import React from "react";
import Player from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AudioPlayer = () => {
  const url = localStorage.getItem("url");
  const isVisible = localStorage.getItem("isVisible");

  return (
    <div
      className={`fixed ${
        !isVisible && "hidden"
      }  bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[1277px] z-50`}
    >
      <Player src={url} />
    </div>
  );
};

export default AudioPlayer;
