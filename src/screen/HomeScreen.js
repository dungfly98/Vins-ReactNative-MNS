import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Platform, Text } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import TextHomeComponent from '../components/TextHomeComponent';
import FlastListHomeNewComponent from '../components/FlastListHomeNewComponent';
import FlastListHomeProductComponent from '../components/FlastListHomeProductComponent';
import { routeName } from '../config/Constant';
import OneSignal from 'react-native-onesignal';
import asyncStorage from '../data/Asyncstorage';
import axios from 'axios';
class HomeScreen extends PureComponent {
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../icon/home.png')}
                style={[styles.iconHome, { tintColor: tintColor }]}
            />
        )
    }
    constructor(props) {
        super(props)
        this.onOpened = this.onOpened.bind(this);
        this.onReceived = this.onReceived.bind(this);
        this.state = {
            userId: '',
            app_name: '',
            number_phone: '',
            accId: ''
        }
    }
    componentWillMount() {
        this.getNumberText();
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds = (device) => {
            this.setState({
                userId: device.userId
            })
        });
        OneSignal.configure();
    }
    getNumberText() {
        asyncStorage.getNumberText().then(number_phone => {
            if (number_phone !== null) {
                this.setState({ number_phone: number_phone })
            }
        })
    }
    onReceived(notification) {
        let ok = notification.payload;
        console.log(ok)
    }

    onOpened(openResult) {
        console.log('openResult: ', openResult);
        console.log('Message: ', openResult.notification.payload.title);
        this.props.navigation.navigate(routeName.StackNotificationScreen)
    }
    render() {
        const {
            container,
        } = styles;
        return (
            <View style={container}>
                <HeaderComponent
                    onNotification={() => { this.onClickNotification() }}
                    onContant={() => { this.onContant() }}
                />
                <View style={{ flex: 1 }}>
                    <TextHomeComponent
                        textLeft='Tin tức nổi bật'
                        onClickText={() => { this.onClickTextNew() }}
                    />
                    <FlastListHomeNewComponent
                        horizontal={true}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TextHomeComponent
                        textLeft='Sản phảm nổi bật'
                        onClickText={() => { this.onClickTextProduct() }}
                    />
                    <FlastListHomeProductComponent
                        onClick={(item) => { this.clickTextProduct(item) }}
                    />
                </View>
            </View>
        );
    };
    componentDidUpdate() {
        const { userId, number_phone } = this.state;
        const user = {
            player_id: userId,
            number: number_phone,
        }
        axios.post('http://appmns.yez.vn/api/mns_notifications', user)
            .then(function (res) {
                // console.log(res)
            }).catch(function (erro) {
                console.log(erro)
            })
    }

    onContant() {
        this.props.navigation.navigate(routeName.StackUpdateInformationScreen)
    };

    onClickTextNew() {
        this.props.navigation.navigate(routeName.StackFeaturedNewsScreen)
    };

    onClickTextProduct() {
        this.props.navigation.navigate(routeName.StackFeaturedProductsScreen)
    };

    onClickNotification() {
        this.props.navigation.navigate(routeName.StackNotificationScreen)
    };

    clickTextProduct(item) {
        this.props.navigation.navigate(routeName.StackClickProductScreen, params = { item })
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1,
    },
    iconHome: {
        height: 26,
        width: 26,
    }
})
export default HomeScreen;