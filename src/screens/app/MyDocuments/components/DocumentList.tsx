import React from "react";
import * as RN from "react-native";
import { ChevronRight } from "lucide-react-native"; // ou de onde estiver importando
import { colors } from "@styles/colors";
import { IDocument } from "common/models/document";
import PdfIcon from "@assets/icons/pdf.svg";
import DocxIcon from "@assets/icons/docx.svg";
import ImgIcon from "@assets/icons/img.svg";
import HtmlIcon from "@assets/icons/html.svg";

import Text from "@components/Text";

interface DocumentListProps {
  data: IDocument[];
  onPressItem?: (item: IDocument) => void;
  containerStyle?: RN.ViewStyle;
}

const MetaIcon = {
  pdf: { color: "#df2b2b", icon: PdfIcon },
  docx: { color: "#40AEFD", icon: DocxIcon },
  img: { color: "#56C963", icon: ImgIcon },
  image: { color: "#56C963", icon: ImgIcon },
  html: { color: "#fc9338", icon: HtmlIcon },
};

const DocumentList: React.FC<DocumentListProps> = ({
  data,
  onPressItem,
  containerStyle,
}) => {
  return (
    <RN.View style={containerStyle}>
      <RN.FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        data={data}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <RN.View>
            <Text className="text-center text-gray font-interMedium mt-2.5">
              Nenhum documento encontrado.
            </Text>
          </RN.View>
        )}
        renderItem={({ item }) => {
          const { icon: IconComponent, color } = MetaIcon[item?.type];

          return (
            <RN.TouchableOpacity
              className="rounded-lg border-hairline border-gray px-2 py-2"
              onPress={() => onPressItem?.(item)}
            >
              <RN.View style={{ gap: 1 }}>
                <RN.View className="flex-row justify-between">
                  <Text
                    size={18}
                    className="font-interSemiBold text-black pl-1"
                  >
                    {item?.title}
                  </Text>
                  <ChevronRight color={colors.grayDark} />
                </RN.View>

                <Text
                  size={14}
                  style={{ maxWidth: "80%" }}
                  className="font-interMedium text-grayMedium pl-1"
                >
                  {item?.description}
                </Text>

                <Text size={12} className="font-interMedium text-gray pl-1">
                  {item?.date}
                </Text>
              </RN.View>

              <RN.View
                style={{
                  borderWidth: 1,
                  borderColor: color,
                }}
                className="rounded-tl-lg rounded-br-lg justify-center items-center px-1.5 py-1.5 absolute bottom-0 right-0"
              >
                <IconComponent />
              </RN.View>
            </RN.TouchableOpacity>
          );
        }}
      />
    </RN.View>
  );
};

export default DocumentList;
