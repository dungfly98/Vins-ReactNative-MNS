import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
class SingleHeaderComponent extends PureComponent {
    render() {
        const {
            container,
            leftHeader,
            rightHeader,
            iconHeaderStyle,
            textHeaderStyle
        } = styles;
        return (
            <View style={container}>
                <View style={leftHeader}>
                    <TouchableOpacity onPress={this.props.onBackPress}>
                        <Icon
                            name={this.props.iconLeft}
                            style={iconHeaderStyle}
                        />
                    </TouchableOpacity>
                    <Text style={textHeaderStyle}>{this.props.text}</Text>
                </View>
                <View style={rightHeader}>
                    <TouchableOpacity onPress={this.props.onCheck}>
                        <Icon
                            name={this.props.iconRight}
                            style={iconHeaderStyle}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        height: 60,
        alignItems: 'center',
    },
    leftHeader: {
        flex: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textHeaderStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    rightHeader: {
        flex: 4,
        alignItems: 'flex-end',
    },
    iconHeaderStyle: {

    },
})
export default SingleHeaderComponent;