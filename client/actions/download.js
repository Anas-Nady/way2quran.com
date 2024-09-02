import { baseURL } from "@/lib/api";

export async function trackDownloadQuran() {
  const countsResponse = await fetch(`${baseURL}/api/download/counts`, {
    next: { revalidate: 0 },
  });

  if (!countsResponse.ok) {
    return [];
  }

  const { data: downloadCounts } = await countsResponse.json();

  return downloadCounts;
}
