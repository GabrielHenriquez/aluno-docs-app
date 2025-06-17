import Text from "./Text";
import Spacer from "./Spacer";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import { Ionicons } from "@expo/vector-icons";
import { responsiveSize } from "@utils/responsiveSize";
import { colors } from "@styles/colors";
import * as RN from "react-native";

interface IProps {
  label: string;
  data: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

export default function AnimatedDropdown({
  label,
  data,
  selected,
  setSelected,
}: IProps) {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new RN.Animated.Value(0)).current;

  function toggleDropdown() {
    const toValue = expanded ? 0 : 1;

    RN.Animated.timing(animation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  }

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      data?.length < 4 ? data?.length * responsiveSize(40) : 160,
    ],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <RN.View style={styles.container}>
      <Text className="font-interSemiBold">{label}</Text>
      <Spacer height={6} />
      <RN.TouchableOpacity onPress={toggleDropdown} style={styles.dropdown}>
        <Text className="font-interMedium">{selected}</Text>
        <RN.Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons
            name="chevron-down-outline"
            size={26}
            color={colors.black}
          />
        </RN.Animated.View>
      </RN.TouchableOpacity>

      <RN.Animated.View style={[styles.dropdownContent, { height }]}>
        <RN.FlatList
          data={data}
          scrollEnabled
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isSelected = item === selected;
            return (
              <RN.TouchableOpacity
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => {
                  setSelected(item);
                  toggleDropdown();
                }}
              >
                <Text className="font-interMedium">{item}</Text>
              </RN.TouchableOpacity>
            );
          }}
        />
      </RN.Animated.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayLighter,
    borderWidth: 0.5,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: responsiveSize(48),
    justifyContent: "space-between",
  },
  selectedOption: {
    backgroundColor: colors.grayMedium,
  },
  dropdownContent: {
    overflow: "hidden",
    backgroundColor: colors.grayLight,
    borderRadius: 10,
    marginTop: 4,
  },
  option: {
    height: responsiveSize(40),
    paddingHorizontal: 14,
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: colors.grayDark,
  },
});
