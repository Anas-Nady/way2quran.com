import React from "react";
import { facebookIcon, telegramIcon, twitterIcon, whatsappIcon } from "./Icons";

function SocialMediaShareBtn({ pageURL, handleClosePopup }) {
  return (
    <div className="social-media-share flex justify-center items-center gap-2 mb-3">
      <div className="social-media-links flex gap-3 mt-8 justify-center">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${pageURL}`}
          target="_blank"
          onClick={handleClosePopup}
        >
          {facebookIcon}
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${pageURL}`}
          target="_blank"
          onClick={handleClosePopup}
        >
          {twitterIcon}
        </a>
        <a
          href={`https://wa.me/?text=${pageURL}`}
          target="_blank"
          onClick={handleClosePopup}
        >
          {whatsappIcon}
        </a>
        <a
          href={`https://t.me/share/url?url=${pageURL}`}
          target="_blank"
          onClick={handleClosePopup}
        >
          {telegramIcon}
        </a>
      </div>
    </div>
  );
}

export default SocialMediaShareBtn;
