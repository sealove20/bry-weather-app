import React, { createContext, useContext, useState } from "react";

interface ForecastContextProps {
  searchedCity: string;
  setSearchedCity: (city: string) => void;
}

const ForecastContext = createContext<ForecastContextProps | undefined>(undefined);

export const ForecastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchedCity, setSearchedCity] = useState<string>("");

  return (
    <ForecastContext.Provider value={{ searchedCity, setSearchedCity }}>
      {children}
    </ForecastContext.Provider>
  );
};

export const useForecastContext = (): ForecastContextProps => {
  const context = useContext(ForecastContext);
  if (!context) {
    throw new Error("useForecastContext must be used within a ForecastProvider");
  }
  return context;
};
