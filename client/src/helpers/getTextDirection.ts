const arabicRegex = /[\u0600-\u06FF]/;

export default function getTextDirection(text: string): string {
  return arabicRegex.test(text) ? "rtl" : "ltr";
}
