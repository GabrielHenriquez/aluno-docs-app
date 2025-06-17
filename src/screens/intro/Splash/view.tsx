import { Animated, View } from "react-native";
import React, { useEffect, useRef } from "react";
import Logo from "@assets/images/logo.svg";

const SplashScreen = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <View className="flex-1  bg-greenDark justify-center items-center">
      <Animated.View style={{ opacity }}>
        <Logo width={220} height={220} />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
