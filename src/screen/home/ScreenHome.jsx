import { Text, View, StyleSheet } from 'react-native'
import React, {useContext} from 'react'
import { Button, Card, Icon, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {estadoGlobal} from '../../context/contextData'
import {estadoLoginGlobal} from '../../context/contextData';

export default function ScreenHome() {
  
    const rutas = useNavigation();

    // Desestructuración de las funciones con valores por defecto
    const {sumar, restar, contador = 0, msg} = useContext(estadoGlobal) || {};

    const {outLogin} = useContext(estadoLoginGlobal) || {};

    console.log('Contador:', contador);

    return (
      <View style={styles.container}>
        
        {/* Header */}
        {/* <Text style={styles.headerText}>menu</Text> */}

        {/* Grid de Cards */}
        <View style={styles.gridContainer}>
          
          {/* Primera fila */}
          <View style={styles.row}>
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Icon
                  source="lightbulb"
                  color={'#8B5CF6'}
                  size={50}
                />
                <Button 
                  icon="arrow-right" 
                  mode="contained" 
                  buttonColor="#8B5CF6"
                  textColor="white"
                  style={styles.button}
                  onPress={() => rutas.push('lucescasa')}
                >
                  Ver opción
                </Button>
              </View>
            </Card>

            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Icon
                  source="door"
                  color={'#8B5CF6'}
                  size={50}
                />
                <Button 
                  icon="arrow-right" 
                  mode="contained" 
                  buttonColor="#8B5CF6"
                  textColor="white"
                  style={styles.button}
                  onPress={() => rutas.push('puertacasa')}
                >
                  Ver opción
                </Button>
              </View>
            </Card>
          </View>

          {/* Segunda fila */}
          <View style={styles.row}>
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Icon
                  source="car"
                  color={'#8B5CF6'}
                  size={50}
                />
                <Button 
                  icon="arrow-right" 
                  mode="contained" 
                  buttonColor="#8B5CF6"
                  textColor="white"
                  style={styles.button}
                  onPress={() => rutas.push('detalleshome')}
                >
                  Ver opción
                </Button>
              </View>
            </Card>

            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Icon
                  source="fan"
                  color={'#8B5CF6'}
                  size={50}
                />
                <Button 
                  icon="arrow-right" 
                  mode="contained" 
                  buttonColor="#8B5CF6"
                  textColor="white"
                  style={styles.button}
                  onPress={() => console.log('Nueva opción')}
                >
                  Ver opción
                </Button>
              </View>
            </Card>
          </View>

        </View>

        {/* Sección de contador (manteniendo funcionalidad original) */}
        <Card style={styles.counterCard}>
          <Text style={styles.counterText}>Suma total: {contador || 0}</Text>
          <View style={styles.counterButtons}>
            <Button mode="outlined" onPress={() => sumar()}>Sumar</Button>
            <Button mode="outlined" onPress={() => restar()}>Restar</Button>
          </View>
        </Card>

        {/* Botón de salir */}
        <Button 
          icon="logout" 
          mode="contained-tonal" 
          style={styles.logoutButton}
          onPress={() => outLogin()}
        >
          Salir del Home
        </Button>

      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 12,
  },
  cardContent: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    minHeight: 150,
  },
  button: {
    marginTop: 16,
    borderRadius: 20,
  },
  counterCard: {
    padding: 20,
    marginVertical: 16,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 12,
  },
  counterText: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  counterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logoutButton: {
    marginTop: 16,
    marginBottom: 20,
  },
});