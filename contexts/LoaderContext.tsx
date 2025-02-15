"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoaderContextType {
  showLoader: (message?: string, gifUrl?: string) => void;
  hideLoader: (message?:string|null,timeOut?:number) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");
  const [gifUrl, setGifUrl] = useState<string | null>("/icons/helloPigeon.gif");

  const showLoader = (msg?: string, gif?: string) => {
    setMessage(msg || "Loading...");
    setGifUrl(gif || "/icons/helloPigeon.gif");
    setLoading(true);
  };

  const hideLoader = (message: string | null = null, timeOut: number = 500) => {
    if(message!==null && message.length>0) setMessage(message);
    setTimeout(()=>{
        setLoading(false);
        setGifUrl(null);
    },timeOut)
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loading && (
        <>
          <div
            className="fixed inset-0 flex flex-col items-center justify-center bg-opacity-80 z-50"
            style={{ backgroundColor: "rgba(0, 25, 81, 0.85)" }}
          >
            <div className="flex flex-col items-center bg-white bg-opacity-80 p-6 rounded-lg w-[120px] h-[120px]">
              {gifUrl ? (
                <img src={gifUrl} alt="Loading..." className="w-20 h-20" />
              ) : (
                <div className="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
            
            {/* Message with 20px (mt-5) spacing below the div */}
            <p className="text-white text-xl font-semibold mt-5">{message}</p>
          </div>
    </>
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
