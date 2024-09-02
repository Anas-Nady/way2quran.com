const TextAreaInput = ({ id, value, onChange, label, rows = 4 }) => {
  return (
    <div className="max-w-full mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-lg font-medium text-center text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        onChange={onChange}
        className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
