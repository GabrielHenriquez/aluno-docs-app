import React, { useCallback, useRef, useState } from "react";
import Header from "@components/Header";
import Spacer from "@components/Spacer";
import AnimatedDropdown from "@components/Dropdown";
import Text from "@components/Text";
import Button from "@components/Button";
import FilePickerBottomSheet from "./components/FilerPickerBottom";
import Modal from "@components/Modal";
import CheckLogo from "@assets/images/modal/check.svg";
import { useNavigation } from "@react-navigation/native";
import { Plus } from "lucide-react-native";
import { colors } from "@styles/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { AppNavigationProp } from "@routes/app/homeStack";
import * as RN from "react-native";

const SendDocument = () => {
  const { goBack, navigate } = useNavigation<AppNavigationProp>();
  const { height } = RN.Dimensions.get("window");
  const { bottom } = useSafeAreaInsets();
  const [selected, setSelected] = useState("");
  const [visiblePreviewImage, setVisiblePreviewImage] = useState(false);
  const [visibleModalSuccess, setVisibleModalSuccess] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(
    () => bottomSheetModalRef.current?.present(),
    []
  );

  return (
    <RN.View className="flex-1 bg-background">
      <Header onPressBack={goBack} title="Enviar documento" />
      <Spacer height={30} />

      <RN.View className="px-6 flex-1">
        <RN.Image
          source={require("@assets/images/person-doc.png")}
          style={{
            width: 300,
            height: height * 0.25,
            alignSelf: "center",
          }}
          resizeMode="contain"
        />

        <Spacer height={22} />

        <AnimatedDropdown
          label="Categoria do documento"
          data={Array(4).fill("Testando opção")}
          selected={selected}
          setSelected={setSelected}
        />

        <Spacer height={10} />

        <Text size={16} className="font-interMedium text-grayDark">
          Selecione o arquivo que deseja enviar para a escola. Certifique-se de
          que o documento esteja legível.
        </Text>

        <Spacer height={5} />

        <Text size={14} className="font-interMedium text-redDark">
          *Aceitamos arquivos nos formatos: PDF, DOCX, HTML, JPG e PNG. Tamanho
          máximo: 10MB.
        </Text>

        <Spacer height={20} />

        <Button
          bgColor="greenLight"
          styleRest={{
            borderStyle: "dashed",
            borderWidth: 2.5,
            borderColor: colors.greenDarkest,
          }}
          onPress={() => setVisibleModalSuccess(true)}
        >
          <Plus size={30} color={colors.greenDarkest} />
          <Text size={18} className="font-interBold text-greenDarkest">
            Selecionar arquivo
          </Text>
        </Button>

        {/*         <RN.View className="px-3 justify-between flex-row bg-grayLight items-center py-1.5 rounded-lg">
          <RN.View className="gap-1.5 flex-row items-center">
            <Link size={18} color={colors.grayDark} />
            <Text size={15} className="text-grayDark font-inter">
              Atestado_RPH_203129.pdf
            </Text>
          </RN.View>
          <RN.TouchableOpacity className="px-1 py-0.5 left-1">
            <Trash2 size={20} color={colors.grayDark} />
          </RN.TouchableOpacity>
        </RN.View>
*/}
        <RN.View style={{ bottom: bottom + 20 }} className="mt-auto">
          <Button bgColor="gray" disabled>
            <Text size={18} className="font-bold text-white">
              Enviar
            </Text>
          </Button>
        </RN.View>
      </RN.View>

      <FilePickerBottomSheet ref={bottomSheetModalRef} />

      <Modal.Root>
        <Modal.Content visible={visiblePreviewImage}>
          <RN.Image
            source={{
              uri: "https://compraratestadomedico.com/wp-content/uploads/2023/02/comprar-atestado-medico.jpg",
            }}
            style={{ width: 285, height: 380 }}
            resizeMode="contain"
          />

          <Button
            bgColor="white"
            styleRest={{ borderWidth: 1, borderColor: colors.grayDark }}
          >
            <Text size={18} className="font-interBold text-greenDark">
              Tirar outra
            </Text>
          </Button>

          <Button onPress={() => setVisiblePreviewImage(false)}>
            <Text size={18} className="font-interBold text-white">
              Anexar
            </Text>
          </Button>
        </Modal.Content>
      </Modal.Root>

      <Modal.Root>
        <Modal.Content visible={visibleModalSuccess}>
          <CheckLogo width={90} height={90} />
          <Modal.Title>Documento enviado com sucesso!</Modal.Title>
          <Modal.Subtitle>
            Envio confirmado! Veja os detalhes e o status na tela seguinte.
          </Modal.Subtitle>
          <Button
            styleRest={{ height: 40, marginTop: 4 }}
            onPress={() => {
              setVisibleModalSuccess(false);
              setTimeout(() => navigate("DocumentsSent"), 500);
            }}
          >
            <Text className="text-white font-interBold">Continuar</Text>
          </Button>
        </Modal.Content>
      </Modal.Root>
    </RN.View>
  );
};

export default SendDocument;
