import React from 'react';
import {Text,View,StyleSheet,Dimensions,StatusBar} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../Components/Context'
import DrawerNavigator from '../DrawerNavigation';
import Icon from 'react-native-vector-icons/Entypo';
import { Avatar } from 'react-native-paper';


import {DrawerContent} from "./Components/DrawerContent";
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get("window");

function Header ({navigation}){
  //#EA8D8D' ,'#A890FE

//   background-color: #FBDA61;
// background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
const {user} = React.useContext(AuthContext)


const user1 = auth().currentUser;


const openMenu=()=>{
  navigation.openDrawer();
      
}


  return(
    // <LinearGradient start={{ x: -1, y: 0 }}
    // end={{ x: 1, y: 0 }}  colors={['#FBDA61' ,'#FF5ACD']} style={styles.linearGradient} >
    // <View style={styles.container}>
    //     <View style={{ margin:20, flexDirection:'row',alignItems:'center',}}>
    //       <TouchableOpacity onPress={()=>navigation.openDrawer()}>
    //     <View>
    //     <Feather name="book-open" 
    //     style={{
    //     fontSize:40,
    //     color:'white'
        

        
    //     }}/>
    //     </View>
    //     </TouchableOpacity>
    //     <View style={{paddingLeft:10,alignItems:'center'}}>
    //         <Text style={{fontSize:24,fontWeight:'bold',color:'white'}}>Book Store</Text>
            
    //     </View>
    //     <TouchableOpacity
    //     onPress={()=>{signOut()}}
    //     style={{
    //      paddingLeft:170
    //     }}>
    //     <View>
    //       <Entypo
    //       name="log-out"
    //       size={25}
    //       color='white'
         
          
          
    //       />

          

    //     </View>
    //     </TouchableOpacity>
    //     </View>
       

    // </View>
    // </LinearGradient>
    

    <View style={styles.header}>
        <StatusBar translucent backgroundColor='#0163D2' color='white' barStyle="light-content"/>
                                 <Icon 
                                name="menu" 
                                color='white'
                                size={35}
                                style={styles.icon}
                                onPress={openMenu}
                                />
      
      
      <View>
       
    
        
        <Text style={styles.headerText}>Home</Text>
 
      </View>

      <View style={styles.image}>
      <Avatar.Image 
                                source={{
                                    uri: user1?.photoURL
                                }}
                                size={35}
                                
                            />

      </View>

    </View>
  )
}

const styles=StyleSheet.create({
    linearGradient:{
        
        height:100,
        alignItems:'center',
      
        width:'100%',
       
        flexDirection:'row',
     backgroundColor:'white',
            borderBottomRightRadius:  60,
           
           
           


    },
    header:{
      overflow:'hidden',
      width:width,
      height:60,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
     backgroundColor:'#0163D2',
     shadowColor: '#000',
     shadowOffset: { width: 1, height: 1 },
     shadowOpacity:  0.4,
     shadowRadius: 3,
     elevation: 4,
     left:-16
    
   
     

    },
    headerText:{
      fontWeight:'bold',
      fontSize:28,
      color:'white',
      letterSpacing:1
    },icon:{
      position:'absolute',
      left:8    },
    image:{
      position:'absolute',
      right:8
    }
})

export default Header