/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import {ActivityIndicator, Alert, Text,ToastAndroid,View,StatusBar} from 'react-native'
import Categories from './Components/Categories';
import Header from './Components/Header';
import TrendingBooks from './Components/TrendingBooks';
import RootNavigation from './Screen/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './Screen/FirstScreen';
import { useEffect } from 'react';
import Home from './Components/Home';
import {AuthContext} from './Components/Context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UploadBook from './Components/UploadBook';
import BookDesc from './Components/BookDesc';
import Navigation from './Navigation';
import DrawerNavigator from './DrawerNavigation';
import {AuthContext1}  from './Components/AuthProvider'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



function App ({navigation}){
  const [isLoading,setLoading]=React.useState(true);
  // const[userToken,setUserToken]=React.useState(null);
  const [user,setUser] =useState(null);
  const [initializing,setInitializing]=useState(true)
  const[loggedIn,setLoggedIn]=useState(false)
  const [e,setE]=useState('')
  // const {user}=React.useContext(AuthContext1)


  const[users,setUsers]=useState('')

  const authContext =React.useMemo(()=>({
    user,
    setUser,
    login:async(email,password)=>{
      if(email==null && password==null){
        Alert.alert('Empty')
       }
       else{
        try{
          ToastAndroid.show("Logging....", ToastAndroid.SHORT);
          await auth().signInWithEmailAndPassword(email,password)
          ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
       
      }catch(error ) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert('Error','That email address is already in use!')
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('Error','That email address is invalid!')
        }
        if (error.code === 'auth/wrong-password') {
          console.log('That email address is invalid!');
          Alert.alert('Error','Invalid Password')
        }
       
       
        
    
       
      }

       }
   
      
      },
    register:async(email,password)=>{
      if(email==null && password==null){
        Alert.alert('Empty')
       }
       else{
        try{
          ToastAndroid.show("Signing Up in Progress..", ToastAndroid.SHORT);
            await auth().createUserWithEmailAndPassword(email,password)
            ToastAndroid.show("Signed Up Successful", ToastAndroid.SHORT);
        }catch(error ) {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Alert.alert('Error','That email address is already in use!')
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Alert.alert('Error','That email address is invalid!')
          }
          if (error.code === 'auth/wrong-password') {
            console.log('That email address is invalid!');
            Alert.alert('Error','Invalid Password')
          }
          if (error.code === 'auth/weak-password') {
            console.log('The given password is invalid.Password should be at least 6 characters ');
            Alert.alert('Error','The given password is invalid.Password should be at least 6 characters ')
          }
         
         
          
      
         
        }

       }
       
    },
    logout:async(email,password)=>{
        try{
            await auth().signOut()
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        }catch(e){
            console.log(e);
        }
    },
    googleLogin: async()=>{
      try{
        const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      ToastAndroid.show("Login in Progress...", ToastAndroid.SHORT);
    
      // Sign-in the user with the credential
     await  auth().signInWithCredential(googleCredential);
     ToastAndroid.show("Login Successful", ToastAndroid.SHORT, ToastAndroid.CENTER);
   
   
      }catch (error) {
       console.log(error)
      }
  
  

      
    },
    googleLogin2: async()=>{
      try{
        const { idToken } = await GoogleSignin.signInSilently();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      ToastAndroid.show("Login in Progress...", ToastAndroid.SHORT);
    
      // Sign-in the user with the credential
     await  auth().signInWithCredential(googleCredential);
     ToastAndroid.show("Login Successful", ToastAndroid.SHORT, ToastAndroid.CENTER);
   
   
      }catch (error) {
       console.log(error)
      }
  
  

      
    },
  }),[])
  const onAuthStateChanged=(user)=>{
    setUser(user);
   
 

  }


  useEffect(()=>{
    // setTimeout(()=>{
    //   if (isLoading){
    //     return(
    //       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    //         <ActivityIndicator size='large' color="white"/>
    //       </View>
    //     )
    //   }

    // },1000)

    // GoogleSignin.configure({
    //   webClientId: "1013139955650-e60g0m8bdbe76c2dk7m6dsfsjst7mlrk.apps.googleusercontent.com",
    // });
    GoogleSignin.configure({
      webClientId: "1013139955650-e60g0m8bdbe76c2dk7m6dsfsjst7mlrk.apps.googleusercontent.com", 
      offlineAccess: true, 
      hostedDomain: '', 
      forceConsentPrompt: true, 
    });
    const subscriber =auth().onAuthStateChanged(onAuthStateChanged);
return subscriber;  
 
   
  },[])

  



  return(<>
    <StatusBar translucent backgroundColor='#0163D2' color='white' barStyle="dark-content"/>

    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {user? 
      (
      <DrawerNavigator/>
      ):
       <RootNavigation/>
      
    
    }

    
     
     
    
    </NavigationContainer>
    </AuthContext.Provider>
    </>
    
  )
}
export default App


