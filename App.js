import { StatusBar } from 'expo-status-bar';
import Home from './screens/Home';
import Login from './screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


