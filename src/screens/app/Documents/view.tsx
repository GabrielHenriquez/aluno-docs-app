import Header from "@components/Header";
import Spacer from "@components/Spacer";
import SearchInput from "@components/SearchInput/view";
import CategoryItem from "@components/CategoryItem";
import DocumentList from "@components/DocumentList";
import Info from "@assets/icons/info.svg";
import Modal from "@components/Modal";
import InfoLogo from "@assets/images/modal/info.svg";
import Text from "@components/Text";
import Button from "@components/Button";
import LoadingDocuments from "@components/LoadingDocuments";
import DocumentViewerModal from "@components/DocumentViewerModal";
import useDocumentsViewModel from "@hooks/useDocumentsViewModel";
import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useUploadedDocuments } from "@hooks/useUploadedDocuments";
import { useAvailableDocuments } from "@hooks/useAvailableDocuments";
import { mockDB } from "@mocks/mock-db";
import { contentModal } from "./utils/modalContent";
import {
  IDocument,
  IUploadedDocument,
  DocumentListType,
} from "@models/document";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "@routes/app/homeStack";
import * as RN from "react-native";

interface DocumentsViewProps<T extends IDocument | IUploadedDocument> {
  title: string;
  listType: DocumentListType;
  useDocumentsHook: () => UseQueryResult<T[], Error>;
  categories:
    | typeof mockDB.documentCategories.upload
    | typeof mockDB.documentCategories.available;
}

const DocumentsView = <T extends IDocument | IUploadedDocument>({
  title,
  listType,
  useDocumentsHook,
  categories,
}: DocumentsViewProps<T>) => {
  const { navigate, goBack } = useNavigation<AppNavigationProp>();
  const VM = useDocumentsViewModel<T>({
    useDocumentsHook,
    categories,
    listType,
  });
  const [showModalInfo, setShowModalInfo] = useState(false);
  const showStatusLegend = listType === DocumentListType.UploadedDocument;

  useEffect(() => {
    const backAction = () => {
      if (listType === DocumentListType.Document) {
        goBack();
        return true;
      }
      navigate("Home");
      return true;
    };
    const backHandler = RN.BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <RN.View className="flex-1 bg-background">
      <Header
        onPressBack={VM.handleBack}
        title={title}
        icon={showStatusLegend ? <Info /> : undefined}
        onPressSecondary={
          showStatusLegend ? () => setShowModalInfo(true) : undefined
        }
        hasButtonSecondary={showStatusLegend}
      />
      <RN.View>
        <RN.FlatList
          horizontal
          data={VM.documentCategories}
          keyExtractor={([key]) => key}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const [key, label] = item;
            const isSelected = key === VM?.selectedCategory;
            return (
              <CategoryItem
                label={label}
                selected={isSelected}
                onPress={() => VM?.setSelectedCategory(key)}
              />
            );
          }}
          contentContainerStyle={{
            gap: 10,
            marginTop: 20,
            paddingHorizontal: 16,
          }}
        />
      </RN.View>
      <Spacer height={25} />
      <RN.View className="flex-1 px-4">
        <SearchInput
          searchTerm={VM.searchTerm}
          setSearchTerm={VM.setSearchTerm}
        />
        <Spacer height={12} />
        {VM?.isLoading ? (
          <LoadingDocuments />
        ) : (
          <DocumentList<T>
            isRefetchingList={false}
            refetch={VM?.refetch}
            listType={listType}
            data={VM.filteredDocuments}
            onPressItem={VM.handleDocumentPress}
            containerStyle={{ flex: 1 }}
          />
        )}
      </RN.View>

      <DocumentViewerModal
        modalVisible={!!VM?.documentSelected}
        type={VM?.documentSelected?.type!}
        uri={VM.documentSelected?.uri!}
        onClose={VM?.onCloseDocumentViewer}
      />

      {showStatusLegend && (
        <Modal.Root>
          <Modal.Content visible={showModalInfo}>
            <Modal.Logo>
              <InfoLogo width={90} height={90} />
            </Modal.Logo>
            <Modal.Title>Legenda de Status</Modal.Title>
            <RN.View className="gap-1">
              {contentModal.map(({ label, description, color }) => (
                <RN.View key={label} className="flex-row gap-2 items-center">
                  <RN.View
                    className="size-4 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <Text className="font-interSemiBold text-black">
                    {label}:
                  </Text>
                  <Text className="font-interMedium text-grayDark">
                    {description}
                  </Text>
                </RN.View>
              ))}
            </RN.View>
            <Button
              styleRest={{ height: 40, marginTop: 8 }}
              onPress={() => setShowModalInfo(false)}
            >
              <Text className="text-white font-interSemiBold">Entendi</Text>
            </Button>
          </Modal.Content>
        </Modal.Root>
      )}
    </RN.View>
  );
};

export const DocumentsSent = () => (
  <DocumentsView<IUploadedDocument>
    title="Documentos enviados"
    listType={DocumentListType.UploadedDocument}
    useDocumentsHook={useUploadedDocuments}
    categories={mockDB.documentCategories.upload}
  />
);

export const MyDocuments = () => (
  <DocumentsView<IDocument>
    title="Meus documentos"
    listType={DocumentListType.Document}
    useDocumentsHook={useAvailableDocuments}
    categories={mockDB.documentCategories.available}
  />
);

export default DocumentsView;
