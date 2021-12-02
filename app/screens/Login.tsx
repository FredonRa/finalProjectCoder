import React, { useState } from 'react';
import { 
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { useDispatch } from 'react-redux';

import colors from "../constants/colors";
import { login } from '../redux/actions/actions';

const Login = ({navigation}) => {
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("null");
    const [errorMail, setErrorMail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const dispatch = useDispatch();
    
    function isEmail(email: string) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(email)){
            return false;
        } else {
            return true;
        }
    }

    const submitForm = async () => {
        let user = {
            email: email,
            password: password
        }
        let formReady = true;
        if (!email) {
            formReady = false;
            setErrorMail("Debe ingresar su dirección de e-mail para continuar")
        } else if (!isEmail(email)) {
            formReady = false;
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

        if (formReady) {
            dispatch(login(user))
        }
    }

    return (  
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>ChatAPP</Text>
            <View style={styles.form}>
                <TextInput 
                placeholder="Email" 
                placeholderTextColor="#fff" 
                style={styles.input} 
                onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.textError}>{errorMail}</Text>
                <TextInput 
                placeholder="Contraseña" 
                placeholderTextColor="#fff" 
                style={styles.input} 
                onChangeText={(text) => setPassword(text)}
                />
                <Text style={styles.textError}>{errorPassword}</Text>
            </View>
            <View style={styles.containerButtons}>
                <TouchableOpacity 
                style={styles.button} 
                onPress={() => submitForm()}
                >
                    <Text style={styles.textButton}>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.button, {backgroundColor: "transparent", marginTop: 20}]}
                onPress={() => navigation.navigate("Register")}                
                >
                    <Text style={styles.textButton}>¿No tenes cuenta? Registrate</Text>
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

export default Login;