import Text from "./Text";
import Spacer from "./Spacer";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import { Ionicons } from "@expo/vector-icons";
import { responsiveSize } from "@utils/responsiveSize";
import { colors } from "@styles/colors";
import * as RN from "react-native";
import { CategoryUploadType } from "@models/document";
export interface FlatListItem {
  key: CategoryUploadType;
  value: string;
}
interface IProps {
  label: string;
  data: FlatListItem[];
  selected: FlatListItem | null;
  setSelected: Dispatch<SetStateAction<FlatListItem | null>>;
}

export default function AnimatedDropdown({
  label,
  data,
  selected,
  setSelected,
}: IProps) {
  const [expanded, setExpanded] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const animation = useRef(new RN.Animated.Value(0)).current;

  const borderToDropdownContentExpanded: RN.ViewStyle = expanded
    ? { borderWidth: 1, borderColor: colors.gray3, elevation: 1 }
    : {};

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

  const hasSelected = selected ? selected.value : "Selecione uma opção";
  const hasSelectedStyle = selected
    ? "font-interSemiBold text-black"
    : "font-interSemiBold text-gray4";

  return (
    <RN.View style={styles.container}>
      <RN.View className="flex-row">
        <Text size={17} className="font-interBolds text-redDark">
          *
        </Text>
        <Text className="font-interSemiBold">{label}:</Text>
      </RN.View>
      <Spacer height={4} />
      <RN.TouchableOpacity
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setDropdownHeight(height + 6 + 25);
        }}
        onPress={toggleDropdown}
        style={styles.dropdown}
      >
        <Text className={hasSelectedStyle}>{hasSelected}</Text>
        <RN.Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons
            name="chevron-down-outline"
            size={26}
            color={colors.black}
          />
        </RN.Animated.View>
      </RN.TouchableOpacity>

      <RN.Animated.View
        style={[
          styles.dropdownContent,
          { height, top: dropdownHeight, ...borderToDropdownContentExpanded },
        ]}
      >
        <RN.FlatList
          data={data}
          scrollEnabled
          keyExtractor={(item: FlatListItem) => item.key}
          renderItem={({ item }) => {
            const isSelected = item.key === selected?.key;
            return (
              <RN.TouchableOpacity
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => {
                  setSelected(item);
                  toggleDropdown();
                }}
              >
                <Text className="font-interSemiBold text-black">
                  {item.value}
                </Text>
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
    borderWidth: 1,
    borderColor: colors.gray3,
    elevation: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: responsiveSize(48),
    justifyContent: "space-between",
  },
  selectedOption: {
    backgroundColor: colors.gray2,
  },
  dropdownContent: {
    position: "absolute",
    left: 0,
    right: 0,
    overflow: "hidden",
    backgroundColor: colors.grayLighter,
    borderRadius: 8,
    zIndex: 1000,
  },
  option: {
    height: 40,
    paddingHorizontal: 14,
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: colors.gray,
  },
});
