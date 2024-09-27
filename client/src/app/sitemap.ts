import { RECITATIONS } from "@/constants/Recitations";
import Surahs from "@/constants/SurahsList";
import api, { CLIENT_URL } from "@/lib/Api";
import { ReciterProfile } from "@/types/types";

export default async function sitemap() {
  const recitations = RECITATIONS;

  const langs = ["ar", "en"];

  // List All Recitations Pages
  const recitationPages = [];
  for (let i = 0; i < langs.length; i++) {
    recitationPages.push(
      ...recitations.map((recitation) => ({
        url: `${CLIENT_URL}/${langs[i]}/${recitation.slug}`,
      }))
    );
  }

  // Get All Reciters Pages
  const recitersPages: { url: string }[] = [];
  for (let j = 0; j < recitations.length; j++) {
    const { data } = await api.get(
      `/api/reciters?recitationSlug=${recitations[j].slug}&pageSize=100000`
    );

    const { reciters } = data;

    langs.forEach((lang) => {
      recitersPages.push(
        ...reciters.map((reciter: ReciterProfile) => ({
          url: `${CLIENT_URL}/${lang}/reciters/${reciter.slug}?recitationSlug=${recitations[j].slug}`,
        }))
      );
    });
  }

  // Get All Surahs Pages
  const surahsPages: { url: string }[] = [];
  langs.forEach((lang) => {
    Surahs.map((surah) => {
      surahsPages.push({
        url: `${CLIENT_URL}/${lang}/surahs/${surah.slug}`,
      });
    });
  });

  const defaultRoutes = [
    { url: `${CLIENT_URL}/ar` },
    { url: `${CLIENT_URL}/en` },
    { url: `${CLIENT_URL}/en/about-us` },
    { url: `${CLIENT_URL}/ar/about-us` },
    { url: `${CLIENT_URL}/en/contact-us` },
    { url: `${CLIENT_URL}/ar/contact-us` },
    { url: `${CLIENT_URL}/en/reciters?recitationSlug=full-holy-quran` },
    { url: `${CLIENT_URL}/ar/reciters?recitationSlug=full-holy-quran` },
    { url: `${CLIENT_URL}/en/reciters?recitationSlug=various-recitations` },
    { url: `${CLIENT_URL}/ar/reciters?recitationSlug=various-recitations` },
    { url: `${CLIENT_URL}/en/frequent-recitations` },
    { url: `${CLIENT_URL}/ar/frequent-recitations` },
    { url: `${CLIENT_URL}/ar/download-quran-pdf` },
    { url: `${CLIENT_URL}/en/download-quran-pdf` },
    { url: `${CLIENT_URL}/en/surahs` },
    { url: `${CLIENT_URL}/ar/surahs` },
  ];

  const allPages = [
    ...defaultRoutes,
    ...recitationPages,
    ...recitersPages,
    ...surahsPages,
  ];

  return allPages;
}
