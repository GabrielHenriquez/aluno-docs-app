import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

export const ZoomableImage = ({ uri }: { uri: string }) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(1, Math.min(e.scale, 4));
      focalX.value = e.focalX - width / 2;
      focalY.value = e.focalY - height / 2;
    })
    .onEnd(() => {
      scale.value = withTiming(1, { duration: 200 });
      focalX.value = withTiming(0, { duration: 200 });
      focalY.value = withTiming(0, { duration: 200 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
    ],
  }));

  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.Image
        source={{ uri }}
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.75,
    width: width,
  },
});
