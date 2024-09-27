export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className={`bg-green-500 dark:bg-green-600 text-xs font-medium text-green-100 text-center p-1 leading-none rounded-full`}
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
}
