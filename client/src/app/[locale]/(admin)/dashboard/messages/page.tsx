import MessageList from "./_MessageList";

interface MessagesProps extends PageParams {
  searchParams: SearchParams;
}

export default function Messages({
  params: { locale },
  searchParams,
}: MessagesProps) {
  return (
    <div className="relative border-slate-100 dark:border-red-950">
      <MessageList locale={locale} searchParams={searchParams} />
    </div>
  );
}
