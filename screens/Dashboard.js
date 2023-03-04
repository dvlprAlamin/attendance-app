import { useNavigation } from '@react-navigation/core'
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BottomNavigation } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, firebaseConfig } from "../firebase/firebase.config";
import AttendanceListTable from '../src/components/dashboard/AttendanceListTable'
import BottomTab from '../src/components/dashboard/BottomTab'
import Header from '../src/components/dashboard/Header'
const Dashboard = () => {
    const navigation = useNavigation();
    const handleLogout = () => {
        signOut(auth).then(res => {
            navigation.replace("Login")
        })
    }
    return (
        <>
            <Header />
            {/* <Text>Dashboard</Text> */}
            {/* <AttendanceListTable /> */}
            <BottomTab />
        </>
    )
}

export default Dashboard

const styles = StyleSheet.create({

})