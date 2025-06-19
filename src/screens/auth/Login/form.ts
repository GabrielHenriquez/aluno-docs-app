import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ICredentials } from "@models/auth";

const useFormLogin = () => {
  const [secureTextActive, setSecureTextActive] = useState(true);

  const formSchema = yup.object({
    registration: yup
      .string()
      .required("Matrícula é um campo obrigatório")
      .min(6, "A matrícula deve conter 6 dígitos"),
    password: yup
      .string()
      .required("Senha é um campo obrigatório")
      .min(8, "A senha deve conter no mínimo 8 caracteres"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICredentials>({
    resolver: yupResolver(formSchema),
  });

  return {
    control,
    handleSubmit,
    errors,
    secureTextActive,
    setSecureTextActive,
  };
};

export default useFormLogin;
