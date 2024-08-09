import api, { baseURL } from "@/lib/api";

const CACHE = 10 * 24 * 3600; // 10 days

export async function listAllReciters({
  recitationSlug = "",
  isTopReciter = "",
  search = "",
  currentPage = 1,
  sortBy = "arabicName",
  pageSize = 50,
}) {
  const res = await fetch(
    `${baseURL}/api/reciters?recitationSlug=${recitationSlug}&isTopReciter=${isTopReciter}&search=${search}&currentPage=${currentPage}&sort=${sortBy}&pageSize=${pageSize}`,
    { next: { revalidate: CACHE } }
  );

  return res;
}

export async function getRecitersWithoutCache({
  recitationSlug = "",
  isTopReciter = "",
  search = "",
  currentPage = "",
  sortBy = "",
  pageSize = 50,
}) {
  const res = await fetch(
    `${baseURL}/api/reciters?recitationSlug=${recitationSlug}&isTopReciter=${isTopReciter}&search=${search}&currentPage=${currentPage}&sort=${sortBy}&pageSize=${pageSize}`,
    { cache: "no-store" }
  );

  return res;
}

export async function getReciterInfo(reciterSlug) {
  const res = await fetch(`${baseURL}/api/reciters/${reciterSlug}`);
  if (!res.ok) return null;

  return await res.json();
}

export async function getReciterDetails(reciterSlug) {
  const res = await fetch(
    `${baseURL}/api/reciters/reciter-profile/${reciterSlug}`,
    { next: { revalidate: CACHE } }
  );

  return res;
}

export async function getReciterDetailsWithoutCache(reciterSlug) {
  const res = await fetch(
    `${baseURL}/api/reciters/reciter-profile/${reciterSlug}`,
    { cache: "no-store" }
  );

  return res;
}

export const createReciter = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/form-data",
    },
  };

  const { data } = await api.post(`/api/reciters`, formData, config);

  return data;
};

export const updateReciter = async (slug, formData) => {
  const config = {
    headers: {
      "Content-Type": "application/form-data",
    },
  };
  const { data } = await api.put(`/api/reciters/${slug}`, formData, config);

  return data;
};

export const deleteReciter = async (slug) => {
  const { data } = await api.delete(`/api/reciters/${slug}`, {});

  return data;
};

export const deleteRecitation = async (reciterSlug, recitationSlug) => {
  const { data } = await api.delete(
    `/api/reciters/delete-recitation/${reciterSlug}/${recitationSlug}`
  );
  return data;
};

export const deleteSurah = async (reciterSlug, recitationSlug, surahSlug) => {
  const { data } = await api.delete(
    `/api/reciters/delete-surah/${reciterSlug}/${recitationSlug}/${surahSlug}`
  );
  return data;
};
