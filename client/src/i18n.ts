import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales: Array<"en" | "ar"> = ["en", "ar"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as "en" | "ar")) notFound();

  return {
    messages: (await import(`./public/locales/${locale}.json`)).default,
  };
});
