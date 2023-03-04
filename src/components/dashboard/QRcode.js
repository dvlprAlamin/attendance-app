import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';

const QRcode = () => {
    const [isAlreadyGenerated, setIsAlreadyGenerated] = useState(false);
    const [qrCodeData, setQrCodeData] = useState({});
    const [generate, setGenerate] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const generateQrCode = async () => {
        setIsLoading(true);
        const today = moment().format("YYYY-MM-DD");
        const data = await setDoc(doc(db, "qrcode", today), {
            code: uuidv4(),
            date: today
        });
        setGenerate(generate + 1);
        setIsLoading(false);
    }
    useEffect(() => {
        const getQrCode = async () => {
            setIsLoading(true);
            const today = moment().format("YYYY-MM-DD");
            const docRef = doc(db, "qrcode", today);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setIsAlreadyGenerated(true)
                setQrCodeData(docSnap.data())
            } else {
                setIsAlreadyGenerated(false)
            }
            setIsLoading(false);
        }
        getQrCode();
    }, [generate])
    if (isLoading) {
        return <Text>Loading...</Text>
    }
    return (
        <View>
            {
                isAlreadyGenerated ?
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>Scan QR Code</Text>
                        <QRCode
                            value={qrCodeData.code}
                            size={250}
                            color="#000000"
                            backgroundColor="#FFFFFF"
                        />
                    </View> :
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <TouchableOpacity
                            onPress={generateQrCode}
                            style={{ backgroundColor: "green", padding: 10, borderRadius: 3 }}
                        >
                            <Text style={{ color: "#fff", fontSize: 16 }}>Generate QR Code</Text>
                        </TouchableOpacity>
                    </View>
            }

        </View>
    );
};

export default QRcode;