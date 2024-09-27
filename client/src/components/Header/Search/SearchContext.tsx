"use client";
import React, { createContext, useContext, useState } from "react";

interface SearchContextProps {
  isSearchPopupOpen: boolean;
  toggleSearchPopup: () => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

interface SearchProviderProps {
  children: React.ReactNode;
}

const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState<boolean>(false);

  const toggleSearchPopup = () => {
    setIsSearchPopupOpen((prev) => !prev);
  };

  return (
    <SearchContext.Provider value={{ isSearchPopupOpen, toggleSearchPopup }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
