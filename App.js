import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/AuthContext';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from './components/ui/LoadingOverlay';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {

  const authCtx = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({ tintColor }) => (<IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout} />)
      }} />
    </Stack.Navigator>
  );
}

function Navigation() {

  const authCtx = useContext(AuthContext)

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

const Root = () => {

  const [isTryingToLigin, setIsTryingToLigin] = useState(true)


  const authCtx = useContext(AuthContext)

  useEffect(() => {
    async function fetchToken() {
      const storedoken = await AsyncStorage.getItem('token')
      console.log('sss')
      if (storedoken) {
        authCtx.authenticate(storedoken)
      }
      setIsTryingToLigin(false)
    }
    fetchToken()
  }, [])

  if(isTryingToLigin){
    return <LoadingOverlay/>
  }

  return <Navigation />
}

export default function App() {


  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}