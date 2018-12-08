import React from 'react';
import {Alert} from 'react-native';

export default class ConfirmOrder extends React.PureComponent {

    /*
    places bus order and informs user if he's in waitlist or confirmed
    also sets up notification listeners for waitlist
    */
    
    _placeOrder = () => {
        let ticket = this.props.navigation.getParams('title');
        console.log(ticket);
    }
    
    componentWillMount() {
        Alert.alert(
            'Confirm order',
            'Are you sure you want to book this bus?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this._placeOrder},
            ],
            { cancelable: false }
        );
    }
    render() {
        return null;
    }
}