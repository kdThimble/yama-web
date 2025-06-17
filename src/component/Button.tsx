import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled,
  ...props
}) => {
  const baseStyles = "font-medium rounded-lg  transition-colors duration-200";

  const variants = {
    primary: " bg-blue-500 text-black hover:bg-blue-600 disabled:bg-blue-300",
    secondary:
      "bg-blue-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} text-black  bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
