"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import NavbarLinks from "./NavbarLinks";
import NavbarIcons from "./NavbarIcons";

export default function Navbar({ links }) {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const pathName = usePathname();
  const currentLang = pathName.split("/")[1];

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  return (
    <>
      <NavbarIcons isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} />
      <NavbarLinks
        currentLang={currentLang}
        links={links}
        isMenuVisible={isMenuVisible}
        toggleMenu={toggleMenu}
      />
    </>
  );
}
