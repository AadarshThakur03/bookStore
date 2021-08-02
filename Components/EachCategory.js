import { Category, SettingsBluetoothTwoTone } from '@material-ui/icons';
import React ,{useState,useEffect}from 'react'
import { View,StyleSheet,Text,ScrollView,FlatList,TouchableOpacity,Image ,StatusBar,TextInput, SafeAreaView,BackHandler} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import {db} from '../Firebase'


const EachCategory=({route,navigation})=>{
    const [books,setBooks]=useState([]);
    const {category,category1}=route.params
    console.log(route.params)
    const [buttons,setButton]=useState(false)
    // var ad=category.toString()
    // var ad1=category1.toString()
   var  intervalID
  

    const fetchData=()=>{
        console.log(category)
        db.collection('Books')
      
       
        .where('categories','==',category || category1)
       
       
        .onSnapshot(snapshot=>{
          setBooks(snapshot.docs.map(doc=>({id:doc.id,author:doc.data().author,bookname:doc.data().name,thumbnail:doc.data().thumbnail,
              bookpdf:doc.data().bookpdf,
              date:doc.data().currentDate,
              categories:doc.data().categories,
              description:doc.data().description,
              summary:doc.data().summary,
              onlyDate:doc.data().onlyDate
          
          
          })))
          
    
        })
        // if(buttons){
        //    route.params=null
        //      console.log(ad)
        // }
       

     
      

       
      }
    
    useEffect(
     ()=>{ fetchData()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

        const unsubscribe = navigation.addListener('focus', () => {
          console.log('Refreshed!');
        
        });
        return unsubscribe




        // return () => {
        //     clearTimeout(intervalID);
        //     BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        //   }


    
    },[]
       );
       const handleBackButtonClick=()=>{
           console.log('button Pressed')
           console.log(category,'category')
           console.log(category1,'category1')
           setButton(true)
       }

    const renderItems=({item})=>{

        return(
          
            <View style={{width:'30%',padding:8,backgroundColor:'white',marginHorizontal:5,marginTop:StatusBar.currentHeight}}>
           <View style={{}}>
           <Image
                                           style={{height:165,resizeMode:'stretch'}}
                                           source={{uri:item.thumbnail}}
                                       />
           </View>
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
               
               <View >
                   <Icons
                   name="heart"
                   size={35}

                   />
               </View>
               <View>
                   <Icons
                   name="heart"
                   size={35}

                   />
               </View>
               <View>
                   <Icons
                   name="heart"
                   size={35}

                   />
               </View>
           </View>
       </View>


      
   )
    }


   return(
    <>
    <FlatList
    data={books}
    renderItem={renderItems}
    keyExtractor={(item, index) => index.toString()}
    
    
    />
    </>
   )
   
}
export default EachCategory