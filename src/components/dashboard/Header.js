import * as React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import Logout from '../Logout';

const Header = () => (
    <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => { }} /> */}
        <Appbar.Content title="Dashboard" />
        <Logout />
    </Appbar.Header>
);

export default Header;