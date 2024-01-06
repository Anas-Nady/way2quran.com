import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Footer, HelmetConfig, Layout, Navbar } from "./components";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./redux/store.js";
import AppRoutes from "./routes.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import React, { useEffect, useState } from "react";
import Player from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useTranslation } from "react-i18next";
import { closeIcon } from "./components/Icons";

const AudioPlayer = ({ url, isVisible, updateAudioPlayerData }) => {
  const handleAudioEnded = () => {
    updateAudioPlayerData({
      url: "",
      isVisible: false,
    });
  };

  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[1277px] z-50 transition-transform duration-500 ease-in-out ${
        !isVisible && "translate-y-full"
      }`}
    >
      <span
        className={`bg-gray-700 rounded-lg -top-6 -right-1 w-7 h-7 flex justify-center items-center text-white cursor-pointer absolute mx-auto text-center ${
          !isVisible && "hidden"
        }`}
        onClick={handleAudioEnded}
      >
        {closeIcon}
      </span>
      <Player src={url} onEnded={handleAudioEnded} />
    </div>
  );
};

function App() {
  const [audioPlayerData, setAudioPlayerData] = useState({
    url: localStorage.getItem("url") || "",
    isVisible: localStorage.getItem("isVisible") === "true",
  });

  const updateAudioPlayerData = (newData) => {
    setAudioPlayerData(newData);
  };

  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    localStorage.removeItem("isVisible");
    localStorage.removeItem("url");
  });

  return (
    <Provider store={store}>
      <ToastContainer position="top-center" />
      <Router>
        <main
          className={`bg-slate-50 dark:bg-gray-900 min-h-screen py-7 px-2 relative ${
            currentLang == "ar" ? "font-arabic" : "font-english"
          }`}
        >
          <Navbar />
          <ScrollToTop />
          <AudioPlayer
            {...audioPlayerData}
            updateAudioPlayerData={updateAudioPlayerData}
          />

          <AppRoutes updateAudioPlayerData={updateAudioPlayerData} />
          <Footer />
        </main>
      </Router>
    </Provider>
  );
}

export default App;
