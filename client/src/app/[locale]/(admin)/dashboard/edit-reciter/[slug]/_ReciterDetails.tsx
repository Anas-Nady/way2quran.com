"use client";

import React, { useEffect, useState } from "react";
import Form from "./_Form";
import Accordion from "./_Accordion";
import EmptyState from "@/components/ui/EmptyState";
import { getReciterDetails } from "@/actions/reciters";
import ErrorAlert from "@/components/common/ErrorAlert";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import getErrorMessage from "@/helpers/getErrorMessage";

type ReciterDetailsProps = LocaleProps & {
  slug: string;
};

const ReciterDetails: React.FC<ReciterDetailsProps> = ({ locale, slug }) => {
  const [reciter, setReciter] = useState<ReciterProfile | null>(null);
  const [recitations, setRecitations] = useState<ReciterRecitation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReciterDetails({
          reciterSlug: slug,
          increaseViews: false,
        });
        const data = await res.json();

        if (!res.ok && res.status !== 200) {
          setError(data.message);
        } else {
          setReciter(data.reciter);
          setRecitations(data.reciter?.recitations);
        }
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      }
    };

    fetchData();
  }, [slug]);

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!reciter) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative flex flex-wrap items-start justify-between gap-4 px-4">
      <Form locale={locale} reciter={reciter} />
      <Accordion recitations={recitations} reciterSlug={slug} locale={locale} />
      {recitations.length === 0 && <EmptyState />}
    </div>
  );
};

export default ReciterDetails;
