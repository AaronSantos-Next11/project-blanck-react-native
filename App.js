import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navegacion from './navegacion';
import StateGlobal from './src/context/StateGlobal';

export default function App() {

  return (
    <StateGlobal>
      <NavigationContainer>
        <Navegacion/>
      </NavigationContainer>
    </StateGlobal>
    
  );
}

const styles = StyleSheet.create({});