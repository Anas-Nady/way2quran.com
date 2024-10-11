import React from "react";

interface PageHeadingProps {
  text: string;
  color?: string;
  className?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({
  text,
  color = "green",
  className = "",
}) => {
  return (
    <h1
      className={`my-5 relative whitespace-nowrap text-gray-700 text-4xl rtl:lg:text-5xl ltr:xl:text-6xl rtl:2xl:text-[65px] ltr:2xl:text-6xl
      text-center mx-auto font-bold pb-2 dark:text-slate-50 w-fit cursor-default ${className}`}
    >
      <span className={`text-${color}-500 dark:text-${color}-500`}>{text}</span>
      <span className="w-32 h-1 bg-gray-300 dark:bg-gray-600 absolute left-[50%] -bottom-1 -translate-x-1/2 rounded"></span>
    </h1>
  );
};

export default PageHeading;
