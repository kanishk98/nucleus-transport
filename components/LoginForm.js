import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import Constants from '../Constants';

export default class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    signInButton: {
        width: 200,
        height: 48
    },
    instructions: {
        fontFamily: 'Roboto',
        color: Constants.primaryColor,
        marginBottom: 16,
        fontSize: 18,
        fontWeight: 'bold'
    }
});