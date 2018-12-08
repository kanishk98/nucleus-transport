import React from 'react';
import {View, Alert, StyleSheet, Dimensions} from 'react-native';
import {Card} from 'react-native-elements';
import Constants from '../Constants';

export default class ConfirmOrder extends React.PureComponent {

    /*
    places bus order and informs user if he's in waitlist or confirmed
    also sets up notification listeners for waitlist
    */

    // TODO: find a suitable humans image for all use cases of waitlisted and confirmed

    constructor(props) {
        super(props);
        this.state = {
            confirmed: false, 
            waitlisted: false,
        }
    }
    
    _placeOrder = () => {
        let ticket = this.props.navigation.getParams('ticket');
        console.log(ticket);
    }
    
    render() {
        const {confirmed, waitlisted} = this.state;
        if (!waitlisted && !confirmed) {
            return (
                <View style={styles.container}>
                <Card
                    title={'Saving you a seat'}
                    containerStyle={{width: Dimensions.get('window').width}}
                >
                </Card> 
                </View>
            );
        } else if (!confirmed && waitlisted) {
            return (
                <View style={styles.container}>
                <Card
                    title={"We've got you on a waitlist."}
                >
                </Card> 
                </View>
            );
        } else if (confirmed) {
            return (
                <View style={styles.container}>
                <Card
                    title={'Yay! Your ticket has been booked.'}
                >
                </Card> 
                </View>
            )
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    }
})