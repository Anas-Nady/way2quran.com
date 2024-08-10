import localFont from "next/font/local";
import { Noto_Naskh_Arabic, Public_Sans } from "next/font/google";

const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const englishFont = Public_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const ayatQuranFont = localFont({ src: "./AyatQuran.ttf" });

export { arabicFont, englishFont, ayatQuranFont };
