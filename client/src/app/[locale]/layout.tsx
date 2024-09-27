import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/common/Footer";
import SearchProvider from "@/components/Header/Search/SearchContext";
import SearchPopup from "@/components/Header/Search/SearchPopup";
import AudioPlayer from "@/components/Reciter/AudioPlayer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import VisitorSiteTracking from "@/components/VisitorSiteTracking";
import { arabicFont, englishFont } from "@/fonts";
import GoogleAnalyticsScript from "@/scripts/GoogleAnalytics";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import rootMetadata from "./_rootMetadata";
import { PageParams } from "@/types/types";

export const viewport = {
  themeColor: "#374151",
};

export async function generateMetadata({ params: { locale } }: PageParams) {
  return rootMetadata(locale);
}

type LayoutProps = PageParams & {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = async ({
  children,
  params: { locale },
}) => {
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
                <Header locale={locale} />
                <div className="px-2 children">{children}</div>
                <Footer locale={locale} />
                <SearchPopup locale={locale} />
              </SearchProvider>
              <AudioPlayer locale={locale} />
              <ScrollToTop />
            </main>
            <GoogleAnalyticsScript />
          </VisitorSiteTracking>
        </body>
      </NextIntlClientProvider>
    </html>
  );
};

export default Layout;
