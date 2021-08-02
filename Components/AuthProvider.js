import React, {createContext,useState} from 'react';
import auth from '@react-native-firebase/auth';


export const AuthContext1 =React.createContext();


export const AuthProvider =({children})=>{
    const [user,setUser] =useState(null);

    return(
        <AuthContext1.Provider
        value={{
            user,
            setUser,
            login:async(email,password)=>{
                try{
                    await auth().signInWithEmailAndPassword(email,password)
                }catch(e){
                    console.log(e);
                }
            },
            register:async(email,password)=>{
                try{
                    await auth().createUserWithEmailAndPassword(email,password)
                }catch(e){
                    console.log(e);
                }
            },
            logout:async(email,password)=>{
                try{
                    await auth().signOut()
                }catch(e){
                    console.log(e);
                }
            },


        }}
        
        
        
        >
            {children}
        </AuthContext1.Provider>
    )


}
// export const useAuth=()=>React.useContext(AuthContext1)
// const subscriber =auth().onAuthStateChanged(onAuthStateChanged);
// return subscriber;
// const [initializing,setInitializing]=useState(true)
// const onAuthStateChanged=(user)=>{
//     // setUser(user);
//     console.log('User')
 

//   }


// previous app.js
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

//  import React,{useState} from 'react';
//  import {ActivityIndicator, Alert, Text,View} from 'react-native'
//  import Categories from './Components/Categories';
//  import Header from './Components/Header';
//  import TrendingBooks from './Components/TrendingBooks';
//  import RootNavigation from './Screen/RootNavigation';
//  import { NavigationContainer } from '@react-navigation/native';
//  import { createStackNavigator } from '@react-navigation/stack';
//  import FirstScreen from './Screen/FirstScreen';
//  import { useEffect } from 'react';
//  import Home from './Components/Home';
//  import {AuthContext} from './Components/Context'
//  import AsyncStorage from '@react-native-async-storage/async-storage';
//  import UploadBook from './Components/UploadBook';
//  import BookDesc from './Components/BookDesc';
//  import Navigation from './Navigation';
//  import DrawerNavigator from './DrawerNavigation';
//  import {AuthContext1}  from './Components/AuthProvider'
//  import auth from '@react-native-firebase/auth';
 
 
//  function App ({navigation}){
//    // const [isLoading,setLoading]=React.useState(true);
//    // const[userToken,setUserToken]=React.useState(null);
//    const [user,setUser] =useState(null);
//    const [initializing,setInitializing]=useState(true)
//    // const {user}=React.useContext(AuthContext1)
 
 
//    const initialLoginState ={
//      isLoading:true,
//      userName:null,
//      userToken:null,
 
//    };
 
//    const loginReducer =(prevState,action)=>{
//      switch(action.type){
//        case 'RETRIVE_TOKEN':
//          return{
//            ...prevState,
//            userToken:action.token,
//            isLoading:false,
//          };
//          case 'LOGIN':
//            return{
//              ...prevState,
//              userToken:action.token,
//              userName:action.id,
//              isLoading:false,
//            };
//            case 'LOGOUT':
//              return{
//                ...prevState,
//                userToken:null,
//                userName:null,
//                isLoading:false,
//              };
//              case 'REGISTER':
//                return{
//                  ...prevState,
//                  userToken:action.token,
//                  userName:action.id,
//                  isLoading:false,
//                };
 
//      }
//    }
 
//    const [loginState,dispatch]=React.useReducer(loginReducer,initialLoginState)
 
//    const authContext =React.useMemo(()=>({
//       signIn: async(userName,password)=>{
//        // setUserToken('fgh');
//        // setLoading(false)
//        let userToken;
//        userToken=null;
//        if (userName ==="user" && password==="pass"){
        
//          try {
//            userToken="jjjjjj";
//            await AsyncStorage.setItem('userToken', userToken)
//          } catch (e){
//            console.log(e)
//          }
//        }
//        dispatch({type:'LOGIN',id:userName,token:userToken})
 
//      },
//      signOut: async()=>{
//        // setUserToken(null);
//        // setLoading(false)\
//        try {
        
//          await AsyncStorage.removeItem('userToken')
//        } catch (e){
//          console.log(e)
//        }
//        dispatch({type:'LOGOUT'})
 
//      },
//      signUp:()=>{
//        setUserToken('fgh');
//        setLoading(false)
 
//      },
 
//      user,
//      setUser,
//      login:async(email,password)=>{
//          try{
//              await auth().signInWithEmailAndPassword(email,password)
//              Alert.alert(user.email)
//              console.log(user.email)
//          }catch(e){
//              console.log(e);
//          }
//      },
//      register:async(email,password)=>{
//          try{
//              await auth().createUserWithEmailAndPassword(email,password)
//          }catch(e){
//              console.log(e);
//          }
//      },
//      logout:async(email,password)=>{
//          try{
//              await auth().signOut()
//          }catch(e){
//              console.log(e);
//          }
//      },
//    }),[])
//    const onAuthStateChanged=(user)=>{
//      setUser(user);
    
  
 
//    }
 
 
//    useEffect(()=>{
//      const subscriber =auth().onAuthStateChanged(onAuthStateChanged);
//  return subscriber;  
//      // setTimeout(async()=>{
//      //   let userToken;
//      //   userToken:null;
//      //   try {
//      //     userToken=
//      //     await AsyncStorage.getItem('userToken')
//      //   } catch (e){
//      //     console.log(e)
//      //   }
//      //   dispatch({type:'RETRIVE_TOKEN',token:userToken})
//      // },1000);
//    },[])
 
//    // if (loginState.isLoading){
//    //   return(
//    //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//    //       <ActivityIndicator size='large' color="white"/>
//    //     </View>
//    //   )
//    // }
 
 
 
//    return(
   
 
//      <AuthContext.Provider value={authContext}>
//      <NavigationContainer>
//        {user? 
//        (
//        <DrawerNavigator/>
//        ):
//         <RootNavigation/>
       
     
//      }
 
     
      
      
     
//      </NavigationContainer>
//      </AuthContext.Provider>
     
//    )
//  }
//  export default App
 
