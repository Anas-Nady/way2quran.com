"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PaginationBtn({
  conditionClick,
  conditionDisabled,
  text,
  totalPages,
}) {
  const pathName = usePathname();
  const router = useRouter();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("currentPage", page);

      router.push(`${pathName}?${searchParams.toString()}`);
    }
  };

  return (
    <button
      className={`${
        conditionDisabled && "cursor-not-allowed"
      } mx-1 px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700`}
      onClick={() => handlePageChange(conditionClick)}
      disabled={conditionDisabled}
    >
      {text}
    </button>
  );
}
