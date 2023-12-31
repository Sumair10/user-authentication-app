import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/AuthContext';
import { login } from '../util/Auth';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx =useContext(AuthContext)

  const loginHandler =async ({email, password})=>{
    setIsAuthenticating(true)
    try {
      const token =await login(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert('Authentication failed!' ,
      'could not log you in. Please check your credentials or try again later!' 
      )
      setIsAuthenticating(false)
    }
    
  }

  if (isAuthenticating){
    return <LoadingOverlay message="Logging you in..."/>
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;