import UploadZipFileForm from "./_UploadZipFileForm";

export default function UploadRecitation({ params: { locale } }: PageParams) {
  return (
    <div className="relative flex flex-wrap justify-between max-w-screen-xl gap-2 mx-auto">
      <UploadZipFileForm locale={locale} />
    </div>
  );
}
