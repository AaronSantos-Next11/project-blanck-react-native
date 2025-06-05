import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Button } from 'react-native-paper';

export class ScreenHome extends Component {
  render() {
    return (
      <View>

        <Button icon="camera" buttonColor="red"  mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>

        <Button icon="camera" style={{marginTop: 20}} mode="outlined" onPress={() => console.log('Pressed')}>
          Press me
        </Button>

      </View>
    )
  }
}

export default ScreenHome