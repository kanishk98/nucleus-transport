import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Card } from 'react-native-elements';
import Constants from '../Constants';

export default class OrderCard extends React.PureComponent {

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
            <Card
                containerStyle={this.props.item.waitlisted? styles.waitlisted : styles.container}
                title={this.props.item.title || 'Loading title...'}
                info={[this.props.item.seats || 0 + ' seats available', this.props.item.type || 'Weekend bus']}
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
        backgroundColor: 'rgba(124, 220, 0, 50)'
    },
    waitlisted: {
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
        paddingRight: DEVICE_WIDTH / 5,
        paddingLeft: DEVICE_WIDTH / 5,
        backgroundColor: 'rgba(255, 255, 51, 50)'
    },
    button: {
        paddingRight: DEVICE_WIDTH/6,
        paddingLeft: DEVICE_WIDTH/6,
        borderRadius: 10,
    }
});