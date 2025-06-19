import { useState, useRef, useCallback, useId } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { CameraCapturedPicture, useCameraPermissions } from "expo-camera";
import { AppNavigationProp } from "@routes/app/homeStack";
import { FlatListItem } from "@components/Dropdown";
import { mockDB } from "@mocks/mock-db";
import { useUploadDocument } from "@hooks/useUploadDocument";
import { CategoryUploadType, IUploadPayload } from "@models/document";
import { getDefaultFileName } from "./utils/getFileName";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import data from "@mocks/data.json";

type Attachment =
  | CameraCapturedPicture
  | ImagePicker.ImagePickerAsset
  | DocumentPicker.DocumentPickerAsset;

const useSendDocumentViewModel = () => {
  const { dismiss } = useBottomSheetModal();
  const { navigate } = useNavigation<AppNavigationProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { documentCategories } = data;
  const id = useId();

  const [selected, setSelected] = useState<FlatListItem | null>(null);

  const [visiblePreviewImage, setVisiblePreviewImage] = useState(false);
  const [visibleModalSuccess, setVisibleModalSuccess] = useState(false);

  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const [galleryImage, setGalleryImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [cameraImage, setCameraImage] = useState<CameraCapturedPicture | null>(
    null
  );
  const [attachedImage, setAttachedImage] =
    useState<CameraCapturedPicture | null>(null);
  const [attachedFileImage, setAttachedFileImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [attachedFile, setAttachedFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const flatListData: FlatListItem[] = Object.entries(
    mockDB.documentCategories.upload
  )
    .slice(1)
    .map(([key, value]) => ({
      key: key as CategoryUploadType,
      value,
    }));

  const { mutate, isPending } = useUploadDocument({
    onSuccess: () => {
      setVisibleModalSuccess(true);
    },
  });

  const getCurrentAttachment = (): Attachment | null => {
    if (attachedImage) return attachedImage;
    if (attachedFileImage) return attachedFileImage;
    if (attachedFile) return attachedFile;
    return null;
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const pickImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.6,
      });

      if (!result.canceled) {
        dismiss();
        setGalleryImage(result.assets[0]);
        setTimeout(() => setVisiblePreviewImage(true), 250);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
      console.error(error);
    }
  }, [dismiss]);

  const openFilePicker = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "text/html",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/pdf",
          "image/jpeg",
          "image/png",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        dismiss();
        setTimeout(() => setAttachedFile(result.assets[0]), 200);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível selecionar o arquivo.");
      console.error(error);
    }
  }, [dismiss]);

  const openCamera = useCallback(async (): Promise<boolean> => {
    try {
      if (!permission) return false;
      if (!permission.granted) {
        const newPermission = await requestPermission();
        if (!newPermission.granted) return false;
      }
      return true;
    } catch (error) {
      console.error("Erro ao solicitar permissão da câmera:", error);
      return false;
    }
  }, [permission, requestPermission]);

  const handleOpenCamera = useCallback(async () => {
    const granted = await openCamera();
    if (granted) {
      dismiss();
      setTimeout(() => setShowCamera(true), 200);
    }
  }, [dismiss, openCamera]);

  const onPictureTaken = useCallback((photo: CameraCapturedPicture) => {
    setCameraImage(photo);
    setShowCamera(false);
    setTimeout(() => setVisiblePreviewImage(true), 200);
  }, []);

  const removeAttached = useCallback(() => {
    setAttachedFile(null);
    setAttachedFileImage(null);
    setAttachedImage(null);
  }, []);

  const handleModalAttach = useCallback(() => {
    if (cameraImage) {
      setAttachedImage(cameraImage);
    } else {
      setAttachedFileImage(galleryImage);
    }
    setGalleryImage(null);
    setCameraImage(null);
    setVisiblePreviewImage(false);
  }, [cameraImage, galleryImage]);

  const handleModalPreviewAnother = useCallback(() => {
    setVisiblePreviewImage(false);
    setGalleryImage(null);
    setCameraImage(null);
    cameraImage ? handleOpenCamera() : pickImage();
  }, [cameraImage, handleOpenCamera, pickImage]);

  const validateTypeDocument = (type: string) => {
    if (type === "application/pdf") return "pdf";
    if (
      type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return "docx";
    if (type === "text/html") return "html";
    if (type === "image/jpeg") return "image";
    if (type === "image/png") return "image";
  };

  const normalizeAttachment = (
    data: Attachment
  ): { size: number; type?: string; uri: string } => {
    const size =
      "fileSize" in data
        ? data.fileSize ?? 0
        : "size" in data
        ? data.size ?? 0
        : 0;

    const type =
      "type" in data
        ? data.type
        : "mimeType" in data
        ? validateTypeDocument(data.mimeType!)
        : "format" in data && data.format
        ? "image"
        : undefined;

    return {
      size,
      type,
      uri: data.uri,
    };
  };

  const handleSendDocument = () => {
    const data = getCurrentAttachment();
    if (!data) return;

    const { size, type = "", uri } = normalizeAttachment(data);

    const payload: IUploadPayload = {
      category: selected?.key!,
      title: documentCategories.upload[selected?.key!],
      id,
      file: {
        name: getDefaultFileName(attachedFileImage, attachedFile),
        size,
        type,
        uri,
      },
    };

    mutate(payload);
  };

  const handleModalSuccessContinue = useCallback(() => {
    setVisibleModalSuccess(false);
    setTimeout(() => navigate("DocumentsSent"), 300);
  }, [navigate]);

  const hasAttachment = attachedFileImage || attachedFile || attachedImage;

  return {
    isLoading: isPending,
    selected,
    setSelected,
    visiblePreviewImage,
    setVisiblePreviewImage,
    visibleModalSuccess,
    setVisibleModalSuccess,
    showCamera,
    setShowCamera,
    galleryImage,
    setGalleryImage,
    cameraImage,
    setCameraImage,
    attachedImage,
    setAttachedImage,
    attachedFileImage,
    setAttachedFileImage,
    attachedFile,
    bottomSheetModalRef,
    flatListData,
    handlePresentModalPress,
    pickImage,
    openFilePicker,
    handleOpenCamera,
    onPictureTaken,
    removeAttached,
    handleModalAttach,
    handleModalPreviewAnother,
    handleSendDocument,
    handleModalSuccessContinue,
    hasAttachment,
  };
};

export default useSendDocumentViewModel;
