import React from 'react'
import {} from '@react-navigation/stack';
import {Text,View,StyleSheet, Dimensions,Image,TouchableOpacity,StatusBar} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const FirstScreen=({navigation})=>{
    return(
        <View style={styles.container}>
             <StatusBar  backgroundColor='#0163d2' barStyle="light-content"/>
            <View style={styles.header}>
               <Animatable.Image
               animation='slideInDown'
              
               source={require('../assets/logo.png')}
               style={styles.logo}
                resizeMode='stretch'
/>
            </View>
            <Animatable.View style={styles.footer}
            animation="fadeInUpBig"
            
            >
                <Text style={styles.title}>Stay Connected with everyone!!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>               
                 <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                    <LinearGradient
                    colors={['#08d4c4','#01ab9d']}
                    style={styles.signIn}
                    
                    >
                        <Text style={styles.textSignIn}>Get Started</Text>
                        <MaterialIcons
                        name="navigate-next"
                        color="#fff"
                        size={24}
                        
                        />
                    </LinearGradient>
                </TouchableOpacity>
                </View>

            </Animatable.View>

        </View>
    )
}

export default FirstScreen



const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFB6C1'
        //#FFB6c1
    },
    header:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        flex:1,
        backgroundColor:'white',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:50,
        paddingHorizontal:30
        
    },
    logo:{
        width:600,
        height:600
    },
    title:{
        color:'#05375a',
        fontSize:30,
        fontWeight:'bold'
    },
    text:{
        color:'grey',
        marginTop:5
    },
    button:{
        alignItems:'flex-end',
        marginTop:30
    },
    signIn:{
        width:150,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        flexDirection:'row'
    },
    textSignIn:{
        color:'white',
        fontWeight:'bold'
    }
})