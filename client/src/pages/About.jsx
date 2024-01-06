import React from "react";
import {
  note,
  facebookIcon,
  twitterIcon,
  instagramIcon,
  soundCloudIcon,
  gmailIcon,
} from "../components/Icons";
import { useTranslation } from "react-i18next";
import { Heading, HelmetConfig, Layout } from "../components";

function About() {
  const { t } = useTranslation();

  const socialMedia = [
    { icon: facebookIcon, href: "https://www.facebook.com/w2quran" },
    { icon: instagramIcon, href: "https://www.instagram.com/way2quran" },
    { icon: twitterIcon, href: "https://twitter.com/way2quran" },
    { icon: soundCloudIcon, href: "https://soundcloud.com/way2quran" },
    { icon: gmailIcon, href: "mailto:info@way2quran.com" },
  ];

  return (
    <>
      <HelmetConfig title={t("aboutTitle")} />
      <Layout>
        <div className="container max-w-screen-lg min-h-[75vh] mt-10">
          <div className="about-us text-center">
            <Heading sectionTitle={t("aboutTitle")} />
            <ul className="list-none gap-4 flex-col flex justify-start items-start text-start flex-wrap px-3">
              {Array.from({ length: 5 }, (_, index) => (
                <li
                  key={index + 1}
                  className="flex justify-center text-sm sm:text-lg text-gray-900 dark:text-slate-50"
                >
                  <span>{note}</span>
                  {t(`about_${index + 1}`)}
                </li>
              ))}
            </ul>

            <div className="social-media-links flex gap-3 mt-8 justify-center">
              {socialMedia.map((link, i) => (
                <a key={i} href={link.href} target="_blank">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default About;
