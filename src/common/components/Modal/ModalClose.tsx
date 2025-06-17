import Text from "@components/Text";
import * as RN from "react-native";

type Props = {
  onClose: () => void;
};

const AreaModalClose = ({ onClose }: Props) => (
  <RN.View className="w-full items-end">
    <RN.TouchableOpacity className="w-8 items-center" onPress={onClose}>
      <Text className="font-interSemiBold" size={26}>
        X
      </Text>
    </RN.TouchableOpacity>
  </RN.View>
);

export default AreaModalClose;
