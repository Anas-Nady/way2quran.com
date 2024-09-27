import { CLIENT_URL } from "@/lib/Api";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/ar", "/en"],
        disallow: [
          "/ar/login",
          "/en/login",
          "/ar/dashboard/",
          "/en/dashboard/",
        ],
      },
    ],
    sitemap: `${CLIENT_URL}/sitemap.xml`,
  };
}
