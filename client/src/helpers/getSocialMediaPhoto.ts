import { defaultReciterPhoto, socialMediaPhoto } from "@/constants/Images";

const getSocialMediaPhoto = (reciterPhoto: string): string => {
  if (reciterPhoto === defaultReciterPhoto) {
    return socialMediaPhoto;
  } else {
    return reciterPhoto;
  }
};

export default getSocialMediaPhoto;
