import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase/firebase.config';

const Logout = () => {
    const navigation = useNavigation();
    const handleLogout = () => {
        signOut(auth).then(res => {
            navigation.replace("Login")
        })
    }
    return (
        <View>
            <TouchableOpacity
                onPress={handleLogout}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0782F9',
        padding: 10,
        borderRadius: 3,
        alignItems: 'center',
        marginRight: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})

export default Logout;