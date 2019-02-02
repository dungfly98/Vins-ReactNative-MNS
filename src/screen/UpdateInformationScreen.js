import React, { PureComponent } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, Platform } from 'react-native';
import { Icon, Left } from 'native-base';
import asyncStorage from '../data/Asyncstorage';
import { routeName } from '../config/Constant';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { Field, reduxForm } from 'redux-form';

//Validation
const required = value => value ? undefined : 'Required';
const maxLength15 = value => value && value.length > 15 ? `Must be 15 characters or less` : undefined;
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const isValidEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
//Warning
const over70YearsOld = value =>
    value && value > 70 ? 'You might be too old for using this' : undefined;
const isYahooMail = value =>
    value && /.+@yahoo\.com/.test(value) ? 'Really? You still use yahoo mail ?' : undefined;

const renderField = ({ underlineColorAndroid, placeholder, keyboardType, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (
        <View>
            <TextInput style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'black',
                height: 40,
                borderRadius: 5,
                paddingLeft: 10,
                paddingRight: 10,
                marginBottom: 20,
                marginTop: 10,
            }}
                keyboardType={keyboardType} onChangeText={onChange} {...restInput}
                placeholder={placeholder}
                underlineColorAndroid={underlineColorAndroid}
            >
            </TextInput>
            {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>);
};
const submit = values => {
    alert(`Validation success. Values = ~${JSON.stringify(values)}`);
}

class ContactComponent extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            address: '',
            number: '',
            accId: '',
            clientID: '',
            date: ''
        }
    }
    componentDidMount() {
        this.getAccountId();
        this.getClientID();
    }

    async getAccountId() {
        try {
            const accId = await asyncStorage.getAccountId();
            if (accId !== null) {
                this.getNumberById(accId);
                this.setState({ accId })
                // console.log(accId)
            }
        } catch (error) {
            console.log(error)
        }
    };
    getNumberById(id) {
        fetch(`https://graph.accountkit.com/v1.3/me/?access_token=${id}`)
            .then((res) => res.json())
            .then((resJson) => {
                let ok = resJson.phone.number
                let ok1 = ok.replace("+84", "0")
                // console.log(ok1)
                this.setState({
                    number: ok1
                })
                // console.log(resJson.phone.number)
            })
            .catch((error) => {
                console.error(error);
            });
    }
    async getClientID() {
        try {
            const clientID = await asyncStorage.getClientID();
            if (clientID !== null) {
                // this.getNumberById(clientID);
                this.setState({ clientID })
                // console.log(clientID)
            }
        } catch (error) {
            console.log(error)
        }
    };
    render() {
        const {
            container,
            headerStyle,
            contentStyle,
            iconContact,
            inputStyle,
            clickButtonStyle,
            buttonStyle,
            textButton
        } = styles
        return (
            <View style={container}>
                <View style={headerStyle}>
                    <TouchableOpacity onPress={() => this.clickSkip()}>
                        <Text style={{ fontSize: 18 }}>Bỏ qua</Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView behavior="position">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={contentStyle}>
                            <Icon
                                name='md-contact'
                                style={iconContact}
                            />
                            <TextInput style={inputStyle}
                                placeholder='Họ và tên'
                                returnKeyType='next'
                                onSubmitEditing={() => this.refs.textEmail.focus()}
                                value={this.state.name}
                                onChangeText={text => this.setState({ name: text })}
                            />
                            <TextInput style={inputStyle}
                                placeholder='Email...@gmail.com'
                                keyboardType='email-address'
                                returnKeyType='next'
                                ref={'textEmail'}
                                value={this.state.email}
                                onChangeText={(text) => { this.setState({ email: text }) }}
                            />
                            <DatePicker
                                showIcon={false}
                                style={{ width: '80%', marginBottom: 20, marginTop: 10, }}
                                placeholderText="123"
                                date={this.state.date}
                                mode="date"
                                placeholder="Ngày sinh"
                                format="DD-MM-YYYY"
                                minDate="01-05-1945"
                                maxDate="17-09-2018"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => { this.setState({ date: date }) }}
                                customStyles={{
                                    placeholderText: {
                                        color: 'grey',
                                        textAlign: 'left',
                                        marginRight: '70%'
                                    },
                                    dateInput: {
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        height: 40,
                                        borderRadius: 5,
                                        textAlign: 'left',
                                    },
                                    dateText: {
                                        marginRight: '70%'
                                    }
                                }}
                            />
                            <TextInput style={inputStyle}
                                placeholder='Địa chỉ'
                                returnKeyType='done'
                                ref={'textNumber'}
                                value={this.state.address}
                                onChangeText={text => this.setState({ address: text })}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <View style={clickButtonStyle}>
                    <TouchableOpacity style={buttonStyle} onPress={() => { this.clickUpdate() }}>
                        <Text style={textButton}>Cập nhập thông tin</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
    clickSkip() {
        this.props.navigation.replace(routeName.StackHomeScreen);
    }
    clickUpdate() {
        const { name, email, address, accId, date, number, clientID } = this.state;
        if (name !== '' && email !== '' && address !== '' && date !== '') {
            const user = {
                app_name: name,
                number_phone: number,
                email: email,
                address: address,
                date_of_birth: date,
                api_token: clientID,
                account_id: accId
            }
            // console.log(user);
            axios.post('http://appmns.yez.vn/api/mns_app_users', user)
                .then(res => {
                    if (res.data.status_code.code === 400) {
                        console.log(this.state.date)
                        console.log('Update Success')
                        axios.post(`http://appmns.yez.vn/api/mns_app_users/update?api_token=${accId}`, parmas = {
                            app_name: name,
                            email: email,
                            address: address,
                            date_of_birth: date,
                            api_token: clientID,
                            account_id: accId
                        })
                        asyncStorage.saveNameText(this.state.name);
                        asyncStorage.saveNumberText(this.state.number);
                        Alert.alert(
                            'Thông báo',
                            'Bạn đã cập nhập thông tin thành công',
                            [
                                { text: 'OK', onPress: () => this.props.navigation.replace(routeName.StackHomeScreen) },
                            ]
                        )
                    } else {
                        console.log('Login Success')
                        asyncStorage.saveNameText(this.state.name);
                        asyncStorage.saveNumberText(this.state.number);
                        Alert.alert(
                            'Thông báo',
                            'Bạn đã cập nhập thông tin thành công',
                            [
                                { text: 'OK', onPress: () => this.props.navigation.replace(routeName.StackHomeScreen) },
                            ]
                        )
                    }
                }).catch(erro => {
                    console.log(erro)
                })
        } else { alert('Mời bạn nhập đầy đủ thông tin') }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    headerStyle: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginTop: 10,
    },
    contentStyle: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconContact: {
        fontSize: 130,
        marginBottom: 10,
    },
    inputStyle: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'black',
        height: 40,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        marginTop: 10,
    },
    clickButtonStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    buttonStyle: {
        width: '100%',
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    textButton: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
})
const ContactForm = reduxForm({
    form: 'contact',
})(ContactComponent);

export default ContactForm;
// export default UpdateInformationScreen;