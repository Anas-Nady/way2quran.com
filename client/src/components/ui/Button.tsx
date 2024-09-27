import React from "react";

interface ButtonProps {
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className = "",
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} ${
        isLoading && "cursor-not-allowed opacity-40"
      } text-2xl min-w-32 px-3 py-2 flex items-center gap-2 justify-center text-gray-900 dark:text-slate-50 bg-slate-100 border border-slate-400 hover:bg-white focus:outline-none dark:bg-slate-800 hover:dark:bg-slate-700 duration-200 rounded-lg`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
