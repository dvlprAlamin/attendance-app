import { useNavigation } from '@react-navigation/core'
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { firebaseConfig } from "../firebase/firebase.config";
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    console.log("firebaseConfig", firebaseConfig);
    const navigation = useNavigation()
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                navigation.replace("Home")
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
        return () => {
            unsubscribe()
        }
    }, [])

    const handleSignUp = () => {
        // auth
        //   .createUserWithEmailAndPassword(email, password)
        //   .then(userCredentials => {
        //     const user = userCredentials.user;
        //     console.log('Registered with:', user.email);
        //   })
        //   .catch(error => alert(error.message))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)
        console.log("email", email, "password", password);
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                // const user = userCredentials.user;
                console.log('Logged in with:', userCredentials);
                // alert("login success!")
                setIsLoading(false);
                navigation.replace("Home")
            })
            .catch(error => {
                alert(error.message);
                setIsLoading(false);
            })
    }



    return (
        // <KeyboardAvoidingView
        //     style={styles.container}
        //     behavior="padding"
        // >
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                {isLoading && <Text>Loading...</Text>}
            </View>
        </View>
        // </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})