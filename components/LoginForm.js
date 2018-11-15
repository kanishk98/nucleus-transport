import React from 'react';
import { View, Text, AsyncStorage, StyleSheet, ActivityIndicator } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import Constants from '../Constants';
import { renderIf } from './renderIf';
import firebase from 'react-native-firebase';

export default class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            progress: false,
        };
    }

    verifyMail = (email) => {
        if (email == 'nucleus.communicator@gmail.com') {
            return true;
        }
        const index = email.indexOf('snu.edu.in');
        if (index != -1) {
            // snu mail
            const char1 = email.charAt(0);
            const char2 = email.charAt(1);
            const char3 = email.substring(2, 5);
            if (char1.toLowerCase() != char1.toUpperCase() && char2.toLowerCase() != char2.toUpperCase() && /^\d+$/.test(char3)) {
                return true;
            }
        }
        return false;
    }

    signIn = async () => {
        try {
            this.setState({ progress: true });
            let signedInUser = await GoogleSignin.signIn();
            if (signedInUser.user.email !== null && this.verifyMail(signedInUser.user.email)) {
                console.log('Valid student');
                console.log(JSON.stringify(signedInUser));
                this.setState({ user: signedInUser, error: null, progress: true, loggedIn: true });
                // authenticating with Firebase
                const firebaseCredential = firebase.auth.GoogleAuthProvider.credential(signedInUser.idToken,
                    signedInUser.accessToken);
                const firebaseUser = await firebase.auth().signInAndRetrieveDataWithCredential(firebaseCredential);
                let newUser = {
                    firebaseId: firebaseUser.user.uid,
                    username: firebaseUser.user.displayName,
                };
                this.resolveUser(newUser);
            } else {
                console.log('Signing out user');
                console.log(await GoogleSignin.signOut());
                this.configureGoogleSignIn();
                this.signOut();
            }
        } catch (error) {
            console.log(error);
            if (error.code == 'CANCELED') {
                error.message = 'User canceled login';
            }
            this.setState({ user: null, error: error, progress: false, loggedIn: false });
        }
    };

    resolveUser = async (newUser) => {
        console.log(newUser);
        await AsyncStorage.setItem(Constants.UserObject, JSON.stringify(newUser));
        this.props.navigation.navigate('App', { user: newUser });
    }

    async signOut() {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null, error: null, progress: false, loggedIn: false });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    };

    async configureGoogleSignIn() {
        // TODO: SOME ANDROID PHONES MAY NOT HAVE PLAY SERVICES. DISPLAY ERROR MESSAGE THERE.
        // always returns true on iOS
        const hasPlayServices = await GoogleSignin.hasPlayServices();
        console.log('Play Services: ' + JSON.stringify(hasPlayServices));
        if (hasPlayServices) {
            await GoogleSignin.configure({
                iosClientId: Constants.iosClientId,
                webClientId: Constants.webClientId,
                offlineAccess: false,
            });
        }
    }

    async componentDidMount() {
        await this.configureGoogleSignIn();
    }

    render() {
        const user = this.state.user;
        if (!user) {
            return (
                <View style={styles.container}>
                    <Text style={styles.instructions}>Only SNU accounts allowed.</Text>
                    {renderIf(!this.state.progress, <GoogleSigninButton
                        style={styles.signInButton}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={this.signIn}
                    />, <ActivityIndicator />)}
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.instructions}>
                        {user.user.email}
                    </Text>
                    <ActivityIndicator />
                </View>
            );
        }
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
        color: Constants.primaryColor,
        marginBottom: 16,
        fontSize: 18,
        fontWeight: 'bold'
    }
});