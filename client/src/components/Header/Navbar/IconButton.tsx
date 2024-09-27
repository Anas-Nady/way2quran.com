"use client";

import React from "react";

interface IconButtonProps {
  type?: "button";
  ariaLabel: string;
  onClick?: () => void | React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
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
      className={`px-4 py-2 text-sm font-medium text-center text-black rounded-lg bg-slate-200 hover:bg-slate-300 border border-gray-300 dark:border-gray-500 focus:ring-4 focus:outline-none dark:focus:outline-none lg:px-4 dark:text-white dark:bg-slate-600 dark:hover:bg-slate-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
