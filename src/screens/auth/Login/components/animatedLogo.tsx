import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Logo from "@assets/images/logo.svg";

const AnimatedLogo = () => {
  const translateY = useSharedValue(-300);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 1200,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(1, { duration: 1200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle]}>
      <Logo width={200} height={200} />
    </Animated.View>
  );
};

export default AnimatedLogo;
