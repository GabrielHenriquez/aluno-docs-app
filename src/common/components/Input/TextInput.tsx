import React from "react";
import { Control, FieldError, useController } from "react-hook-form";
import { colors } from "@styles/colors";
import { responsiveSize } from "@utils/responsiveSize";
import * as RN from "react-native";

interface InputProps extends RN.TextInputProps {
  control?: Control<any>;
  errors?: FieldError;
  isActivePassword?: boolean;
  name: string;
  isRegistrationField?: boolean;
}

const TextInput = ({
  control,
  name,
  errors,
  isActivePassword,
  isRegistrationField,
  ...rest
}: InputProps) => {
  const { field } = useController({
    control,
    name,
  });
  {
    const handleTextChange = (text: string) => {
      let formattedText = text;
      if (isRegistrationField)
        formattedText = text.replace(/[^Z0-9]/g, "");
      field.onChange(formattedText);
    };

    return (
      <RN.TextInput
        {...rest}
        value={field.value}
        onChangeText={handleTextChange}
        secureTextEntry={isActivePassword}
        placeholderTextColor={colors.gray}
        style={{ fontSize: responsiveSize(16) }}
        className="flex-1 font-interMedium text-black h-12 px-4"
      />
    );
  }
};

export default TextInput;
