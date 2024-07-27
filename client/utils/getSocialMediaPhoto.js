import { defaultReciterPhoto, socialMediaPhoto } from "@/constants/images";

const getSocialMediaPhoto = (reciterPhoto) => {
  if (reciterPhoto === defaultReciterPhoto) {
    return socialMediaPhoto;
  } else {
    return reciterPhoto;
  }
};

export default getSocialMediaPhoto;
