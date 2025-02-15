"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoaderContextType {
  showLoader: (message?: string, gifUrl?: string) => void;
  hideLoader: (timeOut?:number) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");
  const [gifUrl, setGifUrl] = useState<string | null>(null);

  const showLoader = (msg?: string, gif?: string) => {
    setMessage(msg || "Loading...");
    setGifUrl(gif || null);
    setLoading(true);
  };

  const hideLoader = (timeOut=500) => {
    setTimeout(()=>{
        setLoading(false);
        setGifUrl(null);
    },timeOut)
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loading && (
        <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center"
        style={{ backgroundImage: "url('/backloader.png')" }}
      >
        <div className="flex flex-col items-center bg-white bg-opacity-70 p-4 rounded-lg">
          {gifUrl ? (
            <img src={gifUrl} alt="Loading..." className="w-32 h-32" />
          ) : (
            <div className="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
          )}
          <p className="text-gray text-2xl font-semibold mt-4">{message}</p>
        </div>
      </div>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
