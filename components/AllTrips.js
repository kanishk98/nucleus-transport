import React from 'react';
import {SectionList, FlatList} from 'react-native';
import BusCard from './BusCard';

export default class AllTrips extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.fetchInitialBuses();
    }

    fetchInitialBuses = () => {
        
    }

    render() {
        return <BusCard />
    }
}