import AuthService from "@services/auth";
import { useAuthStore } from "@stores/auth/authStore";
import { useMutation } from "@tanstack/react-query";
import { ICredentials } from "common/models/auth";
import { Keyboard } from "react-native";

const useLoginViewModel = () => {
  const { login: loginStore } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: ICredentials) => AuthService.login(credentials),
    onSuccess: (data) => loginStore({ user: data }),
    onError: (erro) =>
      console.error("[MutationLogin] - Erro ao fazer login.", erro),
  });

  const onSubmit = (credentials: ICredentials) => {
    Keyboard.dismiss();
    loginMutation.mutate(credentials);
  };

  return {
    onSubmit,
    reset: loginMutation.reset,
    isError: loginMutation.isError,
    isLoading: loginMutation.isPending,
  };
};

export default useLoginViewModel;
