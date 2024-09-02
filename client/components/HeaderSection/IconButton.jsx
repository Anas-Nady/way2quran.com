"use client";
// components/Button.js

const IconButton = ({
  type = "button",
  ariaLabel,
  onClick,
  className,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium text-center text-black rounded-lg bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:outline-none dark:focus:outline-none lg:px-4 dark:text-white dark:bg-slate-600 dark:hover:bg-slate-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
