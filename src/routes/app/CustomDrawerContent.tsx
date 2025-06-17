// routes/app/CustomDrawerContent.tsx
import React, { ReactNode } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Image, StatusBar } from "react-native";
import LogoutRedLogo from "@assets/images/modal/logout-red.svg";
import { colors } from "@styles/colors";
import { ArrowBigUpDashIcon, FolderClosed, LogOut } from "lucide-react-native";
import FolderCheckIcon from "@assets/icons/folder-check.svg";
import Button from "@components/Button";
import Text from "@components/Text";
import Modal from "@components/Modal";
import Spacer from "@components/Spacer";
import { AppNavigationProp } from "./homeStack";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "@stores/auth/authStore";

interface ButtonContent {
  icon: ReactNode;
  text: string;
  action: VoidFunction;
}

type ContentsButton = Record<
  "myDocuments" | "sendDocument" | "documentsSent",
  ButtonContent
>;

export default function CustomDrawerContent(props: any) {
  const [showModal, setShowModal] = React.useState(false);
  const { user, logout } = useAuthStore();
  const { navigate } = useNavigation<AppNavigationProp>();
  const contentsButton: ContentsButton = {
    myDocuments: {
      icon: <FolderClosed size={22} color={colors.black} />,
      text: "Meus documentos",
      action: () => navigate("MyDocuments"),
    },
    sendDocument: {
      icon: <ArrowBigUpDashIcon size={22} color={colors.black} />,
      text: "Enviar documento",
      action: () => navigate("SendDocument"),
    },
    documentsSent: {
      icon: <FolderCheckIcon width={22} color={colors.black} />,
      text: "Documentos enviados",
      action: () => navigate("DocumentsSent"),
    },
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        paddingTop: StatusBar.currentHeight! + 30,
      }}
      className="bg-white"
    >
      <View className="items-center mb-5">
        <Image
          source={require("@assets/images/person-doc.png")}
          className="mb-2"
          style={{
            width: 86,
            height: 86,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: colors.grayLight,
          }}
          resizeMode="contain"
        />
        <Text size={20} className="font-interSemiBold text-grayDark">
          {user?.nome}
        </Text>
        <Text size={14} className="text-gray mt-1">
          Matrícula: {user?.matricula}
        </Text>
      </View>

      <View className="border-t border-grayLight ">
        <View className="w-full px-4 mt-5 gap-3">
          {Object.entries(contentsButton).map(
            ([key, { icon, text, action }]) => (
              <Button
                key={key}
                bgColor="white"
                onPress={action}
                styleRest={{
                  borderWidth: 1,
                  borderColor: "#CECCCC",
                  alignItems: "flex-start",
                  height: 38,
                  paddingLeft: 12,
                }}
              >
                {icon}
                <Text className="font-semibold text-black" size={16}>
                  {text}
                </Text>
              </Button>
            )
          )}
        </View>
      </View>

      <View className="px-4 mt-8">
        <Button
          bgColor="redDark"
          styleRest={{ height: 38 }}
          onPress={() => setShowModal(true)}
        >
          <Text size={16} className="text-white font-bold">
            Sair
          </Text>
          <LogOut size={20} color="#fff" />
        </Button>
      </View>

      <Modal.Root>
        <Modal.Content visible={showModal}>
          <Modal.AreaCloseModal onClose={() => setShowModal(false)} />
          <Modal.Logo>
            <LogoutRedLogo width={90} height={90} />
          </Modal.Logo>
          <Modal.Title>Tem certeza que deseja sair?</Modal.Title>
          <Button
            styleRest={{ height: 40, marginTop: 4 }}
            bgColor="redDark"
            onPress={() => {
              setShowModal(false);
              logout();
            }}
          >
            <Text className="text-white font-interSemiBold">Sair</Text>
          </Button>
        </Modal.Content>
      </Modal.Root>
    </DrawerContentScrollView>
  );
}
