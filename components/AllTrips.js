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
        const url = 'http://' + Constants.transportIp + '/get-buses';
        fetch(url)
            .then(async (res) => {
                console.log(res);
                const data = await res.json();
                console.log(data);
                data.buttonTitle = 'Kanishk';
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

    componentDidMount() {
        this.props.navigation.setParams({ title: 'All trips' });
    }

    render() {
        const { error, data } = this.state;
        if (!data || data.length == 0) {
            return (
                <ImageBackground imageStyle={styles.image} style={styles.background} source={require('../assets/background.jpg')}>
                    <ActivityIndicator color={Constants.primaryColor} style={{alignSelf: 'center'}} />
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
        flex: 1,
        justifyContent: 'center',
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
        alignItems: 'center',
    },
    image: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
})