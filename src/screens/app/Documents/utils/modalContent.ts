import data from "@mocks/data.json";

const { statusConfig } = data;
const { colors } = statusConfig;

export const contentModal = [
  {
    label: "Enviado",
    description: "Aguardando análise.",
    color: colors.enviado,
  },
  {
    label: "Em Análise",
    description: "Em avaliação.",
    color: colors.em_analise,
  },
  {
    label: "Aprovado",
    description: "Documento aprovado.",
    color: colors.aprovado,
  },
  {
    label: "Rejeitado",
    description: "Documento rejeitado.",
    color: colors.rejeitado,
  },
];
