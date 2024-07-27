import "./globals.css";
import Header from "@/components/HeaderSection/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AudioPlayer from "@/components/Reciter/AudioPlayer";
import rootMetadata from "@/constants/rootMetadata";

export const viewport = {
  themeColor: "#374151",
};

export async function generateMetadata({ params: { locale } }) {
  return rootMetadata(locale);
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html
      lang={locale}
      className={`dark ${locale == "ar" ? "font-arabic" : "font-english"}`}
    >
      <body
        dir={locale == "en" ? "ltr" : "rtl"}
        className="bg-slate-50 dark:bg-gray-900"
      >
        <main className={`relative bg-slate-50 dark:bg-gray-900`}>
          <Header currentLang={locale} />
          <div className="px-2 children">{children}</div>
          <Footer currentLang={locale} />
          <AudioPlayer currentLang={locale} />
          <ScrollToTop />
        </main>
      </body>
    </html>
  );
}
