import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Navigation from "./Navigation";
import { homeNav } from "./Navigation";
import Search from "./Components/Search";
import BookDesc from "./Components/BookDesc";
import {DrawerContent} from "./Components/DrawerContent";
import { Book } from "@material-ui/icons";
import BookList from "./Components/BookList";
import PDFExample from "./Components/Pdfexample";
import UploadBook from "./Components/UploadBook";
import Genres from "./Components/Genres";
import AllBooks from "./Components/AllBook";
import EachCategory from "./Components/EachCategory";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>}>
      <Drawer.Screen name="Home" component={homeNav} />
     
      <Drawer.Screen name="BookDesc" component={BookDesc}/>
      <Drawer.Screen name="UploadBook" component={UploadBook}/>
      <Drawer.Screen name="Pdf" component={PDFExample}/>
      <Drawer.Screen name="Search" component={Search} />
      <Drawer.Screen name="BookList" component={BookList}/>
      <Drawer.Screen name="Genres" component={Genres}/>
      <Drawer.Screen name="AllBooks" component={AllBooks}/>
      <Drawer.Screen name="EachCategory" component={EachCategory}/>
    


      {/* <Drawer.Screen name="BookDesc" component={BookDesc} />
      <Drawer.Screen name="Search" component={Search} /> */}
      
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;