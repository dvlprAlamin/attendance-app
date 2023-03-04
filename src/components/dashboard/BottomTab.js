import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AttendanceList from './AttendanceList';
import QRcode from './QRcode';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTab() {
    return (
        <Tab.Navigator
            initialRouteName="Attendance"
            activeColor="green"
        >
            <Tab.Screen
                name="Attendance"
                component={AttendanceList}
                options={{
                    tabBarLabel: 'Attendance',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="table" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={QRcode}
                options={{
                    tabBarLabel: 'QR Code',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="qrcode" color={color} size={26} />
                    ),

                }}
            />
        </Tab.Navigator>
    );
}