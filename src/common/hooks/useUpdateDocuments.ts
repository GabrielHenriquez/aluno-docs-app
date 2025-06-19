import documents from "@services/documents";
import { StatusType } from "@models/document";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StorageKeys } from "@utils/storageKeys";

interface UpdateDocumentStatusParams {
  documentId: string;
  status: StatusType;
}

export const useUpdateDocumentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, unknown, UpdateDocumentStatusParams>({
    mutationFn: ({ documentId, status }) =>
      documents.updateDocumentStatus(documentId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [StorageKeys.UPLOADED_DOCUMENTS],
      });
    },
  });
};
