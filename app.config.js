export default {
  expo: {
    name: "Aluno Docs",
    slug: "aluno-docs",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      resizeMode: "cover",
      backgroundColor: "#1B5E20",
      image: "./assets/splash.png",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.alunodocs.app",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "d84eb78c-61cb-4fe5-9013-416aa021d8db",
      },
    },
    owner: "gabrielrick2941",
    plugins: [
      [
        "expo-secure-store",
        {
          configureAndroidBackup: false,
          faceIDPermission:
            "Allow Aluno Docs to access your Face ID biometric data.",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      "@config-plugins/react-native-blob-util",
      "@config-plugins/react-native-pdf",
    ],
  },
};
