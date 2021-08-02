import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';


import FirstScreen from './FirstScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import TrendingBooks from '../Components/TrendingBooks';
import BookDesc from '../Components/BookDesc';
import UploadedBookModal from '../Components/BookUploadedModal';
import UploadBook from '../Components/UploadBook';
import Search from '../Components/Search';
import Home from '../Components/Home';

const Stack =createStackNavigator();

const RootNavigation=({navigation})=>{
    return(
  <Stack.Navigator headerMode='none'>
      <Stack.Screen name="First" component={FirstScreen}/>
      <Stack.Screen name="SignInScreen" component={SignInScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="Home" component={Home}/>
     
      
  </Stack.Navigator>)
}

export default RootNavigation;