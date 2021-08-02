import React from 'react';
import {Text,View,StyleSheet, TouchableOpacity, Alert} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Navigation from '../Navigation';


import { useNavigation } from '@react-navigation/native';



    const Small=({text,navigation})=>{
        return(

        
        <View style={{marginTop:20,flexDirection:'row'}}>
                
           
        <View style={{backgroundColor:'#ededed',
      alignSelf: 'flex-start',
      padding:7,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:20,
      marginLeft:18
     
     }}>
         <View style={{
             backgroundColor: 'white',
             height: 30, //any of height
             width: 30, //any of width
             justifyContent:"center",
             borderRadius: 15,
             marginLeft:3




         }}>
             <Feather name="book-open" 
     style={{
     fontSize:20,
     color:'#ff00b3',
     marginLeft:5
    
     }}/>
     </View>

            <Text style={{fontSize:16,marginLeft:5,fontWeight:'500',  marginRight:6}}>{text}</Text>
        </View>

     </View>
  
        )}
        const Categories=()=>{
            const navigation = useNavigation();
            const alert12=()=>{
                Alert.alert('HIII')

            } 
    return(
        <View>
            <View>
                <Text style={{fontSize:24,color:'black',fontStyle:'normal',fontFamily:'Open Sans, Arial',fontWeight:'bold',marginLeft:18}}>
                    Categories

                </Text>
            </View>
            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <TouchableOpacity
                onPress={()=>navigation.navigate('Search')}
                >
            <Small text="Movies"/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>navigation.navigate('BookList')} >
                     <Small text="Dance"/>
                </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('AllBooks')}>
            <Small text="Cinema"/>
            </TouchableOpacity>
            <Small text="Floor"/>
            <Small text="Movies Fantastic"/>
            <Small text="Movies"/>
            <Small text="Movies Dnce Comic"/>
            </View>
            
        </View>
    )
}

export default Categories