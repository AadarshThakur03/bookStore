import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,Image, ScrollView,FlatList, TouchableOpacity, Alert,ActivityIndicator} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import {db} from '../Firebase'
import BookList from './BookList';

const TrendingBooks=()=>{
   
    const [books,setBooks]=useState([]);
    const[Loading1,setLoading]=useState(false)
  

  
    const data=[
        {uri:"https://firebasestorage.googleapis.com/v0/b/store-ccadd.appspot.com/o/allFiles%2FIMG_20210707_131657.jpg?alt=media&token=55662179-aad0-4729-abe4-c8617dabf901",
    Name:'Lords',Author:'Mongo'},
    {uri:'https://www.oberlo.com/media/1603897583-image17-1.jpg?fm=webp&w=1824&fit=max',
    Name:'Lords',Author:'Chongo'},
    {uri:'https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/LordOfTheFliesBookCover.jpg',
    Name:'Hall Of Fame',Author:'Longo'},
    {uri:'https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/LordOfTheFliesBookCover.jpg',
    Name:'Mobile',Author:'Mongo'},
    {uri:'https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/LordOfTheFliesBookCover.jpg',
    Name:'Iphone',Author:'Mongo'},
    {uri:'https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/LordOfTheFliesBookCover.jpg',
    Name:'Lords',Author:'Mongo'},
    {uri:'https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/LordOfTheFliesBookCover.jpg',
    Name:'Lords',Author:'Mongo'},
    {uri:'https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/LordOfTheFliesBookCover.jpg',
    Name:'Lords',Author:'Mongo'},
    ]

    const navigation = useNavigation();

    const fetchData=()=>{
        setLoading(true)
        db.collection('Books')
        .orderBy('date')
       
       
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
        setLoading(false)

       
      }
    
    useEffect(
     ()=>{ fetchData() },[]
       );
      
       if(Loading1){
        return(
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                 <ActivityIndicator size="large" color="red" />
            </View>
        )
    }


    const renderItems =({item,index})=>{
      
       
      
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
                Date12:item.currentDate,
                onlyDate:item.onlyDate,
                
              
            });}}
            // onPress={()=>{console.log('indes is ',{index})}}
            
            
            >
            <View style={{marginRight:5,marginLeft:5}}>
                <View>
                <Image
                    style={{height:150,width:105,resizeMode: 'stretch',}}
                    // source={{uri:item.item.image}}
                   source= {{uri:item.thumbnail ? item.thumbnail : null}}
                   
                    
      />
                </View>
                <View style={{width:105,marginTop:5}}>
                    <Text style={{fontSize:17,alignItems:'center',fontWeight:'bold',textAlign:'left'}}
                    numberOfLines={1}
                    
                    >{item.bookname}</Text>
                </View>
            </View>
           
            </TouchableOpacity>
        )
    }








    return(
        <View>

            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{fontSize:24,color:'black',fontStyle:'normal',fontFamily:'Open Sans, Arial',fontWeight:'bold',marginLeft:18}}>Trending Books</Text>
                <Text style={{fontSize:18,color:'#6e6d6d',fontStyle:'normal',fontFamily:'Open Sans, Arial',fontWeight:'bold',marginRight:18}}> See All</Text>

            </View>
            <ScrollView horizontal={true}>
            <View style={{marginLeft:18,marginTop:15,flexDirection:'row'}}>
                {/* <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/> */}
               
                        
            </View>
            </ScrollView>
            <FlatList
            
            horizontal={true}
                data={books}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
                
                
                
                />
                 {/* {books.map(author=>{
    console.log(author)

  })} */}
        </View>
    )
}
export default TrendingBooks