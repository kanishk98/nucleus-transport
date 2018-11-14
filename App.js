import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import AllTrips from './components/AllTrips';
import Constants from './Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const allTrips = createStackNavigator({
  AllTrips: {
    screen: AllTrips,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })
  },
});

const orders = createStackNavigator({
  Orders: {
    screen: Orders, 
    navigationOptions: ({navigation}) => ({
      header: null,
    })
  },
});

const rootNavigator = createBottomTabNavigator({
  AllTrips: {
    screen: allTrips, 
  },
  Orders: {
    screen: orders,
  },
  navigationOptions: ({navigation}) => {
    tabBarIcons: ({focused, horizontal, tintColor}) => {
      const {routeName} = navigation.state;
      if (routeName == 'AllTrips') {
        return <FontAwesome name={'bus'} size={30} color={tintColor} />;
      } else if (routeName == 'Orders') {
        return <FontAwesome name={'list'} size={30} color={tintColor} />;
      } else {
        // TODO: expect app to crash if this happens. Handle appropriately. 
      }
    }
  },
  tabBarOptions: {
    activeTintColor:  Constants.primaryColor,
    showLabel: false, 
  },
});

export default class App extends React.PureComponent {
  render() {
    return (
      <rootNavigator />
    );
  }
}