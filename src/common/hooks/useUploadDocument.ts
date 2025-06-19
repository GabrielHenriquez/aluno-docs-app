import documents from "@services/documents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StorageKeys } from "@utils/storageKeys";
import { IUploadedDocument, IUploadPayload } from "@models/document";

type UploadDocumentOptions = {
  onSuccess?: (
    data: IUploadedDocument,
    variables: IUploadPayload,
    context: unknown
  ) => void;
};

export const useUploadDocument = (options?: UploadDocumentOptions) => {
  const queryClient = useQueryClient();

  return useMutation<IUploadedDocument, unknown, IUploadPayload>({
    mutationFn: documents.uploadDocument,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [StorageKeys.UPLOADED_DOCUMENTS],
      });

      options?.onSuccess?.(data, variables, context);
    },
    
  });
};
