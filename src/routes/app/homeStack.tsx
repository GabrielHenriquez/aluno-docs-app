import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import DocumentsSent from "@screens/app/DocumentsSent/view";
import Home from "@screens/app/Home/view";
import MyDocuments from "@screens/app/MyDocuments/view";
import SendDocument from "@screens/app/SendDocument/view";


export type AppStackParamList = {
  Home: undefined;
  MyDocuments: undefined;
  SendDocument: undefined;
  DocumentsSent: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyDocuments" component={MyDocuments} />
      <Stack.Screen name="SendDocument" component={SendDocument} />
      <Stack.Screen name="DocumentsSent" component={DocumentsSent} />
    </Stack.Navigator>
  );
};

export default HomeStack;
