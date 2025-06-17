import "./src/common/mocks/mock-axios";
import { JSX, useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { getOnboardingAccess, setOnboardingAccess } from "@services/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@stores/auth/authStore";
import Routes from "@routes/index";
import SplashScreen from "@screens/intro/Splash/view";
import Onboarding from "@screens/intro/Onboarding/view";
import "./src/common/styles/global.css";
import * as ExpoFont from "@expo-google-fonts/inter";

enum AppState {
  Loading,
  Splash,
  Onboarding,
  Main,
}

export default function App() {
  const [fontsLoaded] = ExpoFont.useFonts({
    Inter_400Regular: ExpoFont.Inter_400Regular,
    Inter_500Medium: ExpoFont.Inter_500Medium,
    Inter_600SemiBold: ExpoFont.Inter_600SemiBold,
    Inter_700Bold: ExpoFont.Inter_700Bold,
  });

  const queryClient = new QueryClient();

  const [appState, setAppState] = useState<AppState>(AppState.Loading);
  const { loadUser } = useAuthStore();

  const handleOnboardingCheck = () => {
    loadUser();
    const timer = setTimeout(() => {
      const hasCompletedOnboarding = getOnboardingAccess();
      setAppState(hasCompletedOnboarding ? AppState.Main : AppState.Onboarding);
    }, 3000);

    return () => clearTimeout(timer);
  };

  const handleOnboardingComplete = () => {
    setOnboardingAccess();
    setAppState(AppState.Main);
  };

  const checkFontLoading = () => {
    if (fontsLoaded) {
      setAppState(AppState.Splash);
      return handleOnboardingCheck();
    }
  };

  useEffect(() => checkFontLoading(), [fontsLoaded]);

  const renderContent = () => {
    const stateComponents: Record<AppState, JSX.Element> = {
      [AppState.Loading]: <SplashScreen />,
      [AppState.Splash]: <SplashScreen />,
      [AppState.Onboarding]: (
        <Onboarding onComplete={handleOnboardingComplete} />
      ),
      [AppState.Main]: (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <BottomSheetModalProvider>
              <KeyboardProvider>
                <QueryClientProvider client={queryClient}>
                  <Routes />
                </QueryClientProvider>
              </KeyboardProvider>
            </BottomSheetModalProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      ),
    };

    return !fontsLoaded ? <SplashScreen /> : stateComponents[appState];
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-greenLighter">{renderContent()}</View>
    </SafeAreaProvider>
  );
}
