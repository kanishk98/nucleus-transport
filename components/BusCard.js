import React from 'react';
import { PricingCard, Button } from 'react-native-elements';

export default class BusCard extends React.PureComponent {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PricingCard
                title={this.props.title || 'Oops. Something went wrong.'}
                price='Rs. 100'
                button={{title: 'Book now'}}
            />
        );
    }
}