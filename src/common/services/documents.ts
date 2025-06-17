import { API } from "common/configs/api";
import * as Model from "common/models/document";

class DocumentService {
  async getAvailableDocuments(): Promise<Model.IDocument[]> {
    try {
      const { data } = await API.get("/student/documents");
      return data;
    } catch (error) {
      throw new Error("Erro ao buscar documentos disponíveis");
    }
  }

  async getUploadedDocuments(): Promise<Model.IUploadedDocument[]> {
    try {
      const { data } = await API.get("/student/documents/uploaded");
      return data;
    } catch (error) {
      throw new Error("Erro ao buscar documentos enviados");
    }
  }

  async uploadDocument(
    payload: Model.IUploadPayload
  ): Promise<{ id: string; message: string }> {
    try {
      const { data } = await API.post("/student/documents/upload", payload);
      return data;
    } catch (error) {
      throw new Error("Erro ao enviar documento");
    }
  }

  async updateDocumentStatus(
    documentId: string,
    status: Model.StatusType
  ): Promise<{ message: string }> {
    try {
      const { data } = await API.put(
        `/student/documents/${documentId}/status`,
        { status }
      );
      return data;
    } catch (error) {
      throw new Error("Erro ao atualizar status do documento");
    }
  }
}

export default new DocumentService();
