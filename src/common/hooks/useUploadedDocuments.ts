import documents from "@services/documents";
import { useQuery } from "@tanstack/react-query";
import { StorageKeys } from "@utils/storageKeys";

export const useUploadedDocuments = () => {
  return useQuery({
    queryKey: [StorageKeys.UPLOADED_DOCUMENTS],
    queryFn: documents.getUploadedDocuments,
  });
};
