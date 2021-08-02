import React, { useContext, useState,useEffect } from 'react'
import {} from '@react-navigation/stack';
import {Text,View,StyleSheet, Dimensions,Image,Platform,TextInput,TouchableOpacity,StatusBar, Button} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { AuthContext1 } from '../Components/AuthProvider';
import {AuthContext} from '../Components/Context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin,GoogleSigninButton, } from '@react-native-google-signin/google-signin';


const SignUpScreen=({navigation})=>{
    const {register,googleLogin2} = React.useContext(AuthContext)
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [name1,setName]=useState();
  
    // const saveData = async (userEmail) => {
    //     try {
    //       await AsyncStorage.setItem('username', userEmail)
    //       alert('Data successfully saved')
    //     } catch (e) {
    //       alert('Failed to save the data to the storage')
    //     }
    //   }
      

   

        const [data,setData]=React.useState({
            email:'',
            password:'',
            confirm_password:'',
            check_textInputChange:false,
            secureTextEntry:true,
            confirm_secureTextEntry:true

        });
        const textInputChange=(val)=>{
            if (val.length !== 0){
                setData({
                    ...data,
                    email:val,
                    check_textInputChange:true
                });
            }else{
               setData({ ...data,
                email:val,
                check_textInputChange:false})

            }

        }
        const textPasswordChange=(val)=>{
            setData({
                ...data,
                password:val
            })
        }
        const    confirmtextPasswordChange=(val)=>{
            setData({
                ...data,
                confirm_password:val
            })
        }
        const updatePasswordEntry=()=>{
            setData({
                ...data,
                secureTextEntry:!data.secureTextEntry
            })
        }
        const confirmPasswordEntry=()=>{
            setData({
                ...data,
                confirm_secureTextEntry:!data.confirm_secureTextEntry
            })
        }

        const {signIn} = React.useContext(AuthContext);


        const loginhandle=(username,password) =>{
            signIn(username,password);
        }

    return(
       <View style={styles.container}>
            <StatusBar  backgroundColor='#0163d2' barStyle="light-content"/>
        
           {/* #009387 */}
           <View style={styles.header}>
               <Text style={styles.text_header}>Register Now!</Text>
           </View>
           {/* <View>
               <TextInput
               placeholder='Email'
               value={email}
               onChangeText={(userEmail)=>setEmail(userEmail)}
               
               />
               <TextInput
               placeholder="Password"
               value={password}
               onChangeText={(userPass)=>setPassword(userPass)}
               />
               <Button title="Submit" onPress={()=>register(email,password)}/>

           </View> */}
           <Animatable.View style={styles.footer}
           
           animation="fadeInUpBig"
           >
               <Text style={styles.text_footer}>
                   Email
               </Text>
               <View style={styles.action}>
                   <FontAwesome
                    name="user-o"
                    color="#05375a"
                    size={20}/>
                    <TextInput
                     value={email}
                    placeholder="Your Email"
                    autoCapitalize="none"
                    placeholderTextColor = "#cfd1d0"
                    style={styles.textInput}
                    onChangeText={(userEmail)=>setEmail(userEmail)}

                    />
                     {/* <TextInput
                     value={name1}
                    placeholder="Your Email"
                    autoCapitalize="none"
                    placeholderTextColor = "#cfd1d0"
                    style={styles.textInput}
                    onChangeText={(userEmail)=>saveData(userEmail)}

                    /> */}
                    {data.check_textInputChange ? 
                    <Feather
                    name="check-circle"
                    color="green"
                    size={20}/>
                    : null}
               </View>
               <Text style={[styles.text_footer,{marginTop:25}]}>
                   Password
               </Text>
               <View style={styles.action}>
                   <FontAwesome
                    name="lock"
                    color="#05375a"
                    size={20}/>
                    <TextInput
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry? true :false}
                    autoCapitalize="none"
                    placeholderTextColor = "#cfd1d0"
                    style={styles.textInput}
                    value={password}
                    onChangeText={(userPass)=>setPassword(userPass)}
                    />
                    <TouchableOpacity
                    
                    onPress={updatePasswordEntry}
                    >    
                    {data.secureTextEntry?             
                          <Feather
                    name="eye-off"
                    color="grey"
                    size={20}/>
                    :   <Feather
                    name="eye"
                    color="grey"
                    size={20}/>}
                    </TouchableOpacity>
 
               </View>


               
               

               <View style={styles.button}>
                   <TouchableOpacity style={{width:'100%'}}  onPress={()=>register(email,password)}>               
                         <LinearGradient
                   colors={["#08d4c4",'#01ab9d']}
                   style={styles.signIn}>
                       <Text style={[styles.textSign,{color:'#fff'}]}>Sign Up</Text>
                   </LinearGradient>

                   </TouchableOpacity>
  
                   <View style={{padding:15}}>
                       <Text style={{fontSize:14,fontWeight:'bold',color:'#919191'}}>----OR----</Text>
                   </View>


                   <GoogleSigninButton
                style={{width: 200, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={()=>googleLogin2()}
               
              />

               </View>
           </Animatable.View>
       </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#009387'
    },
    header:{
        flex:1,
        justifyContent:'flex-end',
        paddingHorizontal:20,
        paddingBottom:50
    },
    footer:{
        flex:5,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30
    },
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30
    },
    text_footer:{
        color:'#05375a',
        fontSize:18
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
     

    },
    textInput:{
        flex:1,
        marginTop:Platform.os === 'ios' ? 0:-12,
        paddingLeft:10,
        color:'#05375a',

    },
    button:{
        alignItems:'center',
        marginTop:30
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    }
})

export default SignUpScreen