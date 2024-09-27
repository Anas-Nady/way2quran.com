import { defaultReciterPhoto } from "@/constants/Images";

const getObjectFitClass = function (photo: string): string {
  return photo === defaultReciterPhoto
    ? "object-fill  border border-gray-200 dark:border-gray-700"
    : "object-cover";
};

export default getObjectFitClass;
