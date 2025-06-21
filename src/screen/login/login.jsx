import { Alert, StyleSheet, View } from 'react-native'
import React, {useContext, useState} from 'react'
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {estadoLoginGlobal} from '../../context/contextData';

export default function Login() {

  const [text, setText] = React.useState('');
  const rutas = useNavigation();
  const [verpw, setVerpw] = useState(true); //! Estado para poder cambiar el icono del password

  // Primero, agrega estos estados para email y password al inicio de tu componente:
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(estadoLoginGlobal);

  const apiURL = process.env.EXPO_PUBLIC_API_URL;

  // Mecanismo que conecta el Back-end para validar los datos
  const handlogin = async () => {
    if(email == '' || password == '') {
      Alert.alert('Atención, porfavor rellena los campos')
    } else {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Datos de validación, permiten saber si existe un usuario
      const raw = JSON.stringify({
        "user": email,              //! Accede al email ingresado en el texto
        "password": password        //! Accede al password ingresado en el texto
      });

      // Declaración del metodo POST
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      // Try/catch para validar si sale algo mal y mandar un error
      try {
        const response = await fetch(apiURL, requestOptions); //! Para dispositivos móviles reales
        // const response = await fetch("http://LaIPdeLaCompu:4000/api/usuario/login", requestOptions); //! Para dispositivos móviles reales
        // const response = await fetch("http://localhost:4000/api/usuario/login", requestOptions); //! Para el emulador
        const result = await response.json();
        console.log(result)

        if (result.body.status == true) {
          Alert.alert('Bienvenido', result.body.user.nombre)
          login()
        } else {
          Alert.alert('Mensaje', result.body.mensaje)
        }

      } catch (error) {
        console.error(error);
      };
      
    }
  }

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
        placeholder={'Ingresa tu email'}
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon icon="account"/>}
      />

      <TextInput
        label="Password"
        style={styles.input}
        secureTextEntry={verpw}
        
        // Iconos
        left={<TextInput.Icon icon="key"/>}
        right={<TextInput.Icon icon="eye" onPress={() => setVerpw(!verpw)} />}

        //! Hacer una condicional cada que se click en el boton, cambie el logo
        // right={<TextInput.Icon icon="eye-off" onPress={() => setVerpw(!verpw)} />}

        placeholder={'Ingresa tu contraseña'}
        value={password}
        onChangeText={setPassword}
      />

      <Button dark={false} mode="contained-tonal" 
        style={styles.button} 
        onPress={() => handlogin()}>
          Login
      </Button>

      {/* // Y modifica el botón Login: */}
      <Button dark={false} mode="contained-tonal" 
        style={styles.button} 
        onPress={() => handlogin()}>
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