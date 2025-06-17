import StatusBar from "./StatusBar";
import Text from "./Text";
import { IColors } from "@styles/model";
import { ChevronLeft } from "lucide-react-native";
import { colors } from "@styles/colors";
import * as RN from "react-native";

const Header = ({
  color = "black",
  bgColor = "background",
  title,
  onPressBack,
}: {
  color?: IColors;
  bgColor?: IColors;
  title?: string;
  onPressBack?: VoidFunction;
}) => {
  return (
    <>
      <StatusBar backgroundColor={bgColor} />
      <RN.View style={[Styles.Container, { backgroundColor: colors[bgColor] }]}>
        <RN.TouchableOpacity style={Styles.BackButton} onPress={onPressBack}>
          <ChevronLeft size={45} color={colors[color]} />
        </RN.TouchableOpacity>
        {title && (
          <Text className="font-interBold text-black" size={26}>
            {title}
          </Text>
        )}
      </RN.View>
    </>
  );
};

const Styles = RN.StyleSheet.create({
  Container: {
    gap: 4,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  BackButton: {},
});

export default Header;
