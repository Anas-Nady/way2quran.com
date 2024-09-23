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
import VisitorSiteTracking from "@/components/VisitorSiteTracking";

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
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body
          dir={locale == "en" ? "ltr" : "rtl"}
          className="bg-slate-50 dark:bg-gray-900"
        >
          <VisitorSiteTracking>
            <main className={`relative bg-slate-50 dark:bg-gray-900`}>
              <SearchProvider>
                <Header currentLang={locale} />
                <div className="px-2 children">{children}</div>
                <Footer currentLang={locale} />
                <SearchPopup currentLang={locale} />
              </SearchProvider>
              <AudioPlayer currentLang={locale} />
              <ScrollToTop />
            </main>
            <GoogleAnalyticsScript />
          </VisitorSiteTracking>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
