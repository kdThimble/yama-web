import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode; // Optional subtitle prop
  children: React.ReactNode;
  darkMode?: boolean; // Added darkMode prop
  className?: string; // Added className prop for parent styling
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  children,
  darkMode = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mb-4 w-full ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-start w-full text-left text-lg font-medium transition group ${
          darkMode
            ? "text-gray-100 hover:text-purple-500"
            : "text-gray-800 hover:text-purple-500"
        }`}
      >
        <span className="mr-2 text-2xl text-left">{isOpen ? "-" : "+"}</span>
        <div className="flex flex-col items-start w-full">
          {title}
          {subtitle && (
            <span
              className={`text-[16px] group-hover:text-purple-500 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } `}
            >
              {subtitle}
            </span>
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p
              className={`mt-2 text-left pl-10 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {children}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
