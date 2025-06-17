import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { colors } from "@styles/colors";
import Text from "@components/Text";
import * as RN from "react-native";

interface InputContentProps extends RN.ViewProps {
  children: ReactNode;
  errors: FieldError;
  icon: ReactNode;
}

const { height } = RN.Dimensions.get("window");

const InputContent = ({
  children,
  errors,
  icon,
  ...rest
}: InputContentProps) => {
  return (
    <RN.View className="w-full" {...rest}>
      <RN.View
        className="w-full bg-white flex-row items-center rounded-xl"
        style={{
          height: height * 0.06,
          borderWidth: 1,
          borderColor: !!errors ? colors.redDark : colors.grayLight,
        }}
      >
        {icon && (
          <RN.View
            style={{ height: height * 0.06 }}
            className="w-16 bg-greenMedium rounded-l-xl justify-center items-center"
          >
            {icon}
          </RN.View>
        )}

        {children}
      </RN.View>
      {errors && (
        <Text size={12} className="text-redDark font-interSemiBold pt-1 pl-1">
          {String(errors?.message)}
        </Text>
      )}
    </RN.View>
  );
};

export default InputContent;
