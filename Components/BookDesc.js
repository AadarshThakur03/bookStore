import  React, { useEffect } from 'react'
import { View,StyleSheet,TextInput,Text,ImageBackground,Image, TouchableOpacity,ScrollView,StatusBar,Dimensions} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import DownloadLink from "react-download-link";
import { Button } from 'react-native-paper';
import Categories from './Categories';
import { useState } from 'react/cjs/react.development';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';


export const myWidth = Dimensions.get("window").width;
export const myHeight = Dimensions.get("window").height;
const standardWidth = 150.0;
const standardHeight = 230.0;

export function widthScale (dimension) {
    return (dimension / standardWidth) * myWidth;
}

export function heightScale (dimension) {
    return (dimension / standardHeight) * myHeight;
}


const BookDesc =({route,navigation})=>{
    const userDetail = auth().currentUser;


   

    
    const { Name, author,image,bookpdf,summary,categories,description,Date12,onlyDate} = route.params;
   
   
    
   const  download=()=>{
    console.log('started')
    const { config, fs } = RNFetchBlob;
  const date = new Date();

  const { DownloadDir } = fs.dirs; // You can check the available directories in the wiki.
  const options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true, // true will use native manager and be shown on notification bar.
      notification: true,
      path: `${DownloadDir}${Math.floor(date.getTime() + date.getSeconds() / 2)}.pdf`,
      description: 'Downloading.',
    },
  };

  config(options).fetch('GET', bookpdf).then((res) => {
    console.log('do some magic in here');
  });
    
  const AddtoCart=(index)=>{
    alert(index)
    AsyncStorage
    .getItem("CART_ITEMS")
    .then((itemslist) => {
        const items = itemslist ? JSON.parse(itemslist) : [];

        items.push(data[index]);
        console.log(data[index]);

        AsyncStorage.setItem("CART_ITEMS", JSON.stringify(items), (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("success");
            alert("Added to Cart.");
        }).catch((err) => {
            console.log("error is: " + err);
        });
    })

}
   
    
      
      }
   
      useEffect(()=>{
          console.log({onlyDate})
      })
       
    return(
        <>
        <View style={{flex:1}}>
        {/* <StatusBar translucent backgroundColor='transparent' color='black' barStyle="light-content"/> */}
        <View style={{flex:3}}>
            <View style={styles.Image}>
           
            <ImageBackground  style= { styles.backgroundImage } source= {{uri:'https://png.pngtree.com/thumb_back/fw800/background/20190826/pngtree-dark-abstract-background-with-dark-overlap-layers-image_305003.jpg'}}> 
            <Icon 
                                name="arrow-back" 
                                color='white'
                                size={35}
                                style={{left:'-42%',top:'8%'}}
                                onPress={()=>navigation.goBack()}
                                />
            <Image
        style={styles.tinyLogo}
        source={{uri:image}}
      />
      <View style={{top:'7%'}}>
      <View style={{width:'94%'}}>
               <Text style={{fontSize:26,color:'white', fontWeight:'bold'}} numberOfLines={2}>{Name}</Text>
              
         </View>
         </View>
 
      <Text style={{fontSize:12,color:'white', fontWeight:'normal',top:'7%'}}>by {author}</Text>
            </ImageBackground>


            </View>
            
           <View style={{alignItems:'center'}}>

               <View style={{width:'90%',backgroundColor:'#221c2e',height:60,borderRadius:10,top:-30,flexDirection:'row',justifyContent:'space-evenly'}}>
               
               <View style={{
                   borderRightWidth:1,
                   borderRightColor:'white',
                   width:'50%',
                   flexDirection:'row',
                   justifyContent:'center',
                   alignItems:'center'
               }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Pdf',{
               
               bookpdf:bookpdf,
               
             
           })}> 
                   <FontAwesome
               
                name="book-reader"
                size={20}
                style={{color:'white',padding:10}}

               
               /></TouchableOpacity>
               
               <TouchableOpacity onPress={()=>navigation.navigate('Pdf',{
               
                bookpdf:bookpdf,
                
              
            })}> 
               <Text  style={{color:'white'}}>Read More</Text>
               </TouchableOpacity></View>
               
               
                          <View style={{
                   
                   width:'50%',
                   flexDirection:'row',
                     justifyContent:'center',
                     alignItems:'center'
               }}>
                   <FontAwesome
                     name="download"
                     size={20}
                     style={{color:'white',padding:10}}
                    
                     


                   />
                   <TouchableOpacity onPress={()=>{
                       download()
                   }}
              
            >                 
                   <Text  style={{color:'white'}}>Download</Text>
                   
                   </TouchableOpacity>
  
                   </View>
                  

               </View>
               

           </View>
              
         </View>
        
      
         <View style={{ flex:2,textAlign:'left',marginLeft:10,marginRight:10,marginTop:-27}}>
         <ScrollView >

         <View style={{marginTop:8,paddingBottom:10,justifyContent:'center'}}>
            
            <View style={styles.shortDesc}>
                <Text style={styles.textinlast}>Title:</Text>
                 <Text style={styles.textinlast2}>{Name}</Text>
            </View>
            <View  style={styles.shortDesc}>
                <Text style={styles.textinlast}>Author:</Text> 
                <Text style={styles.textinlast2}>{author}</Text>

            </View>
            <View  style={styles.shortDesc}>
                <Text style={styles.textinlast}>Category:</Text>
                 <Text style={styles.textinlast2}>{categories}</Text>
            </View>
            <View  style={styles.shortDesc}>
                <Text style={styles.textinlast}>Date of Published:</Text> 
                <Text style={styles.textinlast2}>{onlyDate}</Text>
            </View>
        </View>
         <View >
            <View style={{  }}>
                <Text style={{fontSize:26,fontWeight:'bold'}}>Description</Text>
            </View>
            <View>
                <Text style={{fontSize:15,marginTop:8,textAlign:'justify',}}>
               {description}
                </Text>
            </View>
        </View>
        <View style={{ marginTop:8 ,marginBottom:10}} >
            <View >
                <Text style={{fontSize:26,fontWeight:'bold'}}>Summary</Text>
            </View>
            <View>
                <Text style={{fontSize:15,marginTop:8,textAlign:'justify',}}>
                {summary}
                </Text>
            </View>
        </View>
      


        </ScrollView>
       
        </View>
        <TouchableOpacity >
        <View style={{width:'100%',backgroundColor:'#221c2e',height:50,alignItems:'center',textAlign:'center',justifyContent:'center'}}>
            
            <Text style={{color:'white',fontSize:20}}>
                Add to read
            </Text>
        </View>
        </TouchableOpacity>
       
        </View>
     
        </>
    )
}
const styles=StyleSheet.create({
    Image:{
        flex:4,
       
      
       
    },
    textinlast:{
        fontSize:18,fontWeight:'bold'

    },
    textinlast2:{
        fontSize:17,marginLeft:4,textAlign:'justify'
    },
    backgroundImage:{
        flex: 1,
       
       
        alignItems: "center",
        opacity: 1,
        resizeMode: 'stretch',
        overflow:'hidden'
        
    },
    tinyLogo:{
        alignItems:'center',
        justifyContent:'center',
        height:heightScale(70),
        width:widthScale(56),
        resizeMode:'stretch',
        top:'5%'
      
      
    },
    shortDesc:{
        flexDirection:'row',
        marginBottom:5
    }
})

export default BookDesc