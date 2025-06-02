import React from "react";
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

// Llamar los screen principales
import ScreenAcercade from './screen/acercade/ScreenAcercade';
import ScreenHome from './screen/home/ScreenHome';
import ScreenSetting from './screen/setting/ScreenSetting';

function MyTabs() {
   return (
      <Tab.Navigator>
         <Tab.Screen
            name="Home" 
            component={ScreenHome} 
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