import React from 'react';
import {ActivityIndicator, Text,View} from 'react-native'
import Categories from './Components/Categories';
import Header from './Components/Header';
import TrendingBooks from './Components/TrendingBooks';
import RootNavigation from './Screen/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Home';
import BookDesc from './Components/BookDesc';
import UploadBook from './Components/UploadBook';
import PDFExample from './Components/Pdfexample';
import Search from './Components/Search';
import BookList from './Components/BookList';
import {Drawer} from './Components/Drawer';
import TopAuthor from './Components/TopAuthors';
import AllBooks from './Components/AllBook';
import EachCategory from './Components/EachCategory';

// const screens={
//   Home:{
//     screen:Home,
//     navigationOptions:{
      
//     }
//   },
//   BookDesc:{
//     screen:BookDesc,
//     navigationOptions:{
      
//     }
//   },
//   Pdf:{
//     screen:PDFExample,
//     navigationOptions:{
      
//     }
//   },
//   Search:{
//     screen:Search,
//     navigationOptions:{
      
//     }
//   },
//   BookList:{
//     screen:BookList,
//     navigationOptions:{
      
//     }
//   },
  
  

// }
const home=createStackNavigator();

export const homeNav=()=>{
  return(
    <home.Navigator>
      <home.Screen name="Home" component={Home} options={({navigation})=>{return{
        headerTitle:()=><Header navigation={navigation}/>
      }
  
    }
   
        } />
    </home.Navigator>
  )

}

const stack =createStackNavigator();

const Navigation=({navigation})=>{
    return(
  <stack.Navigator initialRouteName='Home'
  screenOptions={{
    gestureEnabled: true,
    headerStyle: {
      backgroundColor: 'white',
      
    },
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerTintColor: 'black',
    headerBackTitleVisible: false
    
  }}>
      {/* <stack.Screen name="Home" component={Home} options={({navigation})=>{return{
        headerTitle:()=><Header navigation={navigation}/>
      }}}/> */}
      <stack.Screen name="Categories" component={Categories}/>
      <stack.Screen name="TrendingBooks" component={TrendingBooks}/>
      <stack.Screen name="BookDesc" component={BookDesc}/>
      <stack.Screen name="UploadBook" component={UploadBook}/>
      <stack.Screen name="Pdf" component={PDFExample}/>
      <stack.Screen name="Search" component={Search} />
      <stack.Screen name="BookList" component={BookList}/>
      <stack.Screen name="TopAuthor" component={TopAuthor}/>
      <stack.Screen name="AllBooks" component={AllBooks}/>
      <stack.Screen name="EachCategory" component={EachCategory}/>
     
    
    
  </stack.Navigator>)
}

export default Navigation;