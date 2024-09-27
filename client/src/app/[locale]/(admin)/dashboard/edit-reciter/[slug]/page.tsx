import { PageParams } from "@/types/types";
import ReciterDetails from "./_ReciterDetails";

export type EditReciterPageProps = PageParams & {
  params: {
    slug: string;
  };
};

export default function EditReciterPage({
  params: { locale, slug },
}: EditReciterPageProps) {
  return <ReciterDetails locale={locale} slug={slug} />;
}
