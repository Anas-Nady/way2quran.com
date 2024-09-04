import "./globals.css";
import Header from "@/components/HeaderSection/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AudioPlayer from "@/components/Reciter/AudioPlayer";
import rootMetadata from "@/constants/rootMetadata";
import { arabicFont, englishFont } from "@/fonts/font";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import SearchPopup from "@/components/Search/SearchPopup";
import { SearchProvider } from "@/components/Search/SearchContext";
import GoogleAnalyticsScript from "@/utils/GoogleAnalyticsScript";

export const viewport = {
  themeColor: "#374151",
};

export async function generateMetadata({ params: { locale } }) {
  return rootMetadata(locale);
}

export default async function RootLayout({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`dark  ${
        locale === "ar" ? arabicFont.className : englishFont.className
      }`}
    >
      <body
        dir={locale == "en" ? "ltr" : "rtl"}
        className="bg-slate-50 dark:bg-gray-900"
      >
        <main className={`relative bg-slate-50 dark:bg-gray-900`}>
          <SearchProvider>
            <Header currentLang={locale} />
            <NextIntlClientProvider locale={locale} messages={messages}>
              <div className="px-2 children">{children}</div>
              <SearchPopup currentLang={locale} />
            </NextIntlClientProvider>
            <Footer currentLang={locale} />
          </SearchProvider>
          <AudioPlayer currentLang={locale} />
          <ScrollToTop />
          <GoogleAnalyticsScript />
        </main>
      </body>
    </html>
  );
}
