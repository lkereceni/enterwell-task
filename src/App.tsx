/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './(screens)/HomeScreen';
import { Colors } from './constants/colors';
import ChatScreen from './(screens)/ChatScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
          headerTintColor: Colors.textPrimary,
          headerTitleAlign: "center",
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: "MESSAGES",
        }}/>
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "CHAT" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
