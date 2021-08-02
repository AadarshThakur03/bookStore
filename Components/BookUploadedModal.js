import { useNavigation } from '@react-navigation/native'
import React, { useState,useEffect } from 'react'
import { View,StyleSheet,TextInputFocusEventData,Alert ,Button,Modal,Text,Image, Platform} from 'react-native'


const UploadedBookModal =()=>{
  const  navigation=useNavigation()
    return(
        <>
       
       <View style={{flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#00000099'
            
            }}>

            <View style={{width:350,height:200,backgroundColor:'white',
          borderColor:'#000',
          borderWidth:1,
          borderRadius:9
          
          
          }}> 
              <View style={{justifyContent:'center',alignItems:'center',margin:5,marginLeft:8}}>
              <Text style={{fontWeight:'bold',fontSize:22}}>
              Instruction
              </Text>

              </View>
              <View style={{margin:10,height:90}}>
                      
                <Text>
                  Image should be of jpg,png.
                </Text>
               
  

              </View>
              <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
              <Button title="Ok"  onPress={() => navigation.goBack()}/>
              </View>
              </View>
            </View>
       
</>

    )
}
export default UploadedBookModal