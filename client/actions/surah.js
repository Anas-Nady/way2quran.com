import { baseURL } from "@/lib/api";

export const getSurahWithReciter = async (
  reciterSlug,
  recitationSlug,
  surahSlug
) => {
  const res = await fetch(
    `${baseURL}/api/surah/${reciterSlug}/${recitationSlug}/${surahSlug}`
  );

  if (!res.ok) return null;

  return await res.json();
};

export const getSurahInfo = async (slug) => {
  const res = await fetch(`${baseURL}/api/surah/${slug}`);

  if (!res.ok) {
    return null;
  }

  return await res.json();
};
