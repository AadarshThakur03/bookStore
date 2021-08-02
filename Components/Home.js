import React from 'react'
import { View,StyleSheet,Text,ScrollView,FlatList,TouchableOpacity,Image ,StatusBar,TextInput, SafeAreaView} from 'react-native'

import Categories from './Categories'
import Header from './Header'
import TrendingBooks from './TrendingBooks'
import { FAB} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from '../Navigation'

import Icon from 'react-native-vector-icons/EvilIcons'
import TopAuthor from './TopAuthors'

const Home=({navigation})=>{
// global.gdata = "home";

  



    return(
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        
       
        <ScrollView>

      
      
        <View style={{flex:1,backgroundColor:'white'}}>
        <StatusBar  backgroundColor='#0163D2' color='white' barStyle="light-content"/>
          <View style={{marginLeft:18,marginRight:18,marginTop:20}}>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('Search')}
            >           
               <View   style={{
               borderRadius:35,
               color:'black',
               paddingVertical:13, 
               backgroundColor:'#ededed',
               flexDirection:'row',
               alignItems:'center',
    //            shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // elevation: 4,
    }}>
                 <View style={{marginLeft:12,marginRight:8}}> 
                 <Icon name="search" size={25} color="black" />
                </View>
                <View>
              <Text style={{fontSize:16,color:'#6b6b6b'}}>
                Search
              </Text>
              </View>

            </View>
            </TouchableOpacity>

           

          </View>
         
        <View style={{marginTop:20}}>
          <Categories/>
        </View>
        <View style={{marginTop:20}}>
           
          <TrendingBooks />
        </View>
        <View style={{marginTop:20}}>
           
           <TopAuthor />
          
         </View>
        </View>
        </ScrollView>
        <FAB
    style={styles.fab}
    theme={{colors:{accent:'#0163d2',primary: 'white'}}}
    large
    icon="plus"
    onPress={() => navigation.navigate('UploadBook')}
  />
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom:25,
    right: 0,
    bottom: 0,
  },
})
export default Home