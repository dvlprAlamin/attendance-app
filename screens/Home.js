import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase.config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { checkTodaysAttendance } from '../service/attendanceService';
import moment from "moment";

export default function Home() {
    const [text, setText] = useState("");
    const [scanned, setScanned] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [isTodayScanned, setIsTodayScanned] = useState(false);
    const [todaysData, setTodaysData] = useState({})
    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }
    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);
    // What happens when we scan the bar code
    useEffect(() => {
        const checkAttendance = async () => {
            const data = await checkTodaysAttendance(auth.currentUser?.email);
            if (data.length > 0) {
                setIsTodayScanned(true);
                setTodaysData(data[0])
            } else {
                setIsTodayScanned(false);
            }
            // console.log("asdf", data);
        }
        checkAttendance()
    }, [scanned])
    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        console.log("currentUser", auth.currentUser?.email);
        setText(data)
        // console.log('Type: ' + type + '\nData: ' + data)
        const docRef = await addDoc(collection(db, "attendance", moment().format("YYYY-MM-DD"), auth.currentUser?.email), {
            email: auth.currentUser?.email,
            createdAt: moment().format("hh:mm:ss a")
        });
        // alert("Attendance added successful")
    };
    // console.log(todaysData);
    // Check permissions and return the screens 
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }
    return (
        <View style={styles.container}>
            {
                isTodayScanned ?
                    <>
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>Todays attendance done.</Text>
                        <Text style={{ fontSize: 16 }}>Scanned Time: {todaysData?.createdAt}</Text>
                    </> :
                    <>
                        {
                            <>
                                <Text style={{ fontSize: 20, marginBottom: 20 }}>Scan QR code for attendance.</Text>
                                <View style={styles.barCodeBox}>
                                    <BarCodeScanner
                                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                        style={{ height: 400, width: 400 }} />
                                </View>

                            </>

                        }
                    </>
            }

            {/* <Button onPress={() => setScanned(false)} color="tomato" title='scan' /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barCodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    },
    scanButton: {
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: "tomato"
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});
