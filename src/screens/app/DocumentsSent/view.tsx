import React, { useState } from "react";
import Header from "@components/Header";
import Text from "@components/Text";
import Spacer from "@components/Spacer";
import SearchInput from "@components/SearchInput/view";
import IconPDF from "@assets/icons/pdf.svg";
import { ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@styles/colors";
import * as RN from "react-native";

const DocumentsSent = () => {
  const { goBack } = useNavigation();
  const [searchMeta, setSearchMeta] = useState({});
  const [searchActive, setSearchActive] = useState(false);

  const activeFilterStyles: RN.ViewStyle = {
    backgroundColor: colors.greenMedium,
  };

  const inactiveFilterStyles: RN.ViewStyle = {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
  };

  return (
    <RN.View className="flex-1 bg-background">
      <Header onPressBack={goBack} title="Documentos enviados" />

      <RN.View>
        <RN.FlatList
          data={Array(4).fill(null)}
          horizontal
          contentContainerStyle={{
            gap: 10,
            marginTop: 20,
            paddingHorizontal: 16,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <RN.TouchableOpacity
              style={true ? activeFilterStyles : inactiveFilterStyles}
              className="items-center justify-center rounded-lg px-4 py-1.5 "
            >
              <Text
                style={{ color: true ? colors.white : colors.black }}
                size={14}
                className="font-interSemiBold"
              >
                Justificativa
              </Text>
            </RN.TouchableOpacity>
          )}
        />
      </RN.View>

      <Spacer height={25} />

      <RN.View className="px-4">
        <SearchInput
          searchActive={searchActive}
          searchMeta={searchMeta}
          setSearchMeta={setSearchMeta}
        />

        <Spacer height={24} />

        <RN.View>
          <RN.FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
            }}
            data={Array(4).fill(null)}
            renderItem={({ item }) => (
              <RN.TouchableOpacity
                style={{ borderWidth: 1 }}
                className="rounded-lg border-grayLight pl-2.5"
              >
                <RN.View className="gap-0.5 py-1.5">
                  <Text size={18} className="font-interSemiBold">
                    Boletim escolar 2024
                  </Text>

                  <RN.View className="flex-row gap-1.5">
                    <Text size={14} className="font-interMedium">
                      Arquivo:
                    </Text>
                    <Text size={14} className="font-interMedium text-gray">
                      Atestado_RHP_20193.pdf
                    </Text>
                  </RN.View>

                  <RN.View className="flex-row gap-1.5">
                    <Text size={14} className="font-interMedium">
                      Enviado:
                    </Text>
                    <Text size={14} className="font-interMedium text-gray">
                      27/04/2025
                    </Text>
                  </RN.View>

                  <RN.View className="flex-row gap-1.5">
                    <Text size={14} className="font-interMedium">
                      Status:
                    </Text>
                    <Text size={14} className="font-interMedium text-gray">
                      Rejeitado
                    </Text>
                  </RN.View>
                </RN.View>
                <RN.View
                  style={{ backgroundColor: "#DC3545" }}
                  className="h-full px-1.5 rounded-r-lg justify-start absolute top-0 right-0"
                >
                  <RN.View className="pt-2">
                    <ChevronRight color={colors.white} />
                  </RN.View>
                </RN.View>
              </RN.TouchableOpacity>
            )}
          />
        </RN.View>
      </RN.View>
    </RN.View>
  );
};

export default DocumentsSent;
