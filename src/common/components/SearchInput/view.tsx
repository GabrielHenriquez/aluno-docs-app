import { styles } from "./styles";
import { InputProps } from "./model";
import { Search, X } from "lucide-react-native";
import * as RN from "react-native";
import { colors } from "@styles/colors";

function SearchInput({
  searchActive,
  searchTerm,
  styleRest,
  setSearchTerm,

  ...rest
}: InputProps) {
  return (
    <RN.View style={[styles.container, { ...styleRest }]}>
      <RN.View style={styles.contentInput}>
        {!searchActive && (
          <RN.View style={[styles.areaIcon, { marginRight: 0, marginLeft: 4 }]}>
            <Search color={colors.greenMedium} />
          </RN.View>
        )}

        <RN.TextInput
          value={searchTerm}
          placeholderTextColor={colors.gray}
          placeholder="Pesquisar"
          onChangeText={setSearchTerm}
          style={styles.textInput}
          {...rest}
        />

        {/*         {searchActive && (
          <RN.TouchableOpacity
            style={styles.areaIcon}
            onPress={VIEW_MODEL.clearInput}
          >
            <X color={colors.black} />
          </RN.TouchableOpacity>
        )} */}
      </RN.View>
    </RN.View>
  );
}

export default SearchInput;
