import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Image, ScrollView,FlatList, TouchableOpacity, Alert,ToastAndroid} from 'react-native'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import { Avatar,Title,Caption,Paragraph,Drawer,Text,TouchableRipple,Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../Components/Context'
import auth from '@react-native-firebase/auth';
import Icons from 'react-native-vector-icons/Ionicons';

export function  DrawerContent(props){
    

const {logout} = React.useContext(AuthContext)
const userDetail = auth().currentUser;

    return(
       <View style={{flex:1}}>
           <DrawerContentScrollView {...props}>
           <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri:  userDetail?.photoURL
                                }}
                                size={50}
                                style={{marginTop:5}}
                            />
                            <View style={{marginLeft:10, flexDirection:'column'}}>
                                <Title style={styles.title}>{userDetail?.displayName}</Title>
                                <Caption style={styles.caption}>{userDetail?.email}</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Icons 
                                // name="account-check-outline"
                                name="library-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Library"
                            onPress={() => {props.navigation.navigate('AllBooks')}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="animation" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Genres"
                            onPress={() => {props.navigation.navigate('Genres')}}
                        />
                          <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                // name="account-check-outline"
                                name="bookmark-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Read List"
                            onPress={() => {props.navigation.navigate('BookList')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="book-search-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Search"
                            onPress={() => {props.navigation.navigate('Search')}}
                        />
                       
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="upload-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Upload Book"
                            onPress={() => {props.navigation.navigate('UploadBook')}}
                        />
                      
                       
                    </Drawer.Section>

                    </View>
           </DrawerContentScrollView>
           <Drawer.Section style={styles.bottomDrawerSection}>
               <DrawerItem
                icon={({color,size})=>(
                    <Icon
                    name="exit-to-app"
                    color={color}
                    size={size}
                   
                    
                    />
                )}
                label="Sign Out"
                onPress={()=>logout()}
               
               />
           </Drawer.Section>

       </View>
    )
}
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 13,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });