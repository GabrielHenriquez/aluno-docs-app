import data from "../mocks/data.json";

const { availableDocuments, documentCategories, uploadedDocuments } = data;

export const mockDB = {
  user: {
    id: "1",
    nome: "Gabriel Henrique",
    matricula: "263425",
    token: "fake_token_jwt_test",
  },
  availableDocuments,
  uploadedDocuments,
  documentCategories,
};
