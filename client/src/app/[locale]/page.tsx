import WelcomeSection from "@/components/ui/WelcomeSection";
import TopReciters from "@/components/ListeningNow/TopReciters";
import { PageParams } from "@/types/types";
import React from "react";

const App: React.FC<PageParams> = ({ params: { locale } }) => {
  return (
    <>
      <WelcomeSection />
      <TopReciters locale={locale} />
    </>
  );
};

export default App;
