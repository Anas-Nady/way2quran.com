import ReciterDetails from "./_ReciterDetails";

export interface EditReciterPageProps {
  params: {
    slug: string;
    locale: "ar" | "en";
  };
}

export default function EditReciterPage({
  params: { locale, slug },
}: EditReciterPageProps) {
  return <ReciterDetails locale={locale} slug={slug} />;
}
