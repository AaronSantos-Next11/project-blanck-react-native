import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

// Llamar los screen principales
import ScreenAcercade from './screen/acercade/ScreenAcercade';
import ScreenHome from './screen/home/ScreenHome';
import ScreenSetting from './screen/setting/ScreenSetting';

function MyTabs() {
   return (
      <Tab.Navigator>
         <Tab.Screen name="home" component={ScreenHome} options={{headerShown:false}}/>
         <Tab.Screen name="about" component={ScreenAcercade}/>
         <Tab.Screen name="ScreenSetting" component={ScreenSetting}/>
      </Tab.Navigator>
   )
}

export default function navigation() {
   return(
      <MyTabs/>
   )
}