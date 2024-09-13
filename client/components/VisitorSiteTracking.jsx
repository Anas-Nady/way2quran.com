"use client";
import { useEffect } from "react";

export default function VisitorSiteTracking({ children }) {
  useEffect(() => {
    const handleVisitorTracking = async () => {
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipResponse.json(); // Extract IP address

        await fetch(`/api/visitors/track?userIP=${ip}`, {
          method: "POST",
        });
        return;
      } catch (error) {
        console.error("Error get ip", error);
      }
    };

    handleVisitorTracking();
  }, []);

  return children;
}
