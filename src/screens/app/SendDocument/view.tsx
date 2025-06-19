import Header from "@components/Header";
import Spacer from "@components/Spacer";
import AnimatedDropdown from "@components/Dropdown";
import Text from "@components/Text";
import Button from "@components/Button";
import Modal from "@components/Modal";
import FilePickerBottomSheet from "./components/FilerPickerBottom";
import Camera from "./components/Camera";
import CheckLogo from "@assets/images/modal/check.svg";
import useSendDocumentViewModel from "./view.model";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "@routes/app/homeStack";
import { Link, Plus, Trash2 } from "lucide-react-native";
import { colors } from "@styles/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getDefaultFileName } from "./utils/getFileName";
import * as RN from "react-native";

const SendDocument = () => {
  const { goBack } = useNavigation<AppNavigationProp>();
  const { bottom } = useSafeAreaInsets();
  const { height } = RN.Dimensions.get("window");
  const VM = useSendDocumentViewModel();

  const renderFileInfo = () => (
    <RN.View className="px-3 justify-between flex-row bg-grayLight items-center py-1.5 rounded-lg">
      <RN.View className="gap-2 flex-row items-center" style={{ flex: 0.8 }}>
        <Link size={18} color={colors.grayDark} />
        <Text size={15} className="text-grayDark font-interMedium">
          {getDefaultFileName(VM?.attachedFileImage, VM?.attachedFile)}
        </Text>
      </RN.View>
      <RN.TouchableOpacity
        style={{ flex: 0.06 }}
        className="py-1 items-center justify-center"
        onPress={VM?.removeAttached}
      >
        <Trash2 size={20} color={colors.grayDark} />
      </RN.TouchableOpacity>
    </RN.View>
  );

  const renderFileButton = () => (
    <Button
      bgColor="greenLight"
      styleRest={{
        borderStyle: "dashed",
        borderWidth: 2.5,
        borderColor: colors.greenDarkest,
      }}
      onPress={VM?.handlePresentModalPress}
    >
      <Plus size={30} color={colors.greenDarkest} />
      <Text size={18} className="font-interBold text-greenDarkest">
        Selecionar arquivo
      </Text>
    </Button>
  );

  return (
    <RN.View className="flex-1 bg-background">
      <Header title="Enviar documento" onPressBack={goBack} />
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
          data={VM.flatListData}
          selected={VM.selected}
          setSelected={VM.setSelected}
        />

        <Camera
          visible={VM.showCamera}
          onClose={() => VM.setShowCamera(false)}
          onPictureTaken={VM.onPictureTaken}
        />

        <Spacer height={14} />

        <Text size={15} className="font-interMedium text-grayDark">
          Selecione o arquivo que deseja enviar para a escola. Certifique-se de
          que o documento esteja legível.
        </Text>

        <Spacer height={5} />

        <Text size={14} className="font-interMedium text-redDark">
          *Aceitamos arquivos nos formatos: PDF, DOCX, HTML, JPG e PNG.
        </Text>

        <Spacer height={20} />

        {VM?.hasAttachment ? renderFileInfo() : renderFileButton()}

        <RN.View style={{ bottom: bottom + 20 }} className="mt-auto">
          <Button
            bgColor={VM?.hasAttachment && VM.selected ? "greenMedium" : "gray2"}
            disabled={!(VM?.hasAttachment && VM.selected)}
            onPress={VM?.handleSendDocument}
            activeLoading={VM?.isLoading}
          >
            <Text size={18} className="font-bold text-white">
              Enviar
            </Text>
          </Button>
        </RN.View>
      </RN.View>

      <FilePickerBottomSheet
        ref={VM.bottomSheetModalRef}
        onCameraPress={VM.handleOpenCamera}
        onGalleryPress={VM.pickImage}
        onFilePress={VM.openFilePicker}
      />

      <Modal.Root>
        <Modal.Content visible={VM.visiblePreviewImage}>
          <RN.Image
            source={{ uri: VM.galleryImage?.uri ?? VM.cameraImage?.uri }}
            style={{ width: 285, height: 380 }}
            resizeMode="cover"
          />

          <Button
            bgColor="white"
            styleRest={{ borderWidth: 1.5, borderColor: colors.greenDark }}
            onPress={VM?.handleModalPreviewAnother}
          >
            <Text size={18} className="font-interBold text-greenDark">
              {VM.cameraImage ? "Tirar outra" : "Escolher outra"}
            </Text>
          </Button>

          <Button onPress={VM?.handleModalAttach}>
            <Text size={18} className="font-interBold text-white">
              Anexar
            </Text>
          </Button>
        </Modal.Content>
      </Modal.Root>

      <Modal.Root>
        <Modal.Content visible={VM.visibleModalSuccess}>
          <CheckLogo width={90} height={90} />
          <Modal.Title>Documento enviado com sucesso!</Modal.Title>
          <Modal.Subtitle>
            Envio confirmado! Veja os detalhes e o status na tela seguinte.
          </Modal.Subtitle>
          <Button
            styleRest={{ height: 40, marginTop: 4 }}
            onPress={VM?.handleModalSuccessContinue}
          >
            <Text className="text-white font-interBold">Continuar</Text>
          </Button>
        </Modal.Content>
      </Modal.Root>
    </RN.View>
  );
};

export default SendDocument;
