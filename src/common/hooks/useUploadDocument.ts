import documents from "@services/documents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StorageKeys } from "@utils/storageKeys";

export const useUploadDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documents.uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [StorageKeys.UPLOADED_DOCUMENTS],
      });
    },
  });
};
