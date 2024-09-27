import api, { CLIENT_URL } from "@/lib/Api";

const CACHE = 10 * 24 * 3600; // 10 days

interface RecitersQueryProps {
  recitationSlug?: string;
  isTopReciter?: string | boolean;
  search?: string;
  currentPage?: number;
  sortBy?: "arabicName" | "-number" | "-totalViewers";
  pageSize?: number;
}

export const listAllReciters = async ({
  recitationSlug = "",
  isTopReciter = "",
  search = "",
  currentPage = 1,
  sortBy = "arabicName",
  pageSize = 50,
}: RecitersQueryProps): Promise<Response> => {
  const res = await fetch(
    `${CLIENT_URL}/api/reciters?recitationSlug=${recitationSlug}&isTopReciter=${isTopReciter}&search=${search}&currentPage=${currentPage}&sort=${sortBy}&pageSize=${pageSize}`,
    { next: { revalidate: CACHE } }
  );

  return res;
};

export async function getReciterInfo(reciterSlug: string) {
  const res = await fetch(`${CLIENT_URL}/api/reciters/${reciterSlug}`);
  if (!res.ok) return null;

  return await res.json();
}

interface ReciterDetailsProps {
  reciterSlug: string;
  increaseViews: boolean;
}
export async function getReciterDetails({
  reciterSlug,
  increaseViews,
}: ReciterDetailsProps): Promise<Response> {
  const res = await fetch(
    `${CLIENT_URL}/api/reciters/reciter-profile/${reciterSlug}?increaseViews=${increaseViews}`,
    { next: { revalidate: CACHE } }
  );

  return res;
}

export const createReciter = async (formData: FormData) => {
  const config = {
    headers: {
      "Content-Type": "application/form-data",
    },
  };

  const { data } = await api.post(`/api/reciters`, formData, config);

  return data;
};

export const deleteReciter = async (slug: string) => {
  const { data } = await api.delete(`/api/reciters/${slug}`, {});

  return data;
};

export const updateReciter = async (slug: string, formData: FormData) => {
  const config = {
    headers: {
      "Content-Type": "application/form-data",
    },
  };
  const { data } = await api.put(`/api/reciters/${slug}`, formData, config);

  return data;
};

export const deleteRecitation = async (
  reciterSlug: string,
  recitationSlug: string
) => {
  const { data } = await api.delete(
    `/api/reciters/delete-recitation/${reciterSlug}/${recitationSlug}`
  );
  return data;
};

export const deleteSurah = async (
  reciterSlug: string,
  recitationSlug: string,
  surahSlug: string
) => {
  const { data } = await api.delete(
    `/api/reciters/delete-surah/${reciterSlug}/${recitationSlug}/${surahSlug}`
  );
  return data;
};
