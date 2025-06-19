import { mockDB } from "@mocks/mock-db";

export enum DocumentStatus {
  "ENVIADO" = "enviado",
  "EM_ANALISE" = "em_analise",
  "APROVADO" = "aprovado",
  "REJEITADO" = "rejeitado",
}

export type FileTypes = "html" | "pdf" | "image" | "docx";
export interface IDocument {
  id: string;
  title: string;
  type: FileTypes;
  category: "historico" | "boletim" | "declaracao" | "comunicado";
  url: string;
  date: string;
  size: string;
  description: string;
  pages?: number;
}

export enum DocumentListType {
  Document = "document",
  UploadedDocument = "uploadedDocument",
}

export type StatusType = "enviado" | "em_analise" | "aprovado" | "rejeitado";

export type CategoryUploadType = keyof typeof mockDB.documentCategories.upload;

export interface IUploadedDocument {
  id: string;
  title: string;
  category: CategoryUploadType;
  status: StatusType;
  uploadDate: string;
  file: {
    type: FileTypes;
    uri: string;
    name: string;
  };
}

export interface IUploadPayload {
  id: string;
  title: string;
  category: CategoryUploadType;
  file: {
    name: string;
    type: FileTypes | string;
    size: number;
    uri: string;
  };
}
