import { OnboardingKey } from "../view";

const Contents: Record<
  OnboardingKey,
  {
    title: string;
    subtitle: string;
    image: any;
    labelButton: string;
  }
> = {
  "0": {
    title: "Gerencie seus documentos escolares",
    subtitle: "Acesse histórico, boletins e declarações em um só lugar.",
    image: require("@assets/images/onboarding-1.png"),
    labelButton: "Próximo",
  },
  "1": {
    title: "Envie atestados e requerimentos",
    subtitle:
      "Faça upload dos documentos que você precisa enviar para a escola.",
    image: require("@assets/images/onboarding-2.png"),
    labelButton: "Começar",
  },
};

export default Contents;
