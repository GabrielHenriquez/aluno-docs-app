import { useAvailableDocuments } from "@hooks/useAvailableDocuments";
import { mockDB } from "common/mocks/mock-db";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

type AvailableCategoryMap = typeof mockDB.documentCategories.available;
type CategoryType = keyof AvailableCategoryMap;
type DocumentCategoryEntry = [CategoryType, string];

const useMyDocumentsViewModel = () => {
  const { data: documents } = useAvailableDocuments();
  const availableCategories: DocumentCategoryEntry[] = Object.entries(
    mockDB.documentCategories.available
  ) as DocumentCategoryEntry[];
  const firstKey = availableCategories[0]?.[0] ?? "";
  const [selectedCategory, setSelectedCategory] = useState<string>(firstKey);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 450);

  const filteredDocuments = useMemo(() => {
    if (!documents) return [];

    return documents.filter((doc) => {
      const matchCategory =
        selectedCategory === "all" || doc.category === selectedCategory;

      const matchSearch = doc.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, debouncedSearchTerm, documents]);

  return {
    searchTerm,
    setSearchTerm,
    filteredDocuments,
    selectedCategory,
    setSelectedCategory,
    availableCategories,
  };
};

export default useMyDocumentsViewModel;
