const Button = ({
  type = "button",
  className = "",
  text = "",
  handleSubmit = () => {},
  disabled = false,
  icon = null,
}) => {
  return (
    <button
      type={type}
      className={`min-w-[130px] px-3 text-xl py-2 text-gray-900 dark:text-slate-50 bg-slate-100 border border-slate-400 hover:bg-white focus:outline-none dark:bg-slate-800 hover:dark:bg-slate-700 duration-200 rounded-lg ${
        disabled && "cursor-not-allowed opacity-50"
      } ${className}`}
      onClick={handleSubmit}
      disabled={disabled}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
