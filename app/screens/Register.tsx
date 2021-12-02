import React, { useState } from 'react';
import { 
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { RegisterUrl } from '../constants/api';

import { useToast } from "react-native-toast-notifications";

import colors from "../constants/colors";

const Register = ({navigation}) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repeatPassword, setRepeatPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorRepeatPassword, setErrorRepeatPassword] = useState("");
    const [errorUsername, setErrorUsername] = useState("");

    const toast = useToast();

    function isEmail(email: string) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(email)){
            return false;
        } else {
            return true;
        }
    }

    const submitForm = async () => {
        console.log(errorRepeatPassword)
        let formReady = true;
        if (!username) {
            formReady = false;
            setErrorUsername("Debe ingresar un nombre de usuario para continuar");
        } else {
            setErrorUsername("");
        }

        if (!email) {
            formReady = false;
            setErrorMail("Debe ingresar su dirección de e-mail para continuar")
        } else if (!isEmail(email)) {
            setErrorMail("Debe ingresar una dirección de e-mail correcta para continuar")
        } else {
            setErrorMail("")
        }

        if (!password) {
            formReady = false;
            setErrorPassword("Debe ingresar su contraseña para continuar")
        } else {
            setErrorPassword("")
        }

        if (!repeatPassword) {
            formReady = false;
            setErrorRepeatPassword("Debe ingresar su contraseña nuevamente para continuar")
        } else if (repeatPassword !== password) {
            formReady = false;
            setErrorRepeatPassword("Las contraseñas deben ser iguales para continuar")
        } else {
            setErrorRepeatPassword("")
        }

        if (formReady) {
            const res = await fetch(RegisterUrl, {
                method: "POST",
                mode: "cors", 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "role": "USER", 
                    "email": email
                })
            })
            .then((result) => {
                return result.json();
              })
            .then((result) => {
                if (result.ok) {
                    setTimeout(() => {
                        toast.show("Registro exitoso", {
                            type: "success",
                            placement: "bottom",
                            duration: 10000,
                            animationType: "slide-in",
                        });
                        navigation.navigate("Login");
                    }, 2000)
                } else {
                    throw Error(result.err.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return (  
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <View style={styles.form}>
                <TextInput 
                placeholder="Nombre" 
                placeholderTextColor="#fff" 
                style={[styles.input, {borderColor: errorUsername ? colors.red : "transparent", borderWidth: 2}]} 
                onChangeText={(text) => setUsername(text)}
                />
                <Text style={styles.textError}>{errorUsername}</Text>
                <TextInput 
                placeholder="Email" 
                placeholderTextColor="#fff" 
                style={[styles.input, {borderColor: errorMail ? colors.red : "transparent", borderWidth: 2}]} 
                onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.textError}>{errorMail}</Text>
                <TextInput 
                placeholder="Contraseña" 
                placeholderTextColor="#fff" 
                style={[styles.input, {borderColor: errorPassword ? colors.red : "transparent", borderWidth: 2}]} 
                onChangeText={(text) => setPassword(text)}
                />
                <Text style={styles.textError}>{errorPassword}</Text>
                <TextInput 
                placeholder="Repetí tu contraseña" 
                placeholderTextColor="#fff" 
                style={[styles.input, {borderColor: errorRepeatPassword ? colors.red : "transparent", borderWidth: 2}]} 
                onChangeText={(text) => setRepeatPassword(text)}
                />
                <Text style={styles.textError}>{errorRepeatPassword}</Text>
            </View>
            <View style={styles.containerButtons}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => submitForm()}
                >
                    <Text style={styles.textButton}>Registrarme</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.button, {backgroundColor: "transparent", marginTop: 20}]}
                onPress={() => navigation.navigate("Login")}                
                >
                    <Text style={styles.textButton}>¿Ya tenes cuenta? Ingresá</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "900",
        color: colors.red,
        paddingBottom: 30,
    },
    form: {
        width: "100%",
        // flex: 1,
        justifyContent: "center",

    },
    input: {
        backgroundColor: colors.secondary,
        width: "80%",
        alignSelf: "center",
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        color: "#fff",
        borderRadius: 40
    },
    containerButtons: {
        marginTop: 30,
        width: "100%",
    },
    button: {
        backgroundColor: colors.red,
        width: "80%",
        alignSelf: "center",
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        color: "#fff",
        borderRadius: 40
    },
    textButton: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "500"
    },
    textError: {
        width: "90%",
        alignSelf: "center",
        textAlign: "center",
        color: colors.red,
    }
})

export default Register;