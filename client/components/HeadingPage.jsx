import { useTranslations } from "next-intl";

const HeadingPage = ({
  namePage,
  name = "",
  isCentering = true,
  color = "green",
  isHeadingSections = false,
  className = "",
}) => {
  const t = useTranslations();
  return (
    <h1
      className={`my-5 relative whitespace-nowrap text-gray-700 ${
        isHeadingSections
          ? "text-2xl sm:text-3xl 2xl:text-4xl"
          : "text-3xl sm:text-3xl rtl:lg:text-5xl ltr:xl:text-5xl 2xl:text-5xl"
      } text-center ${
        isCentering && "mx-auto"
      } font-bold pb-2 dark:text-slate-50 w-fit cursor-default ${className}`}
    >
      <span className={`text-${color}-500 dark:text-${color}-500`}>
        {namePage && t(namePage)}
        {name}
      </span>
      <span className="w-32 h-1 bg-gray-300 dark:bg-gray-600 absolute left-[50%] -bottom-1 -translate-x-1/2 rounded"></span>
    </h1>
  );
};

export default HeadingPage;
