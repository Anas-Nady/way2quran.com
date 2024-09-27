"use client";
import React, { useState } from "react";
import NavbarIcons from "./NavbarIcons";
import NavbarLinks from "./NavbarLinks";
import { LocaleProps } from "@/types/types";

const Navbar: React.FC<LocaleProps> = ({ locale }) => {
  const [isMenuVisible, changeMenuVisibility] = useState(false);

  const toggleMenuVisibility = () => {
    changeMenuVisibility(!isMenuVisible);
  };

  return (
    <>
      <NavbarIcons
        isMenuVisible={isMenuVisible}
        toggleMenu={toggleMenuVisibility}
        locale={locale}
      />
      <NavbarLinks
        locale={locale}
        isMenuVisible={isMenuVisible}
        toggleMenu={toggleMenuVisibility}
      />
    </>
  );
};

export default Navbar;
