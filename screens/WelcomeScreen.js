import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/AuthContext';

function WelcomeScreen() {
  const authCtx= useContext(AuthContext)
  const token =authCtx.token

  const [message, setMessage] = useState('')


  useEffect(() => {
    axios.get('https://react-native-course-933f3-default-rtdb.firebaseio.com/message.json?auth=' + token)
    .then((response)=>{
      setMessage(response.data)
    })
    
  }, [token])
  

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});