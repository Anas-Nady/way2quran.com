import React, { useEffect } from "react";

const Layout = ({ children }) => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
};

export default Layout;
