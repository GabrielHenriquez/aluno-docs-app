import Text from "@components/Text";
import { TextProps } from "react-native";

interface Props extends TextProps {
  children: React.ReactNode;
}

const ModalTitle = ({ children, ...rest }: Props) => (
  <Text className="text-black font-interBold text-center" size={20}>
    {children}
  </Text>
);

export default ModalTitle;
