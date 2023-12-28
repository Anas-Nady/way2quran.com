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
import { Heading, HelmetConfig } from "../components";

function About() {
  const { t } = useTranslation();

  return (
    <>
      <HelmetConfig title={t("aboutTitle")} />
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
            <a href="https://www.facebook.com/w2quran" target="_blank">
              {facebookIcon}
            </a>
            <a href="https://www.instagram.com/way2quran" target="_blank">
              {instagramIcon}
            </a>
            <a href="https://twitter.com/way2quran" target="_blank">
              {twitterIcon}
            </a>
            <a href="https://soundcloud.com/way2quran" target="_blank">
              {soundCloudIcon}
            </a>
            <a href="mailto:info@way2quran.com" target="_blank">
              {gmailIcon}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
