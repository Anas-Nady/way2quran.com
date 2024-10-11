import React from "react";
import WelcomeSection from "@/components/ui/WelcomeSection";
import TopReciters from "@/components/ListeningNow/TopReciters";

const App: React.FC<PageParams> = ({ params: { locale } }) => {
  return (
    <>
      <WelcomeSection />
      <TopReciters locale={locale} />
    </>
  );
};

export default App;
