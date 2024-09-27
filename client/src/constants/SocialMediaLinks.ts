import {
  facebookIcon,
  gmailIcon,
  instagramIcon,
  soundCloudIcon,
  telegramIcon,
  twitterIcon,
  whatsappIcon,
} from "@/components/Icons";

export const socialMediaLinks = [
  { icon: facebookIcon, href: "https://www.facebook.com/w2quran" },
  { icon: instagramIcon, href: "https://www.instagram.com/way2quran" },
  { icon: twitterIcon, href: "https://twitter.com/way2quran" },
  { icon: soundCloudIcon, href: "https://soundcloud.com/way2quran" },
  { icon: gmailIcon, href: "mailto:info@way2quran.com" },
];

export const socialMediaShare = [
  {
    href: `https://www.facebook.com/sharer/sharer.php?u=`,
    icon: facebookIcon,
    name: "facebook",
  },
  {
    href: `https://twitter.com/intent/tweet?url=`,
    icon: twitterIcon,
    name: "twitter",
  },
  {
    href: `https://wa.me/?text=`,
    icon: whatsappIcon,
    name: "whatsapp",
  },
  {
    href: `https://t.me/share/url?url=`,
    icon: telegramIcon,
    name: "telegram",
  },
];
