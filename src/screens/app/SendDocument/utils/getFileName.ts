import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export const getDefaultFileName = (
  attachedFileImage: ImagePicker.ImagePickerAsset | null,
  attachedFile: DocumentPicker.DocumentPickerAsset | null
): string => {
  if (attachedFileImage?.fileName) return attachedFileImage.fileName;
  if (attachedFile?.name) return attachedFile.name;
  return `img_camera_${Date.now()}.jpg`;
};
