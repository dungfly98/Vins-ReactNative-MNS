import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
class TextHomeComponent extends PureComponent {
    render() {
        const {
            container,
            headerComponent,
            textLeft,
            textRight
        } = styles;
        return (
            <View style={container}>
                <View style={headerComponent}>
                    <Text style={textLeft}>{this.props.textLeft}</Text>
                    <TouchableOpacity onPress={this.props.onClickText}>
                        <Text style={textRight}>Xem thêm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {

    },
    headerComponent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        marginTop: 5,
    },
    textLeft: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    textRight: {
        color: 'blue',
        fontSize: 16,
    }
})
export default TextHomeComponent;