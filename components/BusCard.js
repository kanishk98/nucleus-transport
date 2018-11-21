import React from 'react';
import { StyleSheet } from 'react-native';
import { PricingCard } from 'react-native-elements';
import Constants from '../Constants';

export default class BusCard extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <PricingCard
                containerStyle={styles.container}
                title={this.props.title || 'Loading title...'}
                color={Constants.primaryColor}
                price={this.props.price || 'Rs. ur_mom'}
                info={[this.props.seats || 0 + ' seats available', this.props.type || 'Weekend bus']}
                button={{title: this.props.buttonTitle || 'Book now'}}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
    }
});