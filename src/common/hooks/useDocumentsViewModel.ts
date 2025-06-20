import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { mockDB } from "@mocks/mock-db";
import { UseQueryResult } from "@tanstack/react-query";
import {
  DocumentListType,
  IDocument,
  IUploadedDocument,
} from "@models/document";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "@routes/app/homeStack";
import { useAutoUpdateLastDocStatus } from "./useAutoUpdateStatus";

type DocumentCategoryMap =
  | typeof mockDB.documentCategories.upload
  | typeof mockDB.documentCategories.available;
type CategoryType = keyof DocumentCategoryMap;
type DocumentCategoryEntry = [CategoryType, string];

interface UseDocumentsViewModelProps<T extends IDocument | IUploadedDocument> {
  useDocumentsHook: () => UseQueryResult<T[], Error>;
  categories: DocumentCategoryMap;
  listType: DocumentListType;
}

const useDocumentsViewModel = <T extends IDocument | IUploadedDocument>({
  useDocumentsHook,
  categories,
  listType,
}: UseDocumentsViewModelProps<T>) => {
  const { data: documents, isPending, refetch } = useDocumentsHook();
  useAutoUpdateLastDocStatus(documents!, listType);
  const { navigate, goBack } = useNavigation<AppNavigationProp>();
  const documentCategories: DocumentCategoryEntry[] = Object.entries(
    categories
  ) as DocumentCategoryEntry[];
  const firstKey = documentCategories[0]?.[0] ?? "";
  const [selectedCategory, setSelectedCategory] = useState<string>(firstKey);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 450);
  const [documentSelected, setDocumentSelected] = useState<{
    uri: string;
    type: "docx" | "image" | "pdf" | "html";
  } | null>(null);

  const onCloseDocumentViewer = () => setDocumentSelected(null);

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

  const handleDocumentPress = (document: T) => {
    if (listType === DocumentListType.UploadedDocument) {
      const uploadedDoc = document as IUploadedDocument;
      setDocumentSelected({
        type:
          uploadedDoc.file?.type === "image"
            ? "image"
            : uploadedDoc.file?.type ?? "unknown",
        uri: uploadedDoc.file?.uri ?? "",
      });
    } else {
      const doc = document as IDocument;
      setDocumentSelected({
        type: doc.type ?? "unknown",
        uri: doc.url ?? "",
      });
    }
  };

  const handleBack = () => {
    if (listType === DocumentListType.UploadedDocument) return navigate("Home");
    goBack();
  };

  return {
    refetch,
    handleBack,
    handleDocumentPress,
    documentSelected,
    setDocumentSelected,
    onCloseDocumentViewer,
    isLoading: isPending,
    searchTerm,
    setSearchTerm,
    filteredDocuments,
    selectedCategory,
    setSelectedCategory,
    documentCategories,
  };
};

export default useDocumentsViewModel;
