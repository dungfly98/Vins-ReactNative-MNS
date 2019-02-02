import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Text } from 'react-native';
import { Icon } from 'native-base';
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
class HeaderProductComponent extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            numberNoti: '',
        }
    }
    componentDidMount() {
        fetch(`http://appmns.yez.vn/api/mns_list_notifications`)
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
    }
    render() {
        const {
            container,
            leftHeader,
            rightHeader,
            clickNotification,
            iconNotification,
            iconSearch,
            textSearch,
        } = styles;
        if (this.props.all) {
            return (
                <View style={container}>
                    <KeyboardAvoidingView enabled='true' >
                        <View style={leftHeader}>
                            <Icon
                                name='md-search'
                                style={iconSearch}
                            />
                            <TextInput style={textSearch}
                                placeholder='Tên sản phẩm'
                                returnKeyType='go'
                                onSubmitEditing={Keyboard.dismiss}
                                onChangeText={(text) => this.props.onTextSeacher(text)}
                                style={{ height: '100%', width: '85%', marginLeft: 10 }}
                            />
                        </View>
                    </KeyboardAvoidingView>
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
        else return null
    }
    onClose() {
        this.setState({
            text: ''
        })
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
        flexDirection: 'row',
        borderWidth: 1,
        width: '85%',
        height: '70%',
        margin: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    rightHeader: {
        justifyContent: 'center',
        marginRight: 10,
    },
    iconNotification: {
        fontSize: 40
    },
    iconSearch: {
        marginLeft: 10,
    },
    textSearch: {
        margin: 10,
        width: '70%'
    }
})
export default HeaderProductComponent;