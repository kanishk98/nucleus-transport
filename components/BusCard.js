import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { PricingCard, Button } from 'react-native-elements';
import Constants from '../Constants';

export default class BusCard extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    _onClick = () => {
        if (this.props.item.buttonTitle) {
            this.props.navigation.navigate('ConfirmOrder', { ticket: this.props.item });
        }
    }

    render() {
        console.log(this.props.item);
        return (
            <PricingCard
                containerStyle={styles.container}
                title={this.props.item.title || 'Loading title...'}
                color={Constants.primaryColor}
                price={this.props.item.price || ''}
                info={[this.props.item.seats || 0 + ' seats available', this.props.item.type || 'Weekend bus']}
                button={{ title: this.props.item.buttonTitle || "You're offline.", buttonStyle: styles.button }}
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
        paddingRight: DEVICE_WIDTH/6,
        paddingLeft: DEVICE_WIDTH/6,
        borderRadius: 10,
    }
});