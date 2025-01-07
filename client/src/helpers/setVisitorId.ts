import { v4 as uuidv4 } from "uuid";

export const setVisitorId = () => {
  if (!localStorage.getItem("visitorId")) {
    const visitorId = uuidv4();
    localStorage.setItem("visitorId", visitorId);
    return visitorId;
  }
  return localStorage.getItem("visitorId");
};
