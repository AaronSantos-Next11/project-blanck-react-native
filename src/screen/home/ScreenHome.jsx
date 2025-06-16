import { Text, View } from 'react-native'
import React, {useContext} from 'react'
import { Button, Card, Icon, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {estadoGlobal} from '../../context/contextData'
import {estadoLoginGlobal} from '../../context/contextData';

export default function ScreenHome() {
  
    const rutas = useNavigation();

    // Desestructuración de las funciones
    const {sumar, restar, contador, msg} = useContext(estadoGlobal);

    const {outLogin} = useContext(estadoLoginGlobal)

    console.log(contador);

    return (
      <View>

        <Card>
          <Icon
            source="lightbulb"
            color={'#EF3444'}
            size={70}
          />

          <Button icon="arrow-right-thin" dark={false} buttonColor="orange"  mode="text" onPress={() => rutas.push('lucescasa') }>
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
        <Card style={{ padding: 20 }}>
        <Text> Suma total: {contador}</Text>
        <Button onPress={()=>sumar()}>Sumar</Button>
        <Button onPress={()=>restar()}>Restar</Button>
      </Card>

      <Button icon="camera" dark={false} mode="contained-tonal" onPress={() => outLogin()}>
            Salir del Home
      </Button>

      </View>
    )
  
}

