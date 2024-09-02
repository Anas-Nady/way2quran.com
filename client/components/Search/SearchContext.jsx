"use client";
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);

  const toggleSearchPopup = () => {
    setIsSearchPopupOpen((prev) => !prev);
  };

  return (
    <SearchContext.Provider value={{ isSearchPopupOpen, toggleSearchPopup }}>
      {children}
    </SearchContext.Provider>
  );
}
