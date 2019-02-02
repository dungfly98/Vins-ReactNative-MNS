import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Platform  } from 'react-native';
import { routeName } from '../config/Constant';
import FlastListProductComponent from '../components/FlastListProductComponent';
class ProductScreen extends PureComponent {
    static navigationOptions = {
        title: 'Sản phẩm',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../icon/shopping-bag.png')}
                style={[styles.iconHome, { tintColor: tintColor }]}
            />
        )
    }
    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <FlastListProductComponent
                    onClick={(item) => { this.onClickProduct(item) }}
                    onNotification={() => { this.onClickNotification() }}
                    all={true}
                    dataProducts={true}
                />
            </View>
        );
    }
    onClickNotification() {
        this.props.navigation.navigate(routeName.StackNotificationScreen)
    }
    onClickProduct(item) {
        // order_by
        fetch(`http://appmns.yez.vn/api/mns_all_products/${item.id}`)
        this.props.navigation.navigate(routeName.StackClickProductScreen, params = { item })
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
    }
})
export default ProductScreen;