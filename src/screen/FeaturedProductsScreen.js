import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, Platform  } from 'react-native';
import SingleHeaderComponent from '../components/SingleHeaderComponent';
import FlastListProductComponent from '../components/FlastListProductComponent';
import { routeName } from '../config/Constant';
class FeaturedProductsScreen extends PureComponent {
    static navigationOptions = {
        header: null
    }
    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <SingleHeaderComponent
                    iconLeft='md-arrow-round-back'
                    text='Sản phẩm nổi bật'
                    onBackPress={() => { this.onBackClick() }}
                />
                <FlastListProductComponent
                    onClick={(item) => { this.clickProduct(item) }}
                    all={false}
                    dataProducts={false}
                />
            </View>
        );
    }
    onBackClick() {
        this.props.navigation.goBack()
    }
    clickProduct(item) {
        this.props.navigation.navigate(routeName.StackClickProductScreen, params = { item })
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1,
    }
})
export default FeaturedProductsScreen;