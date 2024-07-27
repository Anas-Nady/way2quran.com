import UploadRecitationForm from "./_UploadRecitationForm";
import { useTranslations } from "next-intl";

export default function UploadRecitation({ params: { locale } }) {
  const t = useTranslations("UploadRecitationPage");

  const translations = {
    chooseRecitationTxt: t("chooseRecitation"),
    chooseReciterTxt: t("chooseReciter"),
    uploadNowTxt: t("uploadNow"),
    successUploadedAudioFilesTxt: t("successUploadedAudioFiles"),
  };

  return (
    <div className="relative flex flex-wrap justify-between max-w-screen-xl gap-2 mx-auto">
      <UploadRecitationForm currentLang={locale} {...translations} />
    </div>
  );
}
