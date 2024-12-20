import localFont from "next/font/local";
import {
  Noto_Kufi_Arabic,
  Noto_Naskh_Arabic,
  Public_Sans,
} from "next/font/google";

const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  preload: true,
});

const kufiArabicFont = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  preload: true,
});

const englishFont = Public_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
});

const ayatQuranFont = localFont({
  src: "./AyatQuran.ttf",
  display: "swap",
  preload: true,
});

export { arabicFont, englishFont, ayatQuranFont, kufiArabicFont };
