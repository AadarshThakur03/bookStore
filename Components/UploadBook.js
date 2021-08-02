import React, { useState,useEffect } from 'react'
import { View,StyleSheet,TextInputFocusEventData,Alert ,Modal,StatusBar,Text,Image, Platform,ToastAndroid, ScrollView} from 'react-native'

import Categories from './Categories'
import Header from './Header'
import TrendingBooks from './TrendingBooks'
import { TextInput,Button,ActivityIndicator } from 'react-native-paper';
import { launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import firebaseSetup from '../Setup'
import {db} from '../Firebase'
import SelectPicker from 'react-native-form-select-picker';
import UploadedBookModal from './BookUploadedModal'
import { Linking} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase'
import {Picker} from '@react-native-picker/picker';

// import ImagePicker from 'react-native-image-crop-picker';


const UploadBook =({navigation})=>{
  
  const [bookname,setBookName]=useState("");//name of the book
  const [author,setAuthor]=useState("");//name of the author
  const [bookpdf,setBookPdf]=useState("");//set pdf
  const [books,setBooks]=useState([]);
  const [thumbnail, setThumbnail] = useState("");//set thumbnail
  const [currentDate, setCurrentDate] = useState('');
  const [onlyDate, setOnlyDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [description,setDescription]=useState('');
  const [summary,setSummary]=useState();
  const [modal,setModal]=useState(false);
  const [modalPDF,setModalPDF]=useState(false);
  const [bookUploadModal,setbookUploadModal]=useState(false);
  const [isLoading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState();


  const options = ['Fiction','Self-help','Business','Mystery','Horror','others'];

  
 
  //onSubmit button
  const submit=()=>{
    if (!bookname.trim()) {
      ToastAndroid.show("Enter the book name", ToastAndroid.SHORT);
      return;
    }else if(!author.trim()){
      ToastAndroid.show("Enter the author", ToastAndroid.SHORT);
      return;
    }else if (!thumbnail.trim()){
      ToastAndroid.show("Select the image", ToastAndroid.SHORT);
      return;
    }else if (!bookpdf.trim()){
      ToastAndroid.show("Select the PDF", ToastAndroid.SHORT);
      return;
    }
    else if (categories==''){
      ToastAndroid.show("Select the categories", ToastAndroid.SHORT);
      return;
    }
    else if (!description.trim()){
      ToastAndroid.show("Select the PDF", ToastAndroid.SHORT);
      return;
    }
    else if (!summary.trim()){
      ToastAndroid.show("Select the PDF", ToastAndroid.SHORT);
      return;
    }
    else if (!onlyDate.trim()){
      ToastAndroid.show("Select the PDF", ToastAndroid.SHORT);
      return;
    }
    
    
    
    
    
    
    
    else{
      ToastAndroid.show("Please wait! While we submit your Data", ToastAndroid.SHORT);
     
      db.collection('Books').add({
        name:bookname,
        author:author,
        thumbnail:thumbnail,
        bookpdf:bookpdf,
        date:currentDate,
        categories:categories,
        description:description,
        summary:summary,
        onlyDate:onlyDate
      
  
  
      }).then(()=>{
        setBookName('')
        setBookPdf('')
        setAuthor('')
     
        setDescription('')
        setSummary('')
        setThumbnail('')
        
        
        setbookUploadModal(true)
      }
      )
     
     
    }
   

   


   }
  

  //fetching data and date
 useEffect(
  ()=>{
    db.collection('Books').orderBy('date').onSnapshot(snapshot=>{
      setBooks(snapshot.docs.map(doc=>({id:doc.id,author:doc.data().author,bookname:doc.data().name,
        thumbnail:doc.data().thumbnail,
        bookpdf:doc.data().bookpdf,
        date:doc.data().currentDate,
        categories:doc.data().categories,
        description:doc.data().description,
        summary:doc.data().summary,
        onlyDate:firebase.firestore.FieldValue.serverTimestamp()

      
      
      
      })))

    })
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    );
    setOnlyDate(
      date + '/' + month + '/' + year 
      
    );

    db.collection('Books').orderBy('date')
    
  },[]
  
 );


  const {storage,database} = firebaseSetup();

  //uploading of thumbnail on firebase
        async function pickThumbnail (){
          console.log('pressed')
          setModal(true);
           }

        //uploading of pdf on firebase

        async function pickPdf (){
          console.log('pressed')
          setModalPDF(true);

          // setModalPDF(true);}
          // try {
          //   const res = await DocumentPicker.pick({
          //     type: [DocumentPicker.types.pdf],
          //   });
          //  const path = await normalizePath(res.uri);
          //  console.log(path)
          //  const result= await RNFetchBlob.fs.readFile(path,'base64');
          //  console.log(result)
          //  uploadFile1(result,res);

          // } catch (err) {
          //   if (DocumentPicker.isCancel(err)) {
          //     // User cancelled the picker, exit any dialogs or menus and move on
          //   } else {
          //     throw err;
          //   }
          // }
        }

        //removing file prefix
        async function normalizePath(path){
          if (Platform.OS==='ios' || Platform.OS==="android"){
            const filePrefix ='file://';
            if (path.startsWith(filePrefix)){
              path=path.substring(filePrefix.length);
              try{
                path=decodeURI(path);
              }
              catch(e){

              }
            }
          }
          return path;
        }



        //Uploading of thumbnail on database.
    
                async function uploadFile(result,res){
                  const uploadTask = storage().ref(`allFiles/${res.name}`).putString(result,'base64',{contentType:res.type});


                  uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            ToastAndroid.show("Upload is "+ progress +'%done', ToastAndroid.SHORT);
          
            switch (snapshot.state) {
              case storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                ToastAndroid.show("Upload is Running", ToastAndroid.SHORT);
                break;
            }
          }, 
          (error) => {
            console.log('error')
            // Handle unsuccessful uploads
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              saveFileRealDatabase(downloadURL,res);
            setThumbnail(downloadURL);
            });
          }
        );


                }

         //Uploading of pdf on database.
    
         async function uploadFile1(result,res){
          const uploadTask = storage().ref(`allFiles/${res.name}`).putString(result,'base64',{contentType:res.type});


          uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    ToastAndroid.show("Upload is "+ progress +'%done', ToastAndroid.SHORT);
   
    switch (snapshot.state) {
      case storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        ToastAndroid.show("Upload is Running", ToastAndroid.SHORT);
        break;
    }
  }, 
  (error) => {
    console.log('error')
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      saveFileRealDatabase(downloadURL,res);
     setBookPdf(downloadURL);
    });
  }
);


        }

        function saveFileRealDatabase(downloadURL,res){
          const uniqueKey=database().ref().push().key;
          database().ref(`allFiles/${uniqueKey}`).update({
            fileName:res.name,
            fileType:res.type,
            fileURL:downloadURL,
          })
          console.log('Hello',downloadURL)
        }
       
    return(
        <View style={styles.container}>
           <StatusBar  backgroundColor='#0163D2' color='white' barStyle="light-content"/>
          
          <Modal
          
          transparent={true}
          
          visible={bookUploadModal}
          onRequestClose={()=>setbookUploadModal(false)}
          
          >
          <UploadedBookModal />
          </Modal>

          {/* //////////////////////////////////////////////////////////////Thumbnail Modal*/}
          <Modal
          transparent={true}
          
          visible={modal}
          onRequestClose={()=>setModal(false)}
          
          >
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
                <Button mode="contained" onPress={()=>{
                  console.log("Cancel Pressed")
                  setModal(false)
                   //       style: "cancel"
                }}>Cancel</Button>
                <Button mode="contained" onPress={

async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
   const path = await normalizePath(res.uri);
   console.log(path)
   const result= await RNFetchBlob.fs.readFile(path,'base64');
   console.log(result)
   uploadFile(result,res);
  
   setModal(false);

  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
    } else {
      throw err;
    }
  }
  
}
  }>Ok</Button>

              </View>
              </View>
            </View>
            
 </Modal>
 <Modal
          transparent={true}
          
          visible={modalPDF}
          onRequestClose={()=>setModalPDF(false)}
          
          >
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
                <Button mode="contained" onPress={()=>{
                  console.log("Cancel Pressed")
                  setModalPDF(false)
                   //       style: "cancel"
                }}>Cancel</Button>
                <Button mode="contained" onPress={

                  async()=>{
                    try {
                      const res = await DocumentPicker.pick({
                        type: [DocumentPicker.types.pdf],
                      });
                     const path = await normalizePath(res.uri);
                     console.log(path)
                     const result= await RNFetchBlob.fs.readFile(path,'base64');
                     console.log(result)
                     uploadFile1(result,res);
                     setModalPDF(false)
          
                    } catch (err) {
                      if (DocumentPicker.isCancel(err)) {
                        // User cancelled the picker, exit any dialogs or menus and move on
                      } else {
                        throw err;
                      }
                    }
                  }

 }>Ok</Button>

              </View>
              </View>
            </View>
            
 </Modal>
  {/* //////////////////////////////////////////////////////////////Thumbnail Modal*/}
    {/* //////////////////////////////////////////////////////////////Pdf Modal*/}

    {/* <Modal
          transparent={true}
          
          visible={modalPDF}
          onRequestClose={()=>setModalPDF(false)}
          
          >
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
                <Button mode="contained" onPress={()=>{
                  console.log("Cancel Pressed")
                  setModalPDF(false)
                   //       style: "cancel"
                }}>Cancel</Button>
                <Button mode="contained" onPress={

                    async () => {
                      try {
                        const res = await DocumentPicker.pick({
                          type: [DocumentPicker.types.pdf],
                        });
                      const path = await normalizePath(res.uri);
                      console.log(path)
                      const result= await RNFetchBlob.fs.readFile(path,'base64');
                      console.log(result)
                      uploadFile(result,res);
                    setModalPDF(false)

                      } catch (err) {
                        if (DocumentPicker.isCancel(err)) {
                          // User cancelled the picker, exit any dialogs or menus and move on
                        } else {
                          throw err;
                        }
                      }
                      
                    }
                      }>Ok</Button>

              </View>
              </View>
            </View>
            
 </Modal>
 */}



      {/* //////////////////////////////////////////////////////////////Pdf Modal*/}





  



          <View style={styles.add}>
          <View style={{}}>
            <Icon
                                name="arrow-back" 
                                color='white'
                                size={30}
                                style={{paddingLeft:10}}
                                onPress={()=>{navigation.goBack()}}
                    
                              
                                />

            </View>
        <View style={{ paddingRight:8,flexDirection:'row',left:'25%'}}>
          {/* <Image 
          source = {require('../assets/addbook.png')}
          style={{height:34,width:37,paddingRight:10,marginTop:7,marginRight:5}}
          
          /> */}
           <Text style={styles.textadd}>
              Add Book
            </Text>
          
          </View>

           
          </View>
          <ScrollView>

                
           
      
                <TextInput
                label='Name of the Book'
                value={bookname}
                onChangeText={(e)=>setBookName(e)}
                clearButtonMode='always'
                focus="true"
                mode='outlined'
                style={styles.Textinput}
                />
                 <TextInput
                label="Author"
                value={author}
                onChangeText={(e)=>setAuthor(e)}
                clearButtonMode='always'
                mode='outlined'
                style={styles.Textinput}
                />

              <SelectPicker
                    onValueChange={(value) => {
                      // Do anything you want with the value. 
                      // For example, save in state.
                      setCategories(value);
                     

                    }}
                    categories={categories}
                    placeholder="Select Categories of Book"
                    style={styles.inputAndroid}
                    placeholderStyle={{marginTop:6,fontSize:16}}
                    onSelectedStyle={{marginTop:6,fontSize:16}}
                    
                    
                    >
                    
                    {Object.values(options).map((val, index) => (
                      <SelectPicker.Item label={val} value={val} key={val} />
                    ))}
                    

                  </SelectPicker>
                

                  <TextInput
                label="Date"
                value={onlyDate}
                clearButtonMode='always'
                
                mode='outlined'
                disabled="true"

                style={styles.Textinput,{ margin:10,}}
                />

                <TextInput
                label="Description"
                value={description}
                onChangeText={(e)=>setDescription(e)}
                clearButtonMode='always'
                mode='outlined'
                style={styles.Textinput}
                multiline = {true}
numberOfLines = {10}
                />
                 <TextInput
                label="Summary"
                value={summary}
                onChangeText={(e)=>setSummary(e)}
                clearButtonMode='always'
                mode='outlined'
                style={styles.Textinput}
                multiline={true}
                numberOfLines = {10}
                
               
                />

                <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:10}}> 
                  <View>
                  <Button icon="camera" color="#0163d2" mode="contained" onPress={pickThumbnail} >
                  Thumbanial
                  </Button>

                  </View>
                  <View>
                  <Button icon="camera" color="#0163d2" mode="contained" onPress={pickPdf} >
                    Upload Pdf 
                  </Button>

                  </View>
                </View>
                </ScrollView>
                 
  

  <Button icon="camera" color="#0163d2" mode="contained" onPress={submit} style={{borderRadius:0,padding:5,color:'#0163d2'}} >
    Submit
  </Button>

  
 

                
        </View>


    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop:StatusBar.currentHeight
    },
    Textinput:{
        margin:10,
       
    },
    inputAndroid: {
      margin:10,
      width:391.6,
      height:56.0,
      
      borderWidth: 1,
      borderColor: '#5e5e5e',
      borderRadius: 4,
     
    },
    add:{
     height:60,
      flexDirection:'row',
      textAlign:'center',
    
      alignItems:'center',
      backgroundColor:'#0163d2',
      borderBottomWidth:2,
      borderBottomColor:'#ededed',
      

    },
    textadd:{
      fontSize:28,
      textAlign:'center',
      fontWeight:'bold',
      color:'white'
    }
})
export default UploadBook