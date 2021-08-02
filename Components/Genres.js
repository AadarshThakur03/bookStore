import React from 'react'
import { View,StyleSheet,Text,ScrollView,FlatList,TouchableOpacity,Image ,StatusBar,TextInput, SafeAreaView} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';


const Genres=({navigation})=>{
    React.useEffect(() => {
        // const unsubscribe = navigation.addListener('focus', () => {
        //   console.log('Refreshed!');
        // on
        // });
        onLoad()
        // return unsubscribe;
      }, [navigation]);

     const  onLoad = () => {
      navigation.addListener('didFocus', () => console.log('x'))
        }

    return(
    //      <LinearGradient start={{ x: -1, y: 0 }}
    // end={{ x: 1, y: 0 }}  colors={['#FBDA61' ,'#FF5ACD']} style={styles.linearGradient} >
    // <View >
    //     <Text>Hiii</Text>
    //     <Text>Hiii</Text>
    //     <Text>Hiii</Text>
    //     <Text>Hiii</Text>
        
       

    // </View>
    // </LinearGradient>
  
      
    <View style={{flex:1,marginTop:StatusBar.currentHeight,backgroundColor:'white'}}>
        
        {/* <View style={{height:60,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:35,fontWeight:'bold'}}>Genres</Text>
        </View> */
        }
         
            <View style={{height:60,alignItems:'center',
    
       borderBottomWidth:2,
       borderBottomColor:'#ededed',
       backgroundColor:'#0163d2',
     
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
               
               
                
                
                }}>Genres</Text>
            </View>
            <View style={{width:'18%'}}>

            </View>
                
            </View>
        <SafeAreaView style={{flex:2}}>
        <ScrollView>
        <View>
        <TouchableOpacity  
        onPress={()=>navigation.navigate('EachCategory',{
            category:"Fiction"
        })}
        
        >
        <LinearGradient start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}  colors={['#FBDA61' ,'#FF5ACD']} style={styles.box} >
           <View >
               <Text style={styles.boxText}>Fiction</Text>

           </View>
           </LinearGradient>
           </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>{navigation.navigate('EachCategory',{
                category1:"Self-help"
            })
     
        
        }}
            
            >
           <LinearGradient start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}  colors={['#00c6fb' ,'#005bea']} style={styles.box} >
           <View >
           <Text style={styles.boxText}>Self-help</Text>

           </View>
           </LinearGradient>
           </TouchableOpacity>

           <TouchableOpacity>
           <LinearGradient start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}  colors={['#2af598' ,'#009efd']} style={styles.box} >
           <View >
           <Text style={styles.boxText}>Business</Text>

           </View>
           </LinearGradient>
           </TouchableOpacity>

           <TouchableOpacity>
           <LinearGradient start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}  colors={['#c471f5' ,'#fa71cd']} style={styles.box} >
           <View >
           <Text style={styles.boxText}>Mystery</Text>

           </View>
           </LinearGradient>
           </TouchableOpacity>
           <TouchableOpacity>
           <LinearGradient start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}  colors={['#30cfd0' ,'#330867']} style={styles.box} >
           <View >
           <Text style={styles.boxText}>Horror</Text>

           </View>
           </LinearGradient>
           </TouchableOpacity>

         
           

           <TouchableOpacity>
           <LinearGradient start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}  colors={['#f093fb' ,'#f5576c']} style={styles.box} >
           <View >
           <Text style={styles.boxText}>Others</Text>

           </View>
           </LinearGradient>
           </TouchableOpacity>
          

           {/* <TouchableOpacity>
           <LinearGradient start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}  colors={['#43e97b' ,'#38f9d7']} style={styles.box} >
           <View >
                <Text style={styles.boxText}>Horror</Text> 

           </View>
           </LinearGradient>
           </TouchableOpacity> */}
        </View>
        </ScrollView>
        </SafeAreaView>
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
    box:{
        backgroundColor:'yellow',
           height:130,
           marginHorizontal:30,
           marginTop:10,
           alignItems:'center',
           justifyContent:'center',
           borderRadius:15,
           marginBottom:15

    },
    boxText:{
        fontSize:28,
        color:'white',
        fontWeight:'bold',
        letterSpacing:1.5

    }

})
export default Genres