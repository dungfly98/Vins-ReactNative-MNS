import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, Platform  } from 'react-native';
import SingleHeaderComponent from '../components/SingleHeaderComponent';
import FlastListNewComponent from '../components/FlastListNewComponent';
class FeaturedNewsScreen extends PureComponent {
    static navigationOptions = {
        header: null
    }
    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <SingleHeaderComponent
                    iconLeft='md-arrow-round-back'
                    text='Tin tức nổi bật'
                    onBackPress={() => { this.onBackClick() }}
                />
                <FlastListNewComponent
                    onClick={(item) => { this.onClickNew(item) }}
                    dataNews={false}
                />
            </View>
        );
    }
    onBackClick() {
        this.props.navigation.goBack()
    }
    onClickNew(item) {
        fetch(`http://appmns.yez.vn/${item.id}`)
        alert('Click New')
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1,
    }
})
export default FeaturedNewsScreen;