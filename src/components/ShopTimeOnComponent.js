import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
class ShopTimeOnComponent extends PureComponent {
    render() {
        const {
            container,
            textHeader,
            timeonStyle,
            textStyle,
            numberStyle,
            contactStyle
        } = styles;
        return (
            <View style={container}>
                <Text style={textHeader}>Chi tiết</Text>
                <View style={timeonStyle}>
                    <Text style={textStyle}>Giờ mở cửa</Text>
                    <Text style={numberStyle}>{this.props.numberTime}</Text>
                </View>
                <View style={contactStyle}>
                    <Text style={textStyle}>Liên hệ</Text>
                    <Text style={numberStyle}>{this.props.numberContact}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textHeader: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10
    },
    timeonStyle: {
        backgroundColor: 'white',
        marginTop: 20
    },
    textStyle: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 10
    },
    numberStyle: {
        marginLeft: 10,
        fontSize: 18,
        marginTop: 5,
        marginBottom: 10,
    },
    contactStyle: {
        backgroundColor: 'white',
        marginTop: 1
    }
})
export default ShopTimeOnComponent;