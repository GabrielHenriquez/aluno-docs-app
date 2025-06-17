import React, { useState } from "react";
import Text from "@components/Text";
import Button from "@components/Button";
import Input from "@components/Input";
import useFormLogin from "./form";
import Spacer from "@components/Spacer";
import StatusBar from "@components/StatusBar";
import AnimatedLogo from "./components/animatedLogo";
import LoginContainer from "./components/container";
import Modal from "@components/Modal";
import WarnRedLogo from "@assets/images/modal/warn-red.svg";
import useLoginViewModel from "./view.model";
import { LockKeyhole, User2 } from "lucide-react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import * as RN from "react-native";

const Login = () => {
  const VM = useLoginViewModel();
  const FORM = useFormLogin();
  const { height } = RN.useWindowDimensions();
  const isIos = RN.Platform.OS === "ios";

  return (
    <RN.View className="flex-1 bg-greenDark">
      <StatusBar backgroundColor="greenDark" barStyle={"light-content"} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={isIos ? 100 : 0}
      >
        <RN.TouchableWithoutFeedback onPress={RN.Keyboard.dismiss}>
          <RN.ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <RN.View
              style={{ height: height * 0.36 }}
              className="items-center justify-center"
            >
              <AnimatedLogo />
            </RN.View>

            <LoginContainer>
              <RN.View
                style={{ borderTopLeftRadius: 45, borderTopRightRadius: 45 }}
                className="flex-1 bg-background py-4"
              >
                <Text
                  className="text-center font-interBold text-greenText"
                  size={26}
                >
                  Acesse sua conta
                </Text>

                <RN.View className="px-5 mt-8">
                  <Input.Root>
                    <Input.Content
                      icon={<User2 size={22} color={"#FFFFFF"} />}
                      errors={FORM.errors.registration!}
                    >
                      <Input.TextInput
                        name="registration"
                        control={FORM.control}
                        placeholder="Matrícula"
                        keyboardType="numeric"
                        maxLength={6}
                        isRegistrationField
                      />
                    </Input.Content>
                  </Input.Root>

                  <Spacer height={16} />

                  <Input.Root>
                    <Input.Content
                      icon={<LockKeyhole size={22} color={"#FFFFFF"} />}
                      errors={FORM.errors.password!}
                    >
                      <Input.TextInput
                        name="password"
                        control={FORM.control}
                        placeholder="Senha"
                        isActivePassword={FORM.secureTextActive}
                        autoCapitalize="none"
                      />
                      <Input.IconPassword
                        secureTextActive={FORM.secureTextActive}
                        errors={!!FORM.errors.password}
                        onPress={() =>
                          FORM.setSecureTextActive(!FORM.secureTextActive)
                        }
                      />
                    </Input.Content>
                  </Input.Root>

                  <Spacer height={30} />

                  <Button
                    activeLoading={VM?.isLoading}
                    onPress={FORM.handleSubmit(VM.onSubmit)}
                  >
                    <Text className="font-interSemiBold text-white">
                      Entrar
                    </Text>
                  </Button>
                </RN.View>
              </RN.View>
            </LoginContainer>

            <Modal.Root>
              <Modal.Content visible={VM?.isError}>
                <Modal.Logo>
                  <WarnRedLogo width={90} height={90} />
                </Modal.Logo>
                <Modal.Title>Credenciais inválidas!</Modal.Title>
                <Button
                  bgColor="redDark"
                  styleRest={{ height: 40 }}
                  onPress={VM.reset}
                >
                  <Text className="text-white font-interSemiBold">
                    Tentar novamente
                  </Text>
                </Button>
              </Modal.Content>
            </Modal.Root>
          </RN.ScrollView>
        </RN.TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </RN.View>
  );
};

export default Login;
