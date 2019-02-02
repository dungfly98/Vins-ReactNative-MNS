import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Left } from 'native-base'
import asyncStorage from '../data/Asyncstorage';
class ViewNoti extends PureComponent {
    render() {
        return (
            <View style={{
                width: 18, height: 18, borderRadius: 18 / 2,
                position: 'absolute', right: 0, backgroundColor: 'red'
            }}>
                <Text style={{
                    color: 'white',
                    textAlign: 'center'
                }}>{this.props.numberNoti}</Text>
            </View>
        )
    }
}
class HeaderComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            app_name: '',
            number_phone: '',
            accId: '',
            numberNoti: '',
        }
    }
    componentDidMount() {
        this.getClientID();

    }
    async getClientID() {
        try {
            const accId = await asyncStorage.getClientID();
            if (accId !== null) {
                this.getApiAccountId(accId)
                this.setState({ accId })
            }
        } catch (error) {
            console.log(error)
        }
    };
    getApiAccountId(id) {
        fetch(`http://appmns.yez.vn/api/mns_app_users?api_token=${id}`)
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
                    app_name,
                    number_phone
                });
                console.log(this.state.number_phone)
                fetch(`http://appmns.yez.vn/api/mns_list_notifications?number=${this.state.number_phone}`)
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res)
                        let ok = res.data;
                        let okx = ok.filter(item => item.status === "true");
                        const length = okx.length;
                        this.setState({
                            numberNoti: length
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        const {
            container,
            clickContant,
            iconContact,
            leftHeader,
            textHeader,
            nameText,
            numberText,
            rightHeader,
            clickNotification,
            iconNotification,
        } = styles;
        return (
            <View style={container}>
                <View style={leftHeader}>
                    <TouchableOpacity style={clickContant} onPress={this.props.onContant}>
                        <Icon
                            name='md-contact'
                            style={iconContact}
                        />
                    </TouchableOpacity>
                    <View style={textHeader}>
                        <Text style={nameText}>{this.state.app_name}</Text>
                        <Text style={numberText}>{this.state.number_phone}</Text>
                    </View>
                </View>
                <View style={rightHeader}>
                    <TouchableOpacity style={clickNotification} onPress={this.props.onNotification}>
                        <Icon
                            name='md-notifications'
                            style={iconNotification}
                        />
                        {this.state.numberNoti >= 1 ? <ViewNoti numberNoti={this.state.numberNoti} /> : null}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    leftHeader: {
        marginLeft: 10,
        flexDirection: 'row'
    },
    clickContant: {
        marginRight: 15,
        justifyContent: 'center'
    },
    iconContact: {
        fontSize: 50,
        color: 'black'
    },
    textHeader: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    numberText: {
        fontSize: 15,
    },
    rightHeader: {
        justifyContent: 'center',
        marginRight: 10,
    },
    clickNotification: {
        flexDirection: 'row',
    },
    iconNotification: {
        fontSize: 40
    },
})
export default HeaderComponent;