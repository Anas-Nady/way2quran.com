import { spinnerIcon } from "@/components/Icons";

export default function Loading() {
  return (
    <div className="flex justify-center items-center text-center bg-inherit w-full h-full my-2 min-h-screen">
      <div role="status">
        {spinnerIcon}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
