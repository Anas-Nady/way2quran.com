const { defaultReciterPhoto } = require("@/constants/images");

const getObjectFitClass = function (photo) {
  return photo === defaultReciterPhoto
    ? "object-fill  border border-gray-200 dark:border-gray-700"
    : "object-cover";
};

export default getObjectFitClass;
