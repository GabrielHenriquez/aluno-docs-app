export enum DocumentStatus {
  "ENVIADO" = "enviado",
  "EM_ANALISE" = "em_analise",
  "APROVADO" = "aprovado",
  "REJEITADO" = "rejeitado",
}
export interface IDocument {
  id: string;
  title: string;
  type: "pdf" | "docx" | "html" | "image";
  category: "historico" | "boletim" | "declaracao" | "comunicado";
  url: string;
  date: string;
  size: string;
  description: string;
  pages?: number;
}

export type StatusType = "enviado" | "em_analise" | "aprovado" | "rejeitado";

export type CategoryType = "atestado" | "justificativa" | "requerimento";

export interface IUploadedDocument {
  id: string;
  title: string;
  category: CategoryType;
  status: StatusType;
  uploadDate: string;
  file: File;
}

export interface IUploadPayload {
  title: string;
  category: "atestado" | "justificativa" | "requerimento";
  file: {
    name: string;
    type: string;
    size: number;
  };
}
