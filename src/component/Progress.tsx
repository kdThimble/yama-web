import React from "react";

interface ProgressProps {
  value: number;
  className?: string;
  color?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  className = "",
  color = "bg-blue-500",
}) => {
  // Ensure value is between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${clampedValue}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

export default Progress;
