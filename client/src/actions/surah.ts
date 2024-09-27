import { CLIENT_URL } from "@/lib/Api";

interface GetSurahInfoProps {
  slug: string;
  select?: string;
}

export const getSurahInfo = async ({
  slug,
  select = "",
}: GetSurahInfoProps) => {
  const res = await fetch(
    `${CLIENT_URL}/api/surah/${slug}?selectField=${select}`
  );

  if (!res.ok) {
    return null;
  }

  return await res.json();
};
