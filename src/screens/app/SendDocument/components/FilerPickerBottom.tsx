import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as RN from "react-native";
import { colors } from "@styles/colors";
import Text from "@components/Text";

const FilePickerBottomSheet = forwardRef<BottomSheetModal, {}>((props, ref) => {
  const snapPoints = useMemo(() => ["40%"], []);
  const { bottom } = useSafeAreaInsets();
  const { dismiss } = useBottomSheetModal();
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
              backgroundColor: "rgba(7, 7, 7, 0.1)", // opaco
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

          <RN.TouchableOpacity className="flex-row items-center py-3 border-b border-gray">
            <Ionicons name="camera-outline" size={28} color={colors.black} />
            <Text size={18} className="ml-3 font-interSemiBold text-black">
              Câmera
            </Text>
          </RN.TouchableOpacity>

          <RN.TouchableOpacity className="flex-row items-center py-3 border-b border-gray">
            <Ionicons name="image-outline" size={28} color={colors.black} />
            <Text size={18} className="ml-3 font-interSemiBold text-black">
              Galeria
            </Text>
          </RN.TouchableOpacity>

          <RN.TouchableOpacity className="flex-row items-center py-3">
            <Ionicons name="document-outline" size={28} color={colors.black} />
            <Text size={18} className="ml-3 font-interSemiBold text-black">
              Arquivos
            </Text>
          </RN.TouchableOpacity>
        </RN.View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default FilePickerBottomSheet;
