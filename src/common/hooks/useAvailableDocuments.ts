import { useQuery } from "@tanstack/react-query";
import { StorageKeys } from "@utils/storageKeys";
import documents from "@services/documents";

export const useAvailableDocuments = () => {
  return useQuery({
    queryKey: [StorageKeys.AVAILABLE_DOCUMENTS],
    queryFn: documents.getAvailableDocuments,
  });
};
