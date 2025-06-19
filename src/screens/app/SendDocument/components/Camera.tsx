import { CameraView, CameraCapturedPicture } from "expo-camera";
import { useRef } from "react";
import { X, Camera } from "lucide-react-native";
import * as RN from "react-native";

interface IPropsCamera {
  visible: boolean;
  onClose: VoidFunction;
  onPictureTaken: (photo: CameraCapturedPicture) => void;
}

export default function DocumentCamera({
  visible,
  onClose,
  onPictureTaken,
}: IPropsCamera) {
  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.6,
      });
      onPictureTaken(photo);
      onClose();
    }
  };

  return (
    <RN.Modal visible={visible} animationType="slide">
      <RN.View className="flex-1 bg-black">
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

        <RN.View className="absolute top-8 right-5">
          <RN.TouchableOpacity
            className="w-14 h-14 bg-white/20 rounded-full justify-center items-center"
            onPress={onClose}
          >
            <X color="white" size={30} />
          </RN.TouchableOpacity>
        </RN.View>

        <RN.View className="absolute bottom-12 w-full flex-row justify-center">
          <RN.TouchableOpacity
            className="w-24 h-24 bg-white rounded-full justify-center items-center shadow-lg shadow-black/50"
            onPress={takePicture}
          >
            <Camera color="black" size={42} />
          </RN.TouchableOpacity>
        </RN.View>
      </RN.View>
    </RN.Modal>
  );
}
