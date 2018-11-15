import React from 'react';
import {SectionList, FlatList, StyleSheet} from 'react-native';
import BusCard from './BusCard';
import Constants from '../Constants';
import { renderIf } from './renderIf';

export default class AllTrips extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
        this.fetchInitialBuses();
    }

    fetchInitialBuses = () => {
        fetch(Constants.transportIp + '/get-buses')
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            this.setState({error: err});
        });
    }

    render() {
        const { error } = this.state;
        return (
            renderIf(
                !!error,
                <View style={styles.container}>
                    <BusCard />
                </View>,
                <View style={styles.container}>
                    <BusCard />
                </View>
            )
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})