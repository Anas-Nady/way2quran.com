"use client";
import { socialMediaShare } from "@/constants/SocialMediaLinks";

interface SocialMediaShareButtonsProps {
  pageURL: string;
  handleClosePopup: () => void;
}

const SocialMediaShareButtons: React.FC<SocialMediaShareButtonsProps> = ({
  pageURL,
  handleClosePopup,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-3 social-media-share">
      <div className="flex justify-center gap-3 mt-8 social-media-links">
        {socialMediaShare.map((media) => (
          <a
            href={`${media.href}${pageURL}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClosePopup}
            key={media.name}
            aria-label={`Share on ${media.name}`}
          >
            {media.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaShareButtons;
