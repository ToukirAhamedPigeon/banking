"use client";
import { useEffect } from "react";

interface ErrorMessageProps {
  message: string;
  setError: (msg: string) => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, setError }) => {
  useEffect(() => {
    const timer = setTimeout(() => setError(""), 4000); // Auto-hide after 4s
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [message, setError]);

  return (
    <div className="relative bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between w-[320px]">
      <span>{message}</span>
      <button onClick={() => setError("")} className="ml-3 text-lg text-white font-bold">
        &times;
      </button>
    </div>
  );
};

export default ErrorMessage;
