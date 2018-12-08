import React from 'react';
import { StyleSheet, Dimensions, View, Alert } from 'react-native';
import { PricingCard, Button } from 'react-native-elements';
import Constants from '../Constants';

export default class BusCard extends React.PureComponent {

    constructor(props) {
        super(props);
        this.item = this.props.item;
        console.log(this.props.item);
        let item = this.item;
        item.title = this.props.item.from + " to " + this.props.item.to;
        item.info = this.props.item.seats + ' seats available';
        item.buttonTitle = 'Book now';
    }

    _onClick = () => {
        if (this.props.item.buttonTitle) {
            Alert.alert(
                'Confirm order',
                'Are you sure you want to book this bus?',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => this.props.navigation.navigate('ConfirmOrder', { ticket: this.props.item })},
                ],
                { cancelable: false }
            );
        }
    }

    render() {
        return (
            <PricingCard
                containerStyle={styles.container}
                title={this.item.title || 'Loading title...'}
                color={Constants.primaryColor}
                price={'Rs. ' + this.item.price || '0'}
                info={[this.item.info]}
                button={{ title: this.item.buttonTitle || "You're offline.", buttonStyle: styles.button }}
                onButtonPress={this._onClick}
            />
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
        paddingRight: DEVICE_WIDTH / 5,
        paddingLeft: DEVICE_WIDTH / 5,
    },
    button: {
        borderRadius: 10,
    }
});