import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, Platform  } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { routeName } from '../config/Constant';
import FlastListNewComponent from '../components/FlastListNewComponent';
class NewScreen extends PureComponent {
    static navigationOptions = {
        title: 'Tin tức',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../icon/newspaper.png')}
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
                <FlastListNewComponent 
                    onClick={(item) => {this.onClickNew(item)}}
                    dataNews={true}
                />
            </View>
        );
    }
    onContant() {
        this.props.navigation.navigate(routeName.StackUpdateInformationScreen)
    }
    onClickNotification() {
        this.props.navigation.navigate(routeName.StackNotificationScreen)
    }
    onClickNew(item) {
        fetch(`http://appmns.yez.vn/mns_all_news/${item.id}`)
        alert('Click New')
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1,
    },
    iconHome: {
        height: 26,
        width: 26
    }
})
export default NewScreen;