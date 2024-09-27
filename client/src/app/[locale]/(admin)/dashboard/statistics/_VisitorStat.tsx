"use client";

export default function VisitorStat({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  return (
    <div className="py-2 my-5 text-lg font-semibold border-b border-gray-300 dark:border-gray-600 lg:text-2xl xl:text-3xl">
      <span>{label}:</span>{" "}
      <span className="px-2 text-xl font-bold text-gray-900 bg-gray-300 rounded font-english dark:text-white dark:bg-gray-700 w-fit">
        {count.toLocaleString()}
      </span>
    </div>
  );
}
