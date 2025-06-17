import { TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "@styles/colors";
import Text from "./Text";

const activeStyle: ViewStyle = {
  backgroundColor: colors.greenMedium,
};

const inactiveStyle: ViewStyle = {
  backgroundColor: colors.white,
  borderColor: colors.black,
  borderWidth: 1,
};

interface CategoryItemProps {
  label: string;
  selected: boolean;
  onPress: VoidFunction;
}

const CategoryItem = ({ label, selected, onPress }: CategoryItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={selected ? activeStyle : inactiveStyle}
    className="items-center justify-center rounded-lg px-4 py-1.5"
  >
    <Text
      style={{ color: selected ? colors.white : colors.black }}
      className="font-interSemiBold"
      size={14}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default CategoryItem;
