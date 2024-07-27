import HeadingPage from "../HeadingPage";
import SliderReciter from "./SliderReciter";
import { Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { listAllReciters } from "@/actions/reciters";
import { HAFS_AN_ASIM } from "@/constants/recitationsName";

export default async function TopReciters({ locale }) {
  async function SliderReciters() {
    const res = await listAllReciters({
      recitationSlug: HAFS_AN_ASIM,
      isTopReciter: true,
      sortBy: "-totalViewers",
      pageSize: 9,
    });

    const data = await res.json();

    if (!res.ok) {
      return <></>;
    }

    const { reciters } = data;

    return <SliderReciter reciters={reciters} locale={locale} />;
  }

  return (
    <section className="px-5 mx-auto text-gray-900 max-w-screen-2xl">
      <HeadingPage
        namePage={"listeningNow"}
        isHeadingSections={true}
        isCentering={false}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <SliderReciters />
      </Suspense>
    </section>
  );
}
