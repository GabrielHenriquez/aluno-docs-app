import Spacer from "@components/Spacer";
import Button from "@components/Button";
import StatusBar from "@components/StatusBar";
import Text from "@components/Text";
import Contents from "./utils/contents";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import * as RN from "react-native";

export enum OnboardingKey {
  "onboarding1",
  "onboarding2",
}

const Onboarding = ({ onComplete }: { onComplete: VoidFunction }) => {
  const [currentContent, setCurrentContent] = useState<OnboardingKey>(
    OnboardingKey.onboarding1
  );
  const { height } = RN.useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const isFirstOnboarding = currentContent === OnboardingKey.onboarding1;
  const { title, subtitle, labelButton, image } = Contents[currentContent];
  const action = isFirstOnboarding
    ? () => setCurrentContent(OnboardingKey.onboarding2)
    : () => onComplete();

  return (
    <RN.View
      className="flex-1 bg-greenLighter"
      style={{ marginTop: RN.StatusBar.currentHeight }}
    >
      <StatusBar backgroundColor="greenLighter" />
      <RN.View className="mt-4 px-4">
        <Text
          size={30}
          className="text-3xl text-greenDarkest font-interBold text-center"
        >
          {title}
        </Text>
        <Spacer height={14} />
        <Text size={22} className="text-3xl text-greenMedium text-center">
          {subtitle}
        </Text>
      </RN.View>
      <Spacer height={20} />
      <RN.Image
        source={image}
        style={{ width: "100%", height: height * 0.5 }}
      />
      <RN.View style={{ bottom: bottom + 20 }} className="px-6 mt-auto">
        <Button onPress={action}>
          <Text className="text-white  font-interSemiBold">{labelButton}</Text>
        </Button>
      </RN.View>
    </RN.View>
  );
};

export default Onboarding;
