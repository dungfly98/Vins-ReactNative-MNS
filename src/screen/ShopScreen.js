import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { routeName } from '../config/Constant';
import FlastListMapComponent from '../components/FlastListMapComponent';
class ShopScreen extends PureComponent {
    static navigationOptions = {
        title: 'Cửa hàng',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../icon/compass-circular-variant.png')}
                style={[styles.iconHome, { tintColor: tintColor }]}
            />
        )
    }
    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <HeaderComponent
                    onNotification={() => { this.onClickNotification() }}
                    onContant={() => { this.onContant() }}
                />
                <FlastListMapComponent
                    clickMap={(item) => { this.clickMap(item) }}
                />
            </View>
        );
    }
    clickMap(item) {
        this.props.navigation.navigate(routeName.StackClickMapShopScreen, params = { item })
    }
    onContant() {
        this.props.navigation.navigate(routeName.StackUpdateInformationScreen)
    }
    onClickNotification() {
        this.props.navigation.navigate(routeName.StackNotificationScreen)
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
})
export default ShopScreen;