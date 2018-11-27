import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LoginForm from './LoginForm';

export default class LoginScreen extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/logo.jpg')}
                        style={styles.logo}
                    />
                </View>
                <LoginForm navigation={this.props.navigation} />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        marginTop: 40,
        justifyContent: 'center',
        flexGrow: 1,
        alignItems: 'center'
    },
    logo: {
        height: 200,
        width: 200
    }
});