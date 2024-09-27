import { CLIENT_URL } from "./../lib/Api";

export async function getRecitation(slug: string): Promise<Response> {
  const res = await fetch(`${CLIENT_URL}/api/recitations/${slug}`);

  return res;
}
