import { useEffect } from "react";
import { IDocument, IUploadedDocument, StatusType } from "@models/document";
import { DocumentListType } from "@models/document";
import { useDocumentFlowStore } from "@stores/documents/documentsStatus";
import { useUpdateDocumentStatus } from "./useUpdateDocuments";

export const useAutoUpdateLastDocStatus = <
  T extends IDocument | IUploadedDocument
>(
  documents: T[],
  listType: string
) => {
  const { mutate } = useUpdateDocumentStatus();
  const { updatedDocs, markAsUpdated } = useDocumentFlowStore();

  useEffect(() => {
    if (!documents || listType !== DocumentListType.UploadedDocument) return;

    const lastDoc = documents[documents.length - 1];
    if (!lastDoc) return;

    if (updatedDocs.has(lastDoc.id)) return;

    const timer = setTimeout(() => {
      const statuses: StatusType[] = ["aprovado", "rejeitado", "em_analise"];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      mutate({ documentId: lastDoc.id, status: randomStatus });
      markAsUpdated(lastDoc.id);
    }, 5 * 1000);

    return () => clearTimeout(timer);
  }, [documents, listType, mutate, updatedDocs, markAsUpdated]);
};
