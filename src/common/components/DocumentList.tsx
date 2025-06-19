import React from "react";
import PdfIcon from "@assets/icons/pdf.svg";
import DocxIcon from "@assets/icons/docx.svg";
import ImgIcon from "@assets/icons/img.svg";
import HtmlIcon from "@assets/icons/html.svg";
import Text from "@components/Text";
import data from "@mocks/data.json";
import { ChevronRight } from "lucide-react-native";
import { colors } from "@styles/colors";
import { IDocument, IUploadedDocument } from "@models/document";
import { formatDateToBR, formatDateISOToBR } from "@utils/formatDate";
import { compressFileName } from "@utils/compressFileName";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import * as RN from "react-native";

interface DocumentListProps<T extends IDocument | IUploadedDocument> {
  data: T[];
  onPressItem?: (item: T) => void;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<T[], Error>>;
  containerStyle?: RN.ViewStyle;
  listType: "document" | "uploadedDocument";
  isRefetchingList: boolean;
}

interface InfoRowProps {
  label: string;
  value: string;
  valueColor?: string;
}

const { statusConfig } = data;
const { colors: statusColor, labels } = statusConfig;

const MetaIcon = {
  pdf: { color: "#c52828", icon: PdfIcon },
  docx: { color: "#2f92d8", icon: DocxIcon },
  img: { color: "#39b147", icon: ImgIcon },
  image: { color: "#39b147", icon: ImgIcon },
  html: { color: "#cf7729", icon: HtmlIcon },
};

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  valueColor = "text-gray",
}) => (
  <RN.View className="flex-row gap-1.5">
    <Text size={14} className="font-interMedium">
      {label}:
    </Text>
    <Text size={14} className={`font-interMedium ${valueColor}`}>
      {value}
    </Text>
  </RN.View>
);

const DocumentList = <T extends IDocument | IUploadedDocument>({
  data,
  onPressItem,
  containerStyle,
  isRefetchingList,
  refetch,
  listType,
}: DocumentListProps<T>) => {
  return (
    <RN.View style={containerStyle}>
      <RN.FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingTop: 12, paddingBottom: 100 }}
        keyExtractor={(item) => item?.id}
        refreshing={isRefetchingList}
        onRefresh={() => refetch}
        ListEmptyComponent={() => (
          <RN.View>
            <Text className="text-center text-gray font-interMedium mt-2.5">
              Nenhum documento encontrado.
            </Text>
          </RN.View>
        )}
        renderItem={({ item }) => {
          if (listType === "document") {
            const typedItem = item as IDocument;
            const { icon: IconComponent, color } = MetaIcon[typedItem.type];

            return (
              <RN.TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: colors.gray3,
                  elevation: 2,
                }}
                className="rounded-lg overflow-hidden bg-white p-2"
                onPress={() => onPressItem?.(item)}
              >
                <RN.View style={{ gap: 1 }}>
                  <RN.View className="flex-row justify-between">
                    <Text
                      size={18}
                      className="font-interSemiBold text-black pl-1"
                    >
                      {typedItem.title}
                    </Text>
                    <ChevronRight color={colors.grayDark} size={26} />
                  </RN.View>
                  <Text
                    size={14}
                    style={{ maxWidth: "80%" }}
                    className="font-interMedium text-grayMedium pl-1"
                  >
                    {typedItem.description}
                  </Text>
                  <Text size={12} className="font-interMedium text-gray pl-1">
                    {formatDateToBR(typedItem.date)}
                  </Text>
                </RN.View>
                <RN.View
                  style={{
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 0.5,
                    borderBottomWidth: 1,
                    borderColor: color,
                  }}
                  className="rounded-tl-lg rounded-br-lg justify-center items-center px-1.5 py-1.5 absolute bottom-0 right-0"
                >
                  <IconComponent width={24} height={24} />
                </RN.View>
              </RN.TouchableOpacity>
            );
          } else {
            const typedItem = item as IUploadedDocument;

            return (
              <RN.TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: colors.gray3,
                  elevation: 2,
                }}
                className="rounded-lg overflow-hidden bg-white"
                onPress={() => onPressItem?.(item)}
              >
                <RN.View style={{ gap: 1 }} className="p-2 pl-2.5">
                  <Text size={18} className="font-interSemiBold">
                    {typedItem.title}
                  </Text>
                  <InfoRow
                    label="Arquivo"
                    value={compressFileName(typedItem?.file?.name!)}
                  />
                  <InfoRow
                    label="Enviado"
                    value={formatDateISOToBR(typedItem.uploadDate)}
                    valueColor="text-gray4"
                  />
                  <InfoRow
                    label="Status"
                    value={labels[typedItem.status]}
                    valueColor="text-gray4"
                  />
                </RN.View>
                <RN.View
                  style={{ backgroundColor: statusColor[typedItem.status] }}
                  className="h-full px-1.5 rounded-r-lg justify-start absolute top-0 right-0"
                >
                  <RN.View className="pt-2">
                    <ChevronRight color={colors.white} size={28} />
                  </RN.View>
                </RN.View>
              </RN.TouchableOpacity>
            );
          }
        }}
      />
    </RN.View>
  );
};

export default DocumentList;
