import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function login() {

  const [text, setText] = React.useState('');
  const rutas = useNavigation();

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
      />

      <TextInput
        label="Password"
        secureTextEntry
        style={styles.input}
        right={<TextInput.Icon icon="eye" />}
        placeholder={'Ingresa tu contraseña'}
      />

      <Button dark={false} mode="contained-tonal" 
        style={styles.button} 
        onPress={() => rutas.push('menu') }>
          Login
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