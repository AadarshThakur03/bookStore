import React,{useState,useEffect} from 'react'
import { View,StyleSheet,Text,ScrollView,FlatList,TouchableOpacity,Image ,StatusBar,TextInput, SafeAreaView} from 'react-native'
import Icons from 'react-native-vector-icons/EvilIcons'
import {db} from '../Firebase'
import  AsyncStorage  from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons';




const AllBooks=({navigation})=>{

    const [books,setBooks]=useState([]);
    const fetchData=()=>{
        db.collection('Books')
        .orderBy('name')
       
       
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

       
      }
    
    useEffect(
     ()=>{ fetchData() },[]
       );

       const AddtoCart=(index)=>{
        
        AsyncStorage
        .getItem("CART_ITEMS")
        .then((itemslist) => {
            const items = itemslist ? JSON.parse(itemslist) : [];
    
            items.push(books[index]);
            console.log(books[index]);
    
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

    const Items=({item,index})=>{
        // {books.map((item,index)=>{
            return(
                <TouchableOpacity  
    
                onPress={()=>{navigation.navigate('BookDesc',{
                    Name:item.bookname,
                    image: item.thumbnail,
                    author:item.author,
                    bookpdf:item.bookpdf,
                    summary:item.summary,
                    description:item.description,
                    categories:item.categories,
                    date:item.currentDate,
                    onlyDate:item.onlyDate,
                    index
                  
                });}}
                // onPress={()=>{console.log('indes is ',{index})}}
                
                style={{width:'46%',padding:15,backgroundColor:'white',marginLeft:8,marginRight:8,justifyContent:'center',marginBottom:8,marginTop:8,borderRadius:25}}
                >         
                     <View >
                <View style={{}}>
                <Image
                                                style={{height:250,resizeMode:'stretch',borderRadius:25}}
                                                source={{uri:item.thumbnail}}
                                            />
                </View>
                <View >
                    <View>
                        <Text style={{fontSize:24,fontWeight:'bold',color:'black'}}numberOfLines={1}>{item.bookname}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'70%',justifyContent:'center'}}>
                            <Text numberOfLines={2} style={{color:'#595959'}}>
                                {item.author}
                                
                            </Text>
            
                        </View>
                        <View style={{width:'30%'}}>
                        <TouchableOpacity onPress={()=>AddtoCart(index)}>
                        <Icons
                                    name="heart"
                                    size={45}
                                    style={{left:8,color:'black'}}
            
                                    />
                                    </TouchableOpacity>
            
                        </View>
                    </View>
                   
                </View>
            </View>
            </TouchableOpacity>
          

            
            )
        // })}
        // return(
          
        //     //      <View style={{width:'30%',padding:8,backgroundColor:'white',marginHorizontal:5}}>
        //     //     <View style={{}}>
        //     //     <Image
        //     //                                     style={{height:165,resizeMode:'stretch'}}
        //     //                                     source={{uri:'https://png.pngtree.com/thumb_back/fw800/background/20190826/pngtree-dark-abstract-background-with-dark-overlap-layers-image_305003.jpg'}}
        //     //                                 />
        //     //     </View>
        //     //     <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        //     //         <View >
        //     //             <Icons
        //     //             name="heart"
        //     //             size={35}

        //     //             />
        //     //         </View>
        //     //         <View>
        //     //             <Icons
        //     //             name="heart"
        //     //             size={35}

        //     //             />
        //     //         </View>
        //     //         <View>
        //     //             <Icons
        //     //             name="heart"
        //     //             size={35}

        //     //             />
        //     //         </View>
        //     //     </View>
        //     // </View>
  
   
           
        // )
    }



  let numColumn=2

    return(
        <View style={{marginTop:StatusBar.currentHeight,flex:1,backgroundColor:'#f2f2f2'}}>
            <StatusBar  backgroundColor='#0163d2' barStyle="light-content"/>
            <View style={{height:60,alignItems:'center', backgroundColor:'#0163d2',
         shadowColor: '#000',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity:  0.4,
         shadowRadius: 3,
         elevation: 3,
     
         flexDirection:'row'
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
            <View style={{width:'64%',alignItems:'center'}}>
            <Text style={{fontSize:28,
                color:'white',
                fontWeight:'bold',
                letterSpacing:1,
              
               
                
                
                }}>Library</Text>
            </View>
            <View style={{width:'18%'}}>

            </View>
                
            </View>
           {/* <ScrollView> */}
           {/* <View style={{flexDirection:'row',flexWrap:'wrap'}}>         */}
                  {/* <Items/>
            <Items/>
            <Items/>
            <Items/>
            <Items/>
            <Items/>
            <Items/>
            <Items/> */}
<View style={{flexDirection:'row',flex:2}}>
            <FlatList
            numColumns={numColumn}
            
                data={books}
                renderItem={Items}
                keyExtractor={(item, index) => index.toString()}
                
                
                
                />
                </View>
            {/* </View> */}
            {/* </ScrollView> */}
 

        
           
        </View>
    )
}
export default AllBooks