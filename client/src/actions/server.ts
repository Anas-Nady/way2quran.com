export const restartServer = async () => {
  try {
    const res = await fetch("/api/restart-server", {
      method: "POST",
    });

    if (!res.ok) {
      return null;
    }
    return true;
  } catch (error) {
    console.error("Error restarting server", error);
    return false;
  }
};
