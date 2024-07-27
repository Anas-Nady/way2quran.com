export default function TopReciterCheckBox({
  topReciter,
  topRecitersTxt,
  handleTopReciters,
}) {
  return (
    <div className="flex items-center mb-4">
      <input
        id="default-checkbox"
        type="checkbox"
        checked={topReciter}
        onChange={handleTopReciters}
        className="w-4 h-4 text-xl bg-gray-100 border-gray-300 rounded focus:outline-none  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300"
      >
        {topRecitersTxt}
      </label>
    </div>
  );
}
