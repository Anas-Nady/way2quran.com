"use client";
import { deleteReciter, listAllReciters } from "@/actions/reciters";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ToastMessage from "@/components/ui/ToastMessage";
import Pagination from "@/components/common/Pagination";
import Form from "./_Form";
import Table from "./_Table";
import { LocaleProps, ReciterProfile, SearchParams } from "@/types/types";
import getErrorMessage from "@/helpers/getErrorMessage";

type RecitersListProps = LocaleProps & {
  searchParams: SearchParams;
};

type State = {
  error: string;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  reciters: ReciterProfile[];
  recitationSlug: string;
  isTopReciter: boolean;
  sortByMostViewers: boolean;
};

const RecitersList: React.FC<RecitersListProps> = ({
  locale,
  searchParams,
}) => {
  const t = useTranslations("AllRecitersPage");

  const [state, setState] = useState<State>({
    error: "",
    loading: false,
    currentPage: 1,
    totalPages: 1,
    reciters: [],
    recitationSlug: "",
    isTopReciter: false,
    sortByMostViewers: false,
  });

  const [selectedRecitation, setSelectedRecitation] = useState("");

  const resetFilters = () => {
    setState((prev) => ({
      ...prev,
      currentPage: 1,
      recitationSlug: "",
      isTopReciter: false,
      sortByMostViewers: false,
    }));
    setSelectedRecitation("");
  };

  // Fetch reciters data in the Table component
  const fetchReciters = useCallback(async () => {
    const search = searchParams?.search || "";
    const currentPage = searchParams?.currentPage || 1;
    const sortBy = state.sortByMostViewers ? "-totalViewers" : "-number";

    try {
      const res = await listAllReciters({
        recitationSlug: state.recitationSlug,
        isTopReciter: state.isTopReciter ? "true" : "",
        search,
        currentPage,
        sortBy,
      });

      const data = await res.json();

      if (!res.ok) {
        setState((prev) => ({ ...prev, error: data.message }));
      } else {
        setState((prev) => ({
          ...prev,
          reciters: data.reciters,
          currentPage: data.pagination.page,
          totalPages: data.pagination.pages,
        }));
      }
    } catch (err: unknown) {
      setState((prev) => ({ ...prev, error: getErrorMessage(err) }));
    }
  }, [
    searchParams,
    state.sortByMostViewers,
    state.recitationSlug,
    state.isTopReciter,
  ]);

  useEffect(() => {
    fetchReciters();
  }, [fetchReciters]);

  const handleDeleteReciter = async (slug: string) => {
    const result = confirm(t("confirmDelete"));

    if (result) {
      setState((prev) => ({ ...prev, error: "", loading: true }));

      try {
        await deleteReciter(slug);

        setState((prev) => ({
          ...prev,
          reciters: prev.reciters.filter(
            (rec: ReciterProfile) => rec.slug !== slug
          ),
        }));
      } catch (err: unknown) {
        setState((prev) => ({ ...prev, error: getErrorMessage(err) }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    } else return;
  };

  return (
    <>
      <Form
        locale={locale}
        selectedRecitation={selectedRecitation}
        setSelectedRecitation={(value) => {
          setSelectedRecitation(value);
          setState((prev) => ({ ...prev, recitationSlug: value }));
        }}
        isTopReciter={state.isTopReciter}
        setIsTopReciter={(checked) =>
          setState((prev) => ({ ...prev, isTopReciter: checked }))
        }
        sortByMostViewers={state.sortByMostViewers}
        setSortByMostViewers={(checked) =>
          setState((prev) => ({ ...prev, sortByMostViewers: checked }))
        }
        resetFilters={resetFilters}
      />
      <section>
        <div className="relative min-h-screen shadow-md reciter sm:rounded-lg">
          {state.error && <ToastMessage error={true} message={state.error} />}
          <Table
            reciters={state.reciters}
            locale={locale}
            loading={state.loading}
            handleDeleteReciter={handleDeleteReciter}
          />
        </div>
      </section>
      <Pagination
        currentPage={state.currentPage}
        totalPages={state.totalPages}
      />
    </>
  );
};

export default RecitersList;
