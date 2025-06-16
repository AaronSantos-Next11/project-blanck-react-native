import { StyleSheet, View } from 'react-native'
import React, {useContext, useState} from 'react'
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {estadoLoginGlobal} from '../../context/contextData';

export default function Login() {

  const [text, setText] = React.useState('');
  const rutas = useNavigation();

  // Primero, agrega estos estados para email y password al inicio de tu componente:
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(estadoLoginGlobal)

  return (
    <View>

      <Text 
        variant='headlineLarge'
        style={styles.headlineLarge}
      >
        Welcome to Login
      </Text>
      
      <TextInput
        label="Email"
        // secureTextEntry
        style={styles.input}
        // right={<TextInput.Icon icon="eye" />}
        placeholder={'Ingresa tu email'}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        label="Password"
        secureTextEntry
        style={styles.input}
        right={<TextInput.Icon icon="eye" />}
        placeholder={'Ingresa tu contraseña'}
        value={password}
        onChangeText={setPassword}
      />

      <Button dark={false} mode="contained-tonal" 
        style={styles.button} 
        onPress={() => rutas.push('menu') }>
          Login
      </Button>

      {/* // Y modifica el botón Login: */}
      <Button dark={false} mode="contained-tonal" 
        style={styles.button} 
        onPress={() => login()}>
          Ingresar
      </Button>

      <Button dark={true} mode="text" 
        textColor="orange" style={styles.button} 
        onPress={() => rutas.push('signup') }>
          ¿No tienes cuenta? Añadela
      </Button>

    </View>
  )
}

const styles = StyleSheet.create({
  headlineLarge: {
    marginVertical: 0,
    marginHorizontal: 'auto',
    marginTop: 40,
    marginBottom: 20,
    color: 'purple',
  },
  input: {
    marginHorizontal: 20,
    marginBottom: 20
  },
  textLink: {
    marginVertical: 0,
    marginHorizontal: 'auto',
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 20
  }

})