import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,Image, ScrollView,FlatList, TouchableOpacity, Alert,ToastAndroid,RefreshControl, Button, StatusBar} from 'react-native'
import  AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from'react-native-vector-icons/FontAwesome5'


const BookList=({navigation})=>{
    const [data, setData] = useState([]);
    const [shipcost, setShipcost] = useState(76);
    const [noofitems, setnoofitems] = useState(1);
    const [costofitems, setcostofitems] = useState(0);
    const [items,setItems]=useState()
    const [refreshing,setRefreshing]=useState(false)
    // console.log(props.image)
    var intervalID;
    useEffect(
        
        //    async ()=>{  
        //         try{  
        //           let user = await AsyncStorage.getItem('books');  
        //           let parsed = JSON.parse(user);  
        //           console.log(parsed[0].bookname)  
        //         }  
        //         catch(error){  
        //           alert(error)  
        //         }  
        //       }  
       ()=>{getCartData()
        return () => {
            clearTimeout(intervalID);
          }
    
    
    
    
    
    } ,[]
        
    )
    
    const getCartData = async () => {
      
        try {
            const value = await AsyncStorage.getItem("CART_ITEMS");
            if (value !== null) {
                // We have data!!
                console.log(JSON.parse(value));
                setData(JSON.parse(value));
                setnoofitems(JSON.parse(value).length);
                intervalID = setTimeout(getCartData, 5000);


               

            } else {
                // 
            }
        } catch (error) {
            // Error retrieving data
            console.log("error is: " + error);
        }
    };
    const removefromCart = async (index1) => {
        try {
            const cartItemsss = await AsyncStorage.getItem('CART_ITEMS');
            let cartItemsfav = JSON.parse(cartItemsss);
            console.log(cartItemsss,'HIIII')
            const cartItemsh = cartItemsfav.filter(function (e) { console.log(cartItemsfav.indexOf(e),'vikram'); return cartItemsfav.indexOf(e) !== parseInt(index1) });
            console.log(cartItemsh);
            setnoofitems(cartItemsh.length);
            setData(cartItemsh);
           
          
            // updating 'posts' with the updated 'postsItems'
            await AsyncStorage.setItem('CART_ITEMS', JSON.stringify(cartItemsh));
           

        } catch (error) {
            console.log('error: ', error);
        }
        // try {
        //     await AsyncStorage.removeItem(index1);
        //     console.log('Data removed')
        // }
        // catch(exception) {
        //     console.log(exception)
        // }
       
    };

//  const removefromCart= async (index1)=> {
//         // try {
//         //     await AsyncStorage.removeItem(index1);
//         //     return true;
//         // }
//         // catch(exception) {
//         //     return false;
//         // }
//         try{
//             let usersJSON= await AsyncStorage.getItem('CART_ITEMS');
//             let usersArray = JSON.parse(usersJSON);
//             alteredUsers = usersArray.filter(function(e){
//                 return e.index !== index1
    
//             })
//             AsyncStorage.setItem('users', JSON.stringify(alteredUsers));
//             setData(alteredUsers)
//         }
//         catch(error){
//             console.log(error)
//         }
//     }
   
    



  const onRefresh = () => {
        setRefreshing(true);
        getCartData().then(() => {
        setRefreshing(false)})

        }


        const BookRender=({item,index})=>{
           const index1 =index.toString()
           
            return (
            //     <View style={{backgroundColor:'white',flex:2,width:'50%',marginTop:10}}  >
            //     <View style={{margin:15}}>
            //         <View>
            //         <Image
            //             style={{height:250}}
            //             source={{uri:item.thumbnail}}
                     
            //         />
        
            //         </View>
            //         <View>
            //             <View style={{marginTop:5}}>
            //                 <Text style={{fontSize:20,fontWeight:'bold'}} numberOfLines={1}>{item.bookname}</Text>
            //             </View>
            //             <Button title="Remove" onPress={()=>{removefromCart(index1)}}/>
        
            //         </View>
        
            //     </View>
        
            // </View>
            <TouchableOpacity
            onPress={()=>{navigation.navigate('BookDesc',{
                Name:item.bookname,
                image: item.thumbnail,
                author:item.author,
                bookpdf:item.bookpdf,
                summary:item.summary,
                description:item.description,
                categories:item.categories,
                Date12:item.currentDate,
                onlyDate:item.onlyDate,
                
              
            });}}
            
            
            
            >
                           <View style={{backgroundColor:'white',margin:10,height:150,borderRadius:20,padding:20}}>
                <View style={{flexDirection:'row'}}>

                <View style={{width:'30%'}}>
                    <Image
                        style={{height:'100%',resizeMode:'stretch',width:80,borderRadius:20,left:0}}
                        source={{uri:item.thumbnail}}
                     
                     />
        
                     </View>
                <View style={{width:'70%',right:2}}>
                    <View style={{height:60,justifyContent:'center'}}>
                        <Text style={{fontSize:30,fontWeight:'bold'}} numberOfLines={1}>{item.bookname}</Text>
                    </View>
                    <View style={{marginTop:0,flexDirection:'row',justifyContent:'center'}}>
                        <View style={{left:0,width:'65%',justifyContent:'center'}}>
                            <Text style={{color:'#4d4d4d'}}>
                            Written by:
                            </Text>
                            <Text numberOfLines={1} style={{fontSize:16,fontWeight:'bold',color:'#262626'}}>
                            {item.author}
                            </Text>
                        </View>
                        <TouchableOpacity 
                        onPress={()=>removefromCart(index1)}
                        
                        
                        style={{width:'35%',justifyContent:'center',backgroundColor:'#0163d2',alignItems:'center',borderRadius:20}}>
                        <View >
                            <Text style={{color:'white'}}>Remove</Text>
                        </View>
                        </TouchableOpacity>
                    </View>

                </View>
                    
                </View>
            </View>
            </TouchableOpacity>
 
        //     )
        // })
)

        }
        
 

   

   



    return(
        <View style={{flex:1,backgroundColor:'#e6e6e6',marginTop:StatusBar.currentHeight}}>
          
       
        <View style={{height:60,alignItems:'center',
    
    borderBottomWidth:2,
    borderBottomColor:'#ededed',
  
      flexDirection:'row',
      backgroundColor:'#0163d2'
     }}>

         <View style={{width:'18%'}}>
         <Icon
                             name="arrow-back" 
                             color='white'
                             size={30}
                             style={{marginLeft:10,paddingLeft:10}}
                             onPress={()=>{navigation.goBack()}}
                 
                           
                             />

         </View>
         <View style={{width:'64%'}}>
         <Text style={{fontSize:28,
             color:'white',
             fontWeight:'bold',
             letterSpacing:1,
            left:1
            
             
             
             }}>Read List </Text>
         </View>
         <View style={{width:'18%',alignItems:'center',flexDirection:'row'}}>
             <Icons
             name="book"
             size={30}
             color='white'
             />
             <View style={{backgroundColor:'yellow',height:26,width:26,borderRadius:13,top:-13,left:-11}}>
                 <View style={{alignItems:'center',justifyContent:'center'}}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>{noofitems}</Text>

                 </View>
               

             </View>

         </View>
             
         </View>
         {/* <ScrollView 
       
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}/>} */}
                  {/* > */}
            {/* {data.map((items,index) => {
                    // console.log(items,'vikram')
                        // return (
                        //     Object.entries(items).map((item, i) => {
                        //         console.log(items.bookname,'item')
                                    return (
                                        <View style={{backgroundColor:'white',flex:2,width:'50%',marginTop:10}}  >
                                        <View style={{margin:15}} key={index}>
                                            <View>
                                            <Image
                                                style={{height:250}}
                                                source={{uri:items.thumbnail}}
                                                key={index.toString()}
                                            />
                                
                                            </View>
                                            <View>
                                                <View style={{marginTop:5}} key={index.toString}>
                                                    <Text style={{fontSize:20,fontWeight:'bold'}} numberOfLines={1}>{items.bookname}</Text>
                                                </View>
                                                <Button title="Remove" onPress={()=>removefromCart(index)}/>
                                
                                            </View>
                                
                                        </View>
                                
                                    </View>
                                //     )
                                // })
                        )
                        })} */}
                        <FlatList
                        data={data}
                        renderItem={BookRender}
                        keyExtractor={(item, index) => index.toString()}
                       
                        
                        
                        />
        
            {/* </ScrollView> */}
           
          
      

       
        </View>
    )
}
export default BookList