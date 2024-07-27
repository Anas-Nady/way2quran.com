import { baseURL } from "@/lib/api";

export async function getRecitations() {
  const res = await fetch(`${baseURL}/api/recitations`);

  return res;
}

export async function getRecitation(slug) {
  const res = await fetch(`${baseURL}/api/recitations/${slug}`);

  return res;
}
