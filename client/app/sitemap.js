import api, { baseURL } from "@/lib/api";

export default async function sitemap() {
  // Get All Reciters
  const recitationResponse = await fetch(`${baseURL}/api/recitations`);

  const { recitations } = await recitationResponse.json();

  const langs = ["ar", "en"];

  // Get All Recitations Pages
  let recitationPages = [];
  for (let i = 0; i < langs.length; i++) {
    recitationPages.push(
      ...recitations.map((recitation) => ({
        url: `${baseURL}/${langs[i]}/frequent-recitations/${recitation.slug}`,
      }))
    );
  }

  // Get All Reciters Pages
  let recitersPages = [];
  for (let j = 0; j < recitations.length; j++) {
    let { data } = await api.get(
      `/api/reciters?recitationSlug=${recitations[j].slug}&pageSize=100000`
    );

    let { reciters } = data;

    langs.forEach((lang) => {
      recitersPages.push(
        ...reciters.map((reciter) => ({
          url: `${baseURL}/${lang}/frequent-recitations/${recitations[j].slug}/${reciter.slug}?recitationSlug=${recitations[j].slug}`,
        }))
      );
    });
  }

  const defaultRoutes = [
    { url: `${baseURL}/ar` },
    { url: `${baseURL}/en` },
    { url: `${baseURL}/en/about-us` },
    { url: `${baseURL}/ar/about-us` },
    { url: `${baseURL}/en/contact-us` },
    { url: `${baseURL}/ar/contact-us` },
    { url: `${baseURL}/en/full-holy-quran` },
    { url: `${baseURL}/ar/full-holy-quran` },
    { url: `${baseURL}/en/various-recitations` },
    { url: `${baseURL}/ar/various-recitations` },
    { url: `${baseURL}/en/frequent-recitations` },
    { url: `${baseURL}/ar/frequent-recitations` },
    { url: `${baseURL}/ar/download-quran-pdf` },
    { url: `${baseURL}/en/download-quran-pdf` },
  ];

  const allPages = [...defaultRoutes, ...recitationPages, ...recitersPages];

  return allPages;
}
