import { baseURL } from "@/lib/api";

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
          "/_next/*",
        ],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
