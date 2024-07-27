import HomePage from "@/components/HomePage";
import TopReciters from "@/components/ListeningNowSection/TopReciters";

export default function App({ params: { locale } }) {
  return (
    <>
      <HomePage />
      <TopReciters locale={locale} />
    </>
  );
}
