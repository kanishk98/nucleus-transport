import React from 'react';
import { Card } from 'react-native-elements';

export default class BusCard extends React.PureComponent {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card
                title={this.props.title || 'Oops. Something went wrong.'}
            />
        );
    }
}