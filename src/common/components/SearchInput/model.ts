import * as RN from "react-native";

export interface InputProps extends RN.TextInputProps {
  searchActive: boolean;
  searchTerm: any;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  styleRest?: RN.ViewStyle;
}
