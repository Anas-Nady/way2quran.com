import { PageParams } from "@/types/types";
import UploadRecitationForm from "./_UploadRecitationForm";

export default function UploadRecitation({ params: { locale } }: PageParams) {
  return (
    <div className="relative flex flex-wrap justify-between max-w-screen-xl gap-2 mx-auto">
      <UploadRecitationForm locale={locale} />
    </div>
  );
}
