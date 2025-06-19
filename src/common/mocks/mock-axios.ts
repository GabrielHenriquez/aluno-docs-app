import MockAdapter from "axios-mock-adapter";
import { API } from "common/configs/api";
import { mockDB } from "./mock-db";
import { IUploadedDocument, IUploadPayload } from "@models/document";
const mock = new MockAdapter(API);

const uploadedDocuments = mockDB.uploadedDocuments as IUploadedDocument[];

mock.onPost("/auth/login").reply((config) => {
  const { registration, password } = JSON.parse(config.data);
  const isValidUser = registration === "263425" && password === "gabriel123";
  if (isValidUser) {
    return [200, mockDB.user];
  }
  return [401, { message: "Credenciais inválidas" }];
});

mock.onGet("/student/documents").reply(200, mockDB.availableDocuments);

mock.onGet("/student/documents/uploaded").reply(200, mockDB.uploadedDocuments);

mock.onPost("/student/documents/upload").reply((config) => {
  const { id, title, category, file } = JSON.parse(config.data);

  const validCategories = [
    "atestado",
    "justificativa",
    "requerimento",
    "outros",
  ];

  if (
    typeof id === "string" &&
    typeof title === "string" &&
    validCategories.includes(category) &&
    file &&
    typeof file.name === "string" &&
    typeof file.type === "string" &&
    typeof file.size === "number" &&
    typeof file.uri === "string"
  ) {
    const newDoc: any = {
      id,
      title,
      category,
      status: "enviado",
      uploadDate: new Date().toISOString(),
      file,
    };

    uploadedDocuments.push(newDoc);

    return [201, { message: "Documento enviado com sucesso", id: "up_new" }];
  }

  return [400, { message: "Dados inválidos para upload" }];
});

mock.onPut(new RegExp("/student/documents/.*/status")).reply((config) => {
  const match = config.url!.match(/\/student\/documents\/(.*?)\/status/);
  const documentId = match ? match[1] : null;
  const { status } = JSON.parse(config.data);

  const validStatuses = ["em_analise", "aprovado", "rejeitado"];

  if (documentId && validStatuses.includes(status)) {
    const index = uploadedDocuments.findIndex((doc) => doc.id === documentId);
    if (index !== -1) uploadedDocuments[index].status = status;
    return [
      200,
      {
        message: `Status do documento ${documentId} atualizado para ${status}`,
      },
    ];
  }

  return [400, { message: "Requisição inválida ou status inválido" }];
});
