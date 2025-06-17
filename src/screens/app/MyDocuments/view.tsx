import Header from "@components/Header";
import Spacer from "@components/Spacer";
import SearchInput from "@components/SearchInput/view";
import useMyDocumentsViewModel from "./view.model";
import CategoryItem from "@components/CategoryItem";
import DocumentList from "./components/DocumentList";
import { useNavigation } from "@react-navigation/native";
import * as RN from "react-native";

const MyDocuments = () => {
  const { goBack } = useNavigation();
  const VM = useMyDocumentsViewModel();

  return (
    <RN.View className="flex-1 bg-background">
      <Header onPressBack={goBack} title="Meus documentos" />
      <RN.View>
        <RN.FlatList
          horizontal
          data={VM.availableCategories}
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
      <RN.View className="px-4">
        <SearchInput
          searchActive={false}
          searchTerm={VM.searchTerm}
          setSearchTerm={VM.setSearchTerm}
        />
        <Spacer height={24} />
        <DocumentList
          data={VM?.filteredDocuments ?? []}
          onPressItem={() => {}}
        />
      </RN.View>
    </RN.View>
  );
};

export default MyDocuments;
