import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SearchInput from "@/components/ui/SearchInput";
import SelectOptions from "@/components/ui/SelectOptions";
import Checkbox from "../../../../../components/ui/Checkbox";
import RECITATIONS_LIST from "@/constants/Recitations";

type FormProps = LocaleProps & {
  selectedRecitation: string;
  setSelectedRecitation: (value: string) => void;
  isTopReciter: boolean;
  setIsTopReciter: (value: boolean) => void;
  sortByMostViewers: boolean;
  setSortByMostViewers: (value: boolean) => void;
  resetFilters: () => void;
};

const Form: React.FC<FormProps> = ({
  locale,
  selectedRecitation,
  setSelectedRecitation,
  isTopReciter,
  setIsTopReciter,
  sortByMostViewers,
  setSortByMostViewers,
  resetFilters,
}) => {
  const t = useTranslations("AllRecitersPage");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col flex-wrap items-start justify-between gap-3"
    >
      <div className="w-[200px] md:w-[300px]">
        <SearchInput />
      </div>
      <SelectOptions
        options={RECITATIONS_LIST}
        locale={locale}
        placeholder={t("chooseTypeOfRecitation")}
        value={selectedRecitation}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value;
          setSelectedRecitation(value);
        }}
      />
      <div className="flex gap-5">
        <Checkbox
          labelText={t("topReciters")}
          checked={isTopReciter}
          onChange={(checked) => setIsTopReciter(checked)}
        />
        <Checkbox
          labelText={t("mostViewers")}
          checked={sortByMostViewers}
          onChange={(checked) => setSortByMostViewers(checked)}
        />
      </div>
      <Link
        href={`/${locale}/dashboard/all-reciters`}
        onClick={resetFilters}
        className={`text-lg hover:underline text-sky-500`}
      >
        {t("resetFilters")}
      </Link>
    </form>
  );
};

export default Form;
