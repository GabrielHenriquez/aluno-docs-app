import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Text from "@components/Text";
import { forwardRef, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@styles/colors";
import * as RN from "react-native";

interface FilePickerBottomSheetProps {
  onCameraPress: VoidFunction;
  onGalleryPress: VoidFunction;
  onFilePress: VoidFunction;
}

const FilePickerBottomSheet = forwardRef<
  BottomSheetModal,
  FilePickerBottomSheetProps
>(({ onCameraPress, onGalleryPress, onFilePress }, ref) => {
  const snapPoints = useMemo(() => ["40%"], []);
  const { bottom } = useSafeAreaInsets();
  const { dismiss } = useBottomSheetModal();

  const content = [
    {
      icon: <Ionicons name="camera-outline" size={28} color={colors.black} />,
      label: "Câmera",
      action: () => onCameraPress(),
    },
    {
      icon: <Ionicons name="image-outline" size={28} color={colors.black} />,
      label: "Galeria",
      action: () => onGalleryPress(),
    },
    {
      icon: <Ionicons name="document-outline" size={28} color={colors.black} />,
      label: "Arquivos",
      action: () => onFilePress(),
    },
  ];

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDismissOnClose
      enableDynamicSizing
      backgroundStyle={{
        backgroundColor: colors.white,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        borderWidth: 2,
        borderColor: colors.grayLight,
      }}
      backdropComponent={({ style }) => (
        <RN.Pressable
          onPress={() => dismiss()}
          style={[
            RN.StyleSheet.absoluteFillObject,
            style,
            {
              backgroundColor: "rgba(7, 7, 7, 0.1)",
            },
          ]}
        />
      )}
      handleIndicatorStyle={{
        backgroundColor: colors.greenLight,
        borderRadius: 12,
        width: 124,
        height: 12,
      }}
    >
      <BottomSheetView style={{ flex: 1, bottom, height: 250 }}>
        <RN.View className="px-10">
          <Text size={22} className="text-center  font-interBold mb-2 mt-2">
            Selecione uma opção
          </Text>

          {content.map(({ action, icon, label }, index) => (
            <RN.TouchableOpacity
              key={label}
              onPress={action}
              className={`flex-row items-center py-3 ${
                index < content.length - 1 ? "border-b border-gray" : ""
              }`}
            >
              {icon}
              <Text size={18} className="ml-3 font-interSemiBold text-black">
                {label}
              </Text>
            </RN.TouchableOpacity>
          ))}
        </RN.View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default FilePickerBottomSheet;
