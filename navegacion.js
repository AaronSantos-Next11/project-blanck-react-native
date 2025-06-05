import React from "react";
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Llamar los screen principales
import ScreenAcercade from './screen/acercade/ScreenAcercade';
import ScreenHome from './screen/home/ScreenHome';
import ScreenSetting from './screen/setting/ScreenSetting';

// Llamar los Screen hijos home
import LucesCasa from "./screen/home/LucesCasa";
import PuertaCasa from "./screen/home/PuertaCasa";
import DetallesHome from "./screen/home/DetallesHome";


function MyStackHome() {
   return(
      <Stack.Navigator>

         <Stack.Screen name="menu" component={ScreenHome} />
         <Stack.Screen name="lucescasa" component={LucesCasa} />
         <Stack.Screen name="puertacasa" component={PuertaCasa} />
         <Stack.Screen name="detalleshome" component={DetallesHome} />



      </Stack.Navigator>
   )
}


function MyTabs() {
   return (
      <Tab.Navigator>
         <Tab.Screen
            name="Home" 
            component={MyStackHome} 
            options={{
               title: 'menu',
               headerShown:false,
               tabBarIcon: ({color, size}) => <FontAwesome size={28} name='home' color={color}/>,
               tabBarActiveTintColor: '#D5451B',
               tabBarLabelPosition: 'beside-icon',
               tabBarBadge: '67',
               tabBarBadgeStyle: {
                  color: '#222222',
                  backgroundColor: '#1DCD9F',
               }
            }}
         />

         <Tab.Screen 
            name="About" 
            component={ScreenAcercade}
            options={{
               headerShown: false,
               tabBarIcon: ({color, size}) => <FontAwesome size={28} name='info-circle' color={color}/>,
               tabBarLabelPosition: 'beside-icon',
               tabBarActiveTintColor: '#D5451B',
               tabBarBadge: '1',
               tabBarBadgeStyle: {
                  color: 'white',
                  backgroundColor: '#98ABEE',
               }
            }}
         />

         <Tab.Screen 
            name="Settings" 
            component={ScreenSetting}
            options={{
               headerShown: false,
               tabBarIcon: ({color, size}) => <FontAwesome size={28} name='cog' color={color}/>,
               tabBarLabelPosition: 'beside-icon',
               tabBarActiveTintColor: '#D5451B',
               tabBarBadge: '100',
               tabBarBadgeStyle: {
                  color: 'white',
                  backgroundColor: '#DDA853',
               }
            }}
         />
      </Tab.Navigator>
   )
}

export default function navigation() {
   return(
      <MyTabs/>

   )
}