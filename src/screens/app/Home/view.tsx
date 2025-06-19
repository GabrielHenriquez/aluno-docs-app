import React, { ReactNode } from "react";
import StatusBar from "@components/StatusBar";
import Text from "@components/Text";
import Button from "@components/Button";
import FolderCheckIcon from "@assets/icons/folder-check.svg";
import { ArrowBigUpDashIcon, FolderClosed, Menu } from "lucide-react-native";
import { colors } from "@styles/colors";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { AppNavigationProp } from "@routes/app/homeStack";
import { useAuthStore } from "@stores/auth/authStore";
import * as RN from "react-native";

interface ButtonContent {
  icon: ReactNode;
  text: string;
  action: VoidFunction;
}

type ContentsButton = Record<
  "myDocuments" | "sendDocument" | "documentsSent",
  ButtonContent
>;

const Home = () => {
  const { dispatch, navigate } = useNavigation<AppNavigationProp>();
  const { user } = useAuthStore();
  const contentsButton: ContentsButton = {
    myDocuments: {
      icon: <FolderClosed size={30} color={colors.black} />,
      text: "Meus documentos",
      action: () => navigate("MyDocuments"),
    },
    sendDocument: {
      icon: <ArrowBigUpDashIcon size={30} color={colors.black} />,
      text: "Enviar documento",
      action: () => navigate("SendDocument"),
    },
    documentsSent: {
      icon: <FolderCheckIcon width={30} color={colors.black} />,
      text: "Documentos enviados",
      action: () => navigate("DocumentsSent"),
    },
  };

  const { height } = RN.Dimensions.get("window");
  return (
    <RN.View className="flex-1 bg-background">
      <StatusBar backgroundColor="greenMedium" />
      <RN.View className="w-full h-16 bg-greenMedium items-center flex-row px-4 ">
        <RN.TouchableOpacity
          onPress={() => dispatch(DrawerActions.openDrawer())}
        >
          <Menu size={32} color={"#FFFFFF"} />
        </RN.TouchableOpacity>

        <RN.View className="w-full absolute items-center ml-4">
          <Text size={18} className="font-interBold text-white ">
            Olá, {user?.nome}
          </Text>
        </RN.View>
      </RN.View>
      <RN.View className="flex-1 mt-14 items-center">
        <RN.Image
          source={require("@assets/images/person-doc.png")}
          style={{ width: 320, height: height * 0.32 }}
          resizeMode="contain"
        />

        <Text
          size={32}
          className="font-interBold text-black text-center my-4 max-w-80"
        >
          O que você quer fazer agora?
        </Text>

        <RN.View className="w-full px-6 mt-2 gap-3.5">
          {Object.entries(contentsButton).map(
            ([key, { icon, text, action }]) => (
              <Button
                key={key}
                bgColor="white"
                onPress={action}
                styleRest={{
                  borderWidth: 1,
                  borderColor: colors.gray3,
                  elevation: 1,
                  alignItems: "flex-start",
                  paddingHorizontal: 16,
                }}
              >
                {icon}
                <Text className="font-semibold text-black" size={22}>
                  {text}
                </Text>
              </Button>
            )
          )}
        </RN.View>
      </RN.View>
    </RN.View>
  );
};

export default Home;
