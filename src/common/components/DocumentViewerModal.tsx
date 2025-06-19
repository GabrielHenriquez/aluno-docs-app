import React, { useState, useEffect } from "react";
import Text from "./Text";
import Button from "./Button";
import Pdf from "react-native-pdf";
import Spacer from "./Spacer";
import { WebView } from "react-native-webview";
import { viewDocument } from "@react-native-documents/viewer";
import { FileTypes } from "@models/document";
import { ZoomableImage } from "./ZoomableImage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNetworkStatus } from "@hooks/useNetworkStatus";
import { WifiOff } from "lucide-react-native";
import { colors } from "@styles/colors";
import * as RN from "react-native";
import * as FileSystem from "expo-file-system";

interface IDocumentViewerProps {
  type: FileTypes;
  uri: string;
  modalVisible: boolean;
  onClose: VoidFunction;
}

export default function DocumentViewerModal({
  type,
  uri,
  modalVisible,
  onClose,
}: IDocumentViewerProps) {
  const isConnected = useNetworkStatus();
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const { height } = RN.useWindowDimensions();

  const isHttp = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://");
  const isFile = (url: string) => url.startsWith("file://");
  const isValidUri = (url: string) => isHttp(url) || isFile(url);

  useEffect(() => {
    if (modalVisible) {
      prepareDocument();
    }
  }, [modalVisible, uri]);

  useEffect(() => {
    if (type === "html" && localUri) {
      loadHtmlContent(localUri);
    }
  }, [type, localUri]);

  const prepareDocument = async () => {
    setLocalUri(null);
    setHtmlContent(null);

    if (!isValidUri(uri)) return;

    const fileName =
      uri.split("/").pop()?.split("?")[0] || `file_${Date.now()}`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        setLocalUri(fileInfo.uri);
        return;
      }

      if (isHttp(uri)) {
        if (type === "html") {
          const response = await fetch(uri);
          const html = await response.text();
          await FileSystem.writeAsStringAsync(fileUri, html, {
            encoding: FileSystem.EncodingType.UTF8,
          });
        } else {
          await FileSystem.downloadAsync(uri, fileUri);
        }
        setLocalUri(fileUri);
      }

      if (isFile(uri)) {
        setLocalUri(uri);
      }
    } catch (err) {
      console.error("Erro ao preparar o documento:", err);
    }
  };

  const loadHtmlContent = async (path: string) => {
    try {
      const content = await FileSystem.readAsStringAsync(path, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      setHtmlContent(content);
    } catch (err) {
      console.error("Erro ao ler conteúdo HTML:", err);
    }
  };

  const openExternalDocx = async () => {
    if (localUri) {
      try {
        await viewDocument({
          uri: localUri,
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          headerTitle: "Visualizar Documento",
        });
      } catch (error) {
        console.error(error);
        alert(
          "Nenhum aplicativo compatível encontrado.\nPor favor, instale um app como One Read, Google Docs ou outro leitor de documentos para abrir este arquivo."
        );
      } finally {
        onClose();
      }
    }
  };

  const renderHtml = () => (
    <WebView
      originWhitelist={["*"]}
      source={{ html: htmlContent! }}
      style={{ flex: 1 }}
    />
  );

  const renderPdf = () => (
    <Pdf source={{ uri: localUri! }} style={{ flex: 1 }} />
  );

  const renderDocxOnline = () => (
    <WebView
      source={{
        uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
          uri
        )}`,
      }}
      style={{ flex: 1 }}
    />
  );

  const renderDocxLocal = () => (
    <RN.View style={{ padding: 20 }}>
      {!isConnected && (
        <Text size={18} className="font-semibold text-redDark mb-4 ">
          <WifiOff color={colors.redDark} size={20} /> {" "} Parece que você está
          offline no momento. Não foi possível carregar o documento online.
        </Text>
      )}

      <Text size={18} className="font-semibold">
        A visualização de arquivos DOCX não é suportada neste app. Para abrir o
        documento, toque no botão abaixo e escolha um app instalado no seu
        dispositivo.
      </Text>
      <Spacer height={20} />
      <Button onPress={openExternalDocx}>
        <Text size={18} className="font-interSemiBold text-white">
          Abrir arquivo
        </Text>
      </Button>
    </RN.View>
  );

  const renderFallback = (msg: string) => (
    <RN.View style={{ padding: 20 }}>
      <Text className="mt-3 text-center font-interSemiBold">{msg}</Text>
    </RN.View>
  );

  const renderContent = () => {
    if (!uri || !type || !isValidUri(uri)) {
      return renderFallback("Arquivo não encontrado ou URI inválida.");
    }

    switch (type) {
      case "html":
        return htmlContent
          ? renderHtml()
          : renderFallback("Carregando conteúdo HTML...");
      case "pdf":
        return localUri ? renderPdf() : renderFallback("Carregando PDF...");
      case "image":
        return <ZoomableImage uri={uri} />;
      case "docx":
        if (isHttp(uri) && isConnected) return renderDocxOnline();
        return localUri
          ? renderDocxLocal()
          : renderFallback("Carregando DOCX...");
      default:
        return renderFallback("Tipo de arquivo não suportado.");
    }
  };

  return (
    <RN.Modal
      transparent
      visible={modalVisible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RN.View
          style={{
            height: height + (RN.StatusBar.currentHeight || 0),
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <RN.View className="flex-1 mt-40 bg-background">
            <RN.Pressable
              onPress={onClose}
              className="p-3 bg-grayLighter border-b-gray3 items-center border-b-2"
            >
              <Text size={22} className="font-interBold">
                Fechar
              </Text>
            </RN.Pressable>

            {renderContent()}
          </RN.View>
        </RN.View>
      </GestureHandlerRootView>
    </RN.Modal>
  );
}
