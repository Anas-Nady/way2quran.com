import { spinnerIcon } from "@/components/Icons";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center text-center bg-inherit w-full h-full my-2">
      <div role="status">
        {spinnerIcon}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
