import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import RNAccountKit from 'react-native-facebook-account-kit';
import { routeName } from '../config/Constant';
import asyncStorage from '../data/Asyncstorage';
import OneSignal from 'react-native-onesignal';
class MnsScreen extends PureComponent {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props)
        this.state = {
            accid: '',
            clientID: '',
            data: [],
            api_token: [],
            userId: '',
            number_phone: '',
            app_name: ''
        }
        this.buttonOnClick = this.buttonOnClick.bind(this)
    }
    componentWillMount() {
        OneSignal.addEventListener('ids', this.onIds = (device) => {
            this.setState({
                userId: device.userId
            })
        });
        OneSignal.configure();
        fetch(`http://appmns.yez.vn/api/mns_app_users`)
            .then((res) => res.json())
            .then((res) => {
                let data = res.data;
                let api_token = data.map(function (item) {
                    return item.api_token;
                });
                this.setState({ api_token });
                console.log(this.state.api_token);
            })
            .catch((error) => {
                console.error(error);
            });
        RNAccountKit.configure({
            responseType: 'token', // 'token' by default,
            titleType: 'login',
            initialPhoneCountryPrefix: '+84', // autodetected if none is provided
            initialPhoneNumber: '869261198',
        })
    }
    render() {
        const {
            containter,
            logoStyle,
            content,
            textinputStyle,
            clickButton,
            textButton
        } = styles;
        return (
            <SafeAreaView style={containter}>
                <View style={logoStyle}>
                    <Image
                        source={require('../images/logomsn.jpeg')}
                        style={{ height: 100, width: 180 }}
                    />
                </View>
                <View style={content}>
                    <TextInput
                        placeholder={'Nhập mã khách hàng'}
                        style={textinputStyle}
                        value={this.state.token}
                        onChangeText={text => this.setState({ clientID: text })}
                    />
                    <TouchableOpacity
                        style={clickButton}
                        onPress={this.buttonOnClick}
                    >
                        <Text style={textButton}>Truy cập ứng dụng</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
    buttonOnClick() {
        const { clientID, api_token } = this.state;
        if (api_token.indexOf(clientID) < 0) {
            Alert.alert(
                'Thông báo',
                'Mã của bạn không tồn tại, vui lòng đăng ký tài khoản',
                [
                    {
                        text: 'OK', onPress: () => RNAccountKit.loginWithPhone()
                            .then((token) => {
                                if (token) {
                                    this.setState({
                                        accid: token.token,
                                        clientID: token.accountId
                                    })
                                    asyncStorage.saveAccountId(this.state.accid)
                                    asyncStorage.saveClientID(this.state.clientID)
                                    this.props.navigation.replace(routeName.StackUpdateInformationScreen)
                                    console.log(token.accountId)
                                } else {
                                    console.log(token)
                                }
                            })
                    }
                ]
            )
        } else {
            console.log('ma dung')
            fetch(`http://appmns.yez.vn/api/mns_app_users?api_token=${this.state.clientID}`)
                .then((res) => res.json())
                .then((res) => {
                    let data = res.data;
                    let app_name = [];
                    let number_phone = [];
                    data.map((item) => {
                        app_name.push(item.app_name)
                        number_phone.push(item.number_phone)
                    });
                    this.setState({
                        app_name: app_name[0],
                        number_phone: number_phone[0]
                    });
                    asyncStorage.saveNameText(this.state.app_name);
                    asyncStorage.saveNumberText(this.state.number_phone);
                    asyncStorage.saveClientID(this.state.clientID)
                    this.props.navigation.replace(routeName.StackHomeScreen)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}
const styles = StyleSheet.create({
    containter: {
        flex: 1,
        backgroundColor: 'white'
    },
    logoStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textinputStyle: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 3,
        borderRadius: 6,
        textAlign: 'center',
        width: 250,
        height: 50,
    },
    clickButton: {
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
})
export default MnsScreen;