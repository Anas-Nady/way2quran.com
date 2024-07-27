"use client";
import {
  facebookIcon,
  telegramIcon,
  twitterIcon,
  whatsappIcon,
} from "../Icons";

export default function SocialMediaShareBtn({ pageURL, handleClosePopup }) {
  const mediaShare = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${pageURL}`,
      icon: facebookIcon,
    },
    {
      href: `https://twitter.com/intent/tweet?url=${pageURL}`,
      icon: twitterIcon,
    },
    {
      href: `https://wa.me/?text=${pageURL}`,
      icon: whatsappIcon,
    },
    {
      href: `https://t.me/share/url?url=${pageURL}`,
      icon: telegramIcon,
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-3 social-media-share">
      <div className="flex justify-center gap-3 mt-8 social-media-links">
        {mediaShare.map((media, i) => (
          <a
            href={media.href}
            target="_blank"
            onClick={handleClosePopup}
            key={i}
          >
            {media.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
