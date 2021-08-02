import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,Image, ScrollView,FlatList, TouchableOpacity, Alert,RefreshControl,ToastAndroid,StatusBar, Button, TextInput,ActivityIndicator} from 'react-native'
import { Searchbar} from 'react-native-paper';
import {db} from '../Firebase'
import  AsyncStorage  from '@react-native-async-storage/async-storage'
import Categories from './Categories';
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/Ionicons';

const Search=({navigation})=>{
   
    const [books,setBooks]=useState([]);
    const [data,setData]=useState([]);
    const [text,setText]=useState('');
    const [arrayholder,setArrayholder]=useState([])
    // const [loading, setLoading] = useState([]);
    const [refreshing,setRefreshing] =useState(false);
    const [show,setShow]=useState(true)
    const[Loading,setLoading]=useState(false)
    
   

    const fetchData=()=>{
       
        // db.collection('Books').onSnapshot(snapshot=>{
        //     setBooks(snapshot.docs.map(doc=>(
        //         {
        //             id:doc.id,author:doc.data().author,bookname:doc.data().name,thumbnail:doc.data().thumbnail,
        //             bookpdf:doc.data().bookpdf,
        //             date:doc.data().currentDate,
        //             categories:doc.data().categories,
        //             description:doc.data().description,
        //             summary:doc.data().summary,
        //             onlyDate:doc.data().onlyDate
        //         }
        //     )));
            
        //   })
       
  db.collection('Books')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.data());
    
      setBooks(querySnapshot.docs.map(
          (doc)=>(
              {
                id:doc.id,author:doc.data().author,bookname:doc.data().name,thumbnail:doc.data().thumbnail,
                            bookpdf:doc.data().bookpdf,
                            date:doc.data().currentDate,
                            categories:doc.data().categories,
                            description:doc.data().description,
                            summary:doc.data().summary,
                            onlyDate:doc.data().onlyDate

              }
          )

      ))

     

      setData(books);
      console.log(books,"data here");
   
      setArrayholder(books);
      LogBox.ignoreLogs(['Setting a timer for a long period of time'])
    
     
      
   
    });
  }).then( )
 }
 const fetchData2=()=>{
     setLoading(true)
       
    // db.collection('Books').onSnapshot(snapshot=>{
    //     setBooks(snapshot.docs.map(doc=>(
    //         {
    //             id:doc.id,author:doc.data().author,bookname:doc.data().name,thumbnail:doc.data().thumbnail,
    //             bookpdf:doc.data().bookpdf,
    //             date:doc.data().currentDate,
    //             categories:doc.data().categories,
    //             description:doc.data().description,
    //             summary:doc.data().summary,
    //             onlyDate:doc.data().onlyDate
    //         }
    //     )));
        
    //   })
   
db.collection('Books')
.get()
.then(querySnapshot => {
console.log('Total users: ', querySnapshot.size);

querySnapshot.forEach(documentSnapshot => {
  console.log('User ID: ', documentSnapshot.data());

  setBooks(querySnapshot.docs.map(
      (doc)=>(
          {
            id:doc.id,author:doc.data().author,bookname:doc.data().name,thumbnail:doc.data().thumbnail,
                        bookpdf:doc.data().bookpdf,
                        date:doc.data().currentDate,
                        categories:doc.data().categories,
                        description:doc.data().description,
                        summary:doc.data().summary,
                        onlyDate:doc.data().onlyDate

          }
      )

  ))

 

  setData(books);
  console.log(books,"data here");

  setArrayholder(books);
  setLoading(false)


 
  

});
}).then(setShow(false))
}
  
   

    useEffect(

                 ()=>{
       
        fetchData()
       
        ToastAndroid.show("Pull to load the data", ToastAndroid.SHORT);

       
    
       }  ,[]
       )
        
        const searchData=(text)=> {
            const newData = arrayholder.filter (item => {
              const itemData = item.bookname.toUpperCase()
            //   (item.bookname.toUpperCase())|| (item.author.toUpperCase());
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1
            });
    
           setData(newData)
           setText(text)
           
         
            
              }

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



    if(Loading){
        return(
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                 <ActivityIndicator size="large" color="red" />
            </View>
        )
    }

              
       
const Container=({item,index})=>{
    setLoading(false)
    console.log(item,'items')
    return(
      
        <View>
         
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
             <View style={{margin:10,flexDirection:'row',backgroundColor:'white',padding:20,borderRadius:15}}>
            <View style={{marginRight:12,width:'25%'}}>
            <Image
                    style={{height:140,width:95,resizeMode: 'stretch',}}
                    // source={{uri:item.item.image}}
                    source= {{uri:item.thumbnail}}
                   
                    
      />

            </View>
            <View style={{width:'75%',marginLeft:10}}>
                <View style={{marginRight:10}}>
                    <Text   numberOfLines={2} style={{fontSize:32,fontWeight:'bold'}}>{item.bookname}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:5}}>
                    <Text>by</Text>
                    <Text style={{fontWeight:'bold',fontSize:15}}> {item.author}</Text>
                   

                </View>
                <TouchableOpacity onPress={()=>AddtoCart(index)}>
                <View style={{backgroundColor:'red',color:'white',padding:5,width:'90%',alignItems:'center',marginTop:10,textAlign:'center',paddingHorizontal:20,borderRadius:10}}>
                        <Text style={{color:'white',fontSize:16}}>Add</Text>
                    </View>
                    </TouchableOpacity>

            </View>
        </View>
        </TouchableOpacity>
 
        </View>
     )
}

 return(
      <View style={{marginTop:StatusBar.currentHeight}} >
         <StatusBar  backgroundColor='#0163D2' color='white' barStyle="light-content"/>
          <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchData}
            />
          }
          
          >
         
             <View>
{/*             
         <Searchbar
      placeholder="Search"
     
        onChangeText={(text) => {searchData(text)}}
    /> */}

    <View  style={{margin:10,
    borderRadius:10,
    color:'red',
    height:55,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
}}>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
        <View style={{}}>
                        
                                 <Icons
                                name="arrow-back" 
                                color='black'
                                size={30}
                                style={{marginLeft:10,paddingLeft:10}}
                    
                              
                                />
      

        </View>
        </TouchableOpacity>
        <View style={{width:'75%',marginHorizontal:15}}>
            <TextInput
            placeholder='Search'
            placeholderTextColor="#737373"
            style={{fontSize:18,color:'black'}}
            onChangeText={(text) => {searchData(text)}}
         

            
            
            />

        </View>
        <View style={{right:5}}>
        <Icon
                                name="search" 
                                color='black'
                                size={35}
                                // style={{right:2}}
                                style={{marginRight:10}}
                    
                              
                                />

        </View>

    </View>
    
   
    </View>

    {show? <View style={{flex:1,marginTop:75,alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:14,color:'#8a8a8a'}}>Nothing to Show. No Data Found</Text>
   
              
          <Image
          source={require('../assets/search.png')}
          style={{height:350,width:500,marginRight:30, resizeMode: 'stretch',}}
          
          />
          <View style={{alignItems:'center',margin:10}}>
            
              
              <Text style={{fontSize:16,fontWeight:'bold',color:'#616161'}}>Click on Icon to load data</Text>
          </View>
          <View>
              <TouchableOpacity 
              onPress={()=>{fetchData2()}}>
        <Icon
        
        name="refresh"
        color="black"
        size={60}
        />
        </TouchableOpacity>
    </View>
          {/* <Button title="referesh Data" onPress={()=>{fetchData2()}}/> */}
          
        </View>
        : <FlatList
           
           
        data={data}
        renderItem={Container}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchData}
        refreshing={refreshing}
        
        
        
        />}
   
    
   
   
            </ScrollView>
             </View>
       
    )
}

export default Search

