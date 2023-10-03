import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/AuthContext';
import { createUser } from '../util/Auth';

function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx =useContext(AuthContext)

  const signupHandler =async ({email, password})=>{
    setIsAuthenticating(true)

    try {
        const token =await createUser(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert('Authentication failed!' ,
      'could not log you in. Please check your credentials or try again later!' 
      )
      setIsAuthenticating(false)
      
    }
    
  }

  if (isAuthenticating){
    return <LoadingOverlay message="Creating user..."/>
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;