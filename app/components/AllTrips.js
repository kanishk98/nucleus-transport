import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, ImageBackground, Text, Dimensions } from 'react-native';
import BusCard from './BusCard';
import Constants from '../Constants';
import { renderIf } from './renderIf';
import { Header } from 'react-native-elements';

export default class AllTrips extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title')
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
        this.fetchItems();
    }

    _keyExtractor = (item, index) => {
        return item._id;
    }

    fetchItems = () => {
        const { currentPage } = this.state;
        const url = 'http://' + Constants.transportIp + '/get-buses?perPage=5&currentPage=' + currentPage;
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
                this.setState({ data: data });
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err });
            });
    }

    _onRefresh = () => {
        this.fetchItems();
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

    componentDidMount() {
        this.props.navigation.setParams({ title: 'All trips' });
    }

    render() {
        const { error, data } = this.state;
        if (!data) {
            return (
                <ImageBackground imageStyle={styles.image} style={styles.background} source={require('../assets/background.jpg')}>
                    <ActivityIndicator color={Constants.primaryColor} />
                </ImageBackground>
            );
        }
        return (
            renderIf(
                !error,
                <ImageBackground imageStyle={styles.image} style={styles.background} source={require('../assets/background.jpg')}>
                    <View style={styles.container}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <BusCard navigation={this.props.navigation} item={item} />}
                            keyExtractor={this._keyExtractor}
                            onEndReached={this.fetchItems}
                            onEndReachedThreshold={0.40}
                            refreshing={false}
                            onRefresh={this._onRefresh}
                        />
                    </View>
                </ImageBackground>,
                <ImageBackground imageStyle={styles.image} style={styles.background} source={require('../assets/background.jpg')}>
                    <View style={styles.container}>
                        <BusCard item={{ title: "Student over?", price: "404", seats: "We couldn't fetch your data.", type: "Failed request" }} />
                    </View>
                </ImageBackground>
            )
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    background: {
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
    },
    image: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
})