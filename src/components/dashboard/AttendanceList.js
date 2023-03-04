import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { db } from '../../../firebase/firebase.config';
import AttendanceListTable from './AttendanceListTable';

const AttendanceList = () => {
    const [attendance, setAttendance] = useState([]);
    useEffect(() => {
        const getAttendance = async () => {
            // const querySnapshot = await getDocs(collection(db, "attendance", "2023-03-02", "test@gmail.com"));
            // const data = [];
            // querySnapshot.forEach((doc) => {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.id, " => ", doc.data());
            //     data.push(doc.data())
            // });
            // setAttendance(data);
            const q = query(collection(db, "attendance"));
            const querySnapshot = await getDocs(q);
            const data = []
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data() })
            });
            setAttendance(data);
        }
        getAttendance();
    }, [])
    console.log('====================================');
    console.log(attendance);
    console.log('====================================');
    return (
        <View>
            <AttendanceListTable />
        </View>
    );
};

export default AttendanceList;