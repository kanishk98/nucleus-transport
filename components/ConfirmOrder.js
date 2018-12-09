import React from "react";
import { View, AsyncStorage, StyleSheet, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import Constants from "../Constants";

export default class ConfirmOrder extends React.PureComponent {
    /*
    places bus order and informs user if he's in waitlist or confirmed
    also sets up notification listeners for waitlist
    */

    // TODO: find a suitable humans image for all use cases of waitlisted and confirmed

    constructor(props) {
        super(props);
        this.state = {
            confirmed: false,
            waitlisted: false
        };
    }

    _placeOrder = async () => {
        let ticket = this.props.navigation.getParam("ticket");
        console.log("Ticket: " + JSON.stringify(ticket));
        let order = ticket;
        const user = await AsyncStorage.getItem(Constants.UserObject);
        const userId = JSON.parse(user).firebaseId;
        order.userId = userId;
        console.log(order);
        fetch("http://" + Constants.transportIp + "/add-order-bus", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order),
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    componentWillMount() {
        this._placeOrder();
    }

    render() {
        const { confirmed, waitlisted } = this.state;
        if (!waitlisted && !confirmed) {
            return (
                <View style={styles.container}>
                    <Card
                        title={"Saving you a seat"}
                        containerStyle={{
                            width: Dimensions.get("window").width
                        }}
                    />
                </View>
            );
        } else if (!confirmed && waitlisted) {
            return (
                <View style={styles.container}>
                    <Card title={"We've got you on a waitlist."} />
                </View>
            );
        } else if (confirmed) {
            return (
                <View style={styles.container}>
                    <Card title={"Yay! Your ticket has been booked."} />
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
