import React from "react";
import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/common/Footer";
import SearchProvider from "@/components/Header/Search/SearchContext";
import SearchPopup from "@/components/Header/Search/SearchPopup";
import AudioPlayer from "@/components/Reciter/AudioPlayer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import VisitorSiteTracking from "@/components/VisitorSiteTracking";
import { arabicFont, englishFont } from "@/assets/fonts";
import GoogleAnalyticsScript from "@/scripts/GoogleAnalytics";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import rootMetadata from "./_rootMetadata";
import PlayerProvider from "@/contexts/PlayerContext";

export const viewport = {
  themeColor: "#374151",
};

export async function generateMetadata({ params: { locale } }: PageParams) {
  return rootMetadata(locale);
}

interface LayoutProps extends PageParams {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({
  children,
  params: { locale },
}) => {
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
            <PlayerProvider locale={locale}>
              <main className={`relative bg-slate-50 dark:bg-gray-900`}>
                <SearchProvider>
                  <Header locale={locale} />
                  <div className="px-2 children">{children}</div>
                  <Footer locale={locale} />
                  <SearchPopup locale={locale} />
                </SearchProvider>
                <AudioPlayer />
                <ScrollToTop />
              </main>
            </PlayerProvider>
            <GoogleAnalyticsScript />
          </VisitorSiteTracking>
        </body>
      </NextIntlClientProvider>
    </html>
  );
};

export default Layout;
