import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import SingleHeaderComponent from '../components/SingleHeaderComponent';
import FlastListNotiComponent from '../components/FlastListNotiComponent';
class NotificationScreen extends PureComponent {
    static navigationOptions = {
        header: null
    }
    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <SingleHeaderComponent
                    iconLeft='md-close'
                    text='Thông báo'
                    onBackPress={() => { this.onBackClick() }}
                    iconRight='md-checkbox-outline'
                    onCheck={() => { this.onCheckClick() }}
                />
                <FlastListNotiComponent
                    click={() => { this.onClickNoti() }}
                />
            </View>
        );
    }
    onClickNoti() {
        alert('ok')
    }
    onBackClick() {
        this.props.navigation.goBack()
    }
    onCheckClick() {
        alert('Click on Check')
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1,
    }
})
export default NotificationScreen;