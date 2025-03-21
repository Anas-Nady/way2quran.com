import RecitersList from "./_RecitersList";

interface AllRecitersPageProps extends PageParams {
  searchParams: SearchParams;
}

export default function AllRecitersPage({
  params: { locale },
  searchParams,
}: AllRecitersPageProps) {
  return (
    <div className="relative content">
      <RecitersList searchParams={searchParams} locale={locale} />
    </div>
  );
}
