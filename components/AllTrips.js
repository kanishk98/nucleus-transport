import React from 'react';
import { View, SectionList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import BusCard from './BusCard';
import Constants from '../Constants';
import { renderIf } from './renderIf';
import { Header } from 'react-native-elements';

export default class AllTrips extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
        this._onRefresh();
    }

    _keyExtractor = (item, index) => { item._id }

    fetchItems = () => {
        const { currentPage } = this.state;
        if (this.props.orders) {
            url = null;
        } else {
            url = 'http://' + Constants.transportIp + '/get-buses?perPage=5&currentPage=' + currentPage;
        }
        fetch(url)
            .then(async (res) => {
                console.log(res);
                const data = await res.json();
                console.log(data);
                let sections = [];
                // index each section by data.date
                let prevTitle = '';
                let dataLength = data.length;
                let title = data[0].date;
                let counter = 0;
                while (counter < dataLength) {
                    if (counter != 0) {
                        prevTitle = data[counter - 1].data;
                    }
                    if (title != prevTitle) {
                        sections.push({
                            data: [data[counter]],
                            title: title,
                        });
                    } else {
                        // old section, new bus
                        let oldLast = sections[sections.length - 1];
                        oldLast.data.push(data[counter]);
                        console.log(oldLast);
                        sections.splice(-1, 1, oldLast);
                    }
                    ++counter;
                }
                if (currentPage > 1 && !!this.state.sections) {
                    // old sections are present
                    let oldSections = this.state.sections;
                    oldSections.push(sections);
                    sections = oldSections;
                }
                this.setState({ sections: sections });
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err });
            });
    }

    _onRefresh = () => {
        if (this.props.orders) {
            this.fetchOrders();
        } else {
            this.fetchBuses();
        }
    }

    _renderSectionHeader = ({ section }) => {
        return (
            <Header
                backgroundColor={Constants.primaryColor}
                placement='left'
                leftComponent={null}
                centerComponent={<Text>{section.title}</Text>}
                rightComponent={null}
            />
        );
    }

    render() {
        const { sections, error } = this.state;
        console.log(sections);
        if (!sections) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator color={Constants.primaryColor} />
                </View>
            );
        }
        return (
            renderIf(
                !error && !!sections,
                <View style={styles.container}>
                    <SectionList
                        renderSectionHeader={({ section }) => this._renderSectionHeader({ section })}
                        renderItem={({ item }) => <BusCard title={item.from} />}
                        keyExtractor={this._keyExtractor}
                        sections={sections}
                        onEndReached={this.fetchBuses}
                        onEndReachedThreshold={0.40}
                        refreshing={false}
                        onRefresh={this._onRefresh}
                    />
                </View>,
                <View style={styles.container}>
                    <BusCard title={"Student data over? We couldn't fetch bus info."} />
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