import React from "react";

interface AlertProps {
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  className?: string;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = "info",
  className = "",
}) => {
  const variants = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <div
      role="alert"
      className={`rounded-lg p-4 border ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

const AlertDescription: React.FC<AlertDescriptionProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`text-sm font-medium mt-1 ${className}`}>{children}</div>
  );
};

export { Alert, AlertDescription };
