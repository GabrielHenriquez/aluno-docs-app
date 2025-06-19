import * as Native from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const LoadingDocuments = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <Native.View className="flex-1">
      <Native.FlatList
        showsVerticalScrollIndicator={false}
        data={Array(6).fill(null)}
        contentContainerClassName="gap-3.5 mt-4"
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => (
          <ShimmerPlaceholder
            height={94}
            delay={0}
            duration={800}
            shimmerColors={["#e0e0e0", "#d3d3d3a7", "#cfcfcf62"]}
            location={[0.3, 0.5, 0.7]}
            style={{ width: "100%", borderRadius: 8 }}
            shimmerStyle={{ borderRadius: 8 }}
          />
        )}
      />
    </Native.View>
  );
};

export default LoadingDocuments;
