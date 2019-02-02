import React, { PureComponent } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform  } from 'react-native';
import SingleHeaderComponent from '../components/SingleHeaderComponent';
import FlastListProductComponent from '../components/FlastListProductComponent';
import { routeName } from '../config/Constant';
class YouCareScreen extends PureComponent {
    render() {
        const {
            container
        } = styles
        return (
            <View style={container}>
                <SingleHeaderComponent
                    iconLeft='md-arrow-round-back'
                    text='Có thể bạn qua tâm'
                    onBackPress={() => { this.onBack() }}
                />
                <FlastListProductComponent
                    onClick={(item) => { this.onClickProduct(item) }}
                />
            </View>
        );
    }
    onBack() {
        this.props.navigation.goBack()
    }
    onClickProduct(item) {
        // this.props.navigation.navigate(routeName.StackClickProductScreen, params={item})
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    }
})
export default YouCareScreen;