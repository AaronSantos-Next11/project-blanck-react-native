import React, { useState, useContext } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'
import { useNavigation } from "@react-navigation/native"
import { estadoLoginGlobal } from '../../context/contextData'

// Llama el objeto que contiene el acceso a las variables de entorno y endpoints
import { API_CONFIG, getCommonHeaders } from '../../config/apiConfig';

export default function SignUp() {

    //* Estados para la interfaz
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verpw, setVerpw] = useState(true);
    const rutas = useNavigation();

    //* Constante de la variable de entorno de la URL del servidor
    // const apiURL = process.env.EXPO_PUBLIC_API_URL; //! No funciona, ya sea por el nombre de la variable o no sé

    //* Desestructuración de la función estadoLoginGlobal
    const { login } = useContext(estadoLoginGlobal);

    //* Función principal que crea la cuenta:
    const handleCrearCuenta = async () => {

        if (nombre.trim() === "" || email.trim() === "" || password.trim() === "") {
            Alert.alert("Atención", "Todos los campos son obligatorios");
            return;
        }
        
        const myHeaders = new Headers();
        Object.entries(getCommonHeaders()).forEach(([key, value]) => {
            myHeaders.append(key, value);
        });

        const raw = JSON.stringify({
            "id": 0,
            "nombre": nombre,
            "pw": password,
            "email": email,
            "status": 1
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(API_CONFIG.USUARIO.AGREGAR, requestOptions);

            //! Funciona en casa, pero para celulares
            // const response = await fetch("http://192.168.1.45:4000/api/usuario/agregar", requestOptions);

            //! Funciona en la uni, pero para celulares
            // const response = await fetch("http://192.168.30.33:4000/api/usuario/agregar", requestOptions);

            //! Funciona, pero en el navegador
            // const response = await fetch(`${apiURL}/api/usuario/agregar`, requestOptions);

            const result = await response.json();

            if (result.body?.status === true) {
                Alert.alert("Éxito", result.body.mensaje || "Cuenta creada exitosamente.");
                login();
            } else {
                Alert.alert("Mensaje", result.body?.mensaje || "Ocurrió un error.");
            }

            console.log("Resultado:", result);

        } catch (error) {
            console.error("Error en crear cuenta:", error);
            Alert.alert("Error", "No se pudo conectar con el servidor.");
        };
        
    }

    return (
        <View style={{ padding: 20, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", marginTop: 40, color: 'purple', }} variant="displaySmall">
                Crear Cuenta
            </Text>

            <TextInput
                style={{ marginTop: 10 }}
                label="Nombre"
                value={nombre}
                onChangeText={setNombre}
                left={<TextInput.Icon icon="account" />}
            />

            <TextInput
                style={{ marginTop: 10 }}
                label="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                left={<TextInput.Icon icon="email" />}
            />

            <TextInput
                style={{ marginTop: 10 }}
                label="Password"
                secureTextEntry={verpw}
                value={password}
                onChangeText={setPassword}
                left={<TextInput.Icon icon="lock" />}
                right={<TextInput.Icon icon="eye" onPress={() => setVerpw(!verpw)} />}
            />

            <Button mode="contained" icon="account-plus" style={{ marginTop: 20, padding: 10 }} onPress={handleCrearCuenta}>
                Crear cuenta
            </Button>

            <Button mode="text" style={{ marginTop: 10 }} onPress={() => rutas.push("login")}>
                ¿Ya tienes cuenta? Inicia sesión
            </Button>

        </View>
    )
}

const styles = StyleSheet.create({})