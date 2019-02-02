import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Platform, TouchableOpacity, Alert } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { routeName } from '../config/Constant';
import OneSignal from 'react-native-onesignal';
import axios from 'axios';
import asyncStorage from '../data/Asyncstorage';
class SettingScreen extends PureComponent {
    static navigationOptions = {
        title: 'Cài đặt',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../icon/settings-work-tool.png')}
                style={[styles.iconHome, { tintColor: tintColor }]}
            />
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            player_id: '',
        }
    }
    componentDidMount() {
        OneSignal.addEventListener('ids', this.onIds = (device) => {
            console.log('Device info: ', device.userId);
            this.setState({
                player_id: device.userId
            })
        });
        OneSignal.configure();
    }
    render() {
        const { container, contentStyle, loginOutStyle } = styles;
        return (
            <View style={container}>
                <HeaderComponent
                    onNotification={() => { this.onClickNotification() }}
                    onContant={() => { this.onContant() }}
                />
                <View style={contentStyle}>
                    <TouchableOpacity
                        onPress={() => { this.onLoginOut() }}
                        style={loginOutStyle}
                    >
                        <Text style={{ color:'white', fontSize:18 }}>login out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    onContant() {
        this.props.navigation.navigate(routeName.StackUpdateInformationScreen)
    }
    onClickNotification() {
        this.props.navigation.navigate(routeName.StackNotificationScreen)
    }
    onLoginOut() {
        const { player_id } = this.state;
        axios.delete(`http://appmns.yez.vn/api/mns_notifications/${player_id}`);
        asyncStorage.removeClientID();
        Alert.alert(
            'Thông báo',
            'Bạn đã Login Out thành công',
            [
              {text: 'ok', onPress: () => this.props.navigation.replace(routeName.StackSplashScreen)},
            ],
            { cancelable: false }
          )
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
    },
    contentStyle: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    loginOutStyle: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width:200, 
        backgroundColor:'blue', 
        height:50, 
        borderRadius:10
    }
})
export default SettingScreen;