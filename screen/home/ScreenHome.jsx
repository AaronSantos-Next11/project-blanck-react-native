import { Text, View } from 'react-native'
import React from 'react'
import { Button, Card, Icon, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ScreenHome() {
  
    const rutas = useNavigation();

    return (
      <View>

        <Card>
          <Icon
            source="lightbulb"
            color={'#EF3444'}
            size={70}
          />

          <Button icon="arrow" dark={false} buttonColor="orange"  mode="text" onPress={() => rutas.push('lucescasa') }>
            Go to About
          </Button>

        </Card>

        <Card>
          <Icon
            source="door"
            color={'#EF3444'}
            size={70}
          />

          <Button icon="camera" dark={false} mode="contained-tonal" onPress={() => rutas.push('puertacasa') }>
            Press me
          </Button>

        </Card>

        <Card>
          <Icon
            source="door"
            color={'#EF4444'}
            size={70}
          />

          <Button icon="camera" textColor='red' mode="outlined" onPress={() => rutas.push('detalleshome')}>
            Press me
          </Button>

        </Card>

      </View>
    )
  
}

