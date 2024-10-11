"use client";

import getName from "@/helpers/getNameForCurrentLang";
import { useRouter } from "next/navigation";

interface Result {
  slug: string;
  arabicName: string;
  englishName: string;
}

type SearchResultsProps = LocaleProps & {
  toggleSearchPopup: () => void;
  results: {
    reciters: Result[];
    recitations: Result[];
    surahs: Result[];
  };
};

const SearchResults: React.FC<SearchResultsProps> = ({
  locale,
  toggleSearchPopup,
  results,
}) => {
  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(url);
    toggleSearchPopup();
  };

  const renderResults = (items: Result[], type: string) =>
    items.map((result, index) => {
      let url = `/${locale}`;

      if (type === "reciter") {
        url += `/reciters/${result.slug}`;
      } else if (type === "recitation") {
        url += `/reciters?recitationSlug=${result.slug}`;
      } else if (type === "surah") {
        url += `/surahs/${result.slug}`;
      }

      return (
        <li
          key={index}
          onClick={() => handleNavigation(url)}
          className="block px-2 py-3 font-medium text-gray-800 cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-start text-md sm:text-lg lg:text-xl"
          role="button"
          tabIndex={0}
        >
          {getName(result, locale)}
        </li>
      );
    });

  return (
    <div className="w-full max-h-full mt-2 overflow-y-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <ul className="divide-y divide-gray-300 dark:divide-gray-700">
        {results.reciters.length > 0 &&
          renderResults(results.reciters, "reciter")}
        {results.recitations.length > 0 &&
          renderResults(results.recitations, "recitation")}
        {results.surahs.length > 0 && renderResults(results.surahs, "surah")}
      </ul>
    </div>
  );
};

export default SearchResults;
