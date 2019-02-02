import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform  } from 'react-native';
import SingleHeaderComponent from '../components/SingleHeaderComponent';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import ShopTimeOnComponent from '../components/ShopTimeOnComponent';
class ClickMapShopScreen extends PureComponent {
    static navigationOptions = {
        header: null
    }
    render() {
        const {
            container,
            mapViewStyle,
            mapView,
            locationStyle,
            textLocation,
            buttonClick,
            clickLocation,
            textButton
        } = styles;
        const { params } = this.props.navigation.state;
        const item = params.item;
        return (
            <View style={container}>
                <SingleHeaderComponent
                    iconLeft='md-close'
                    text={item.title_shop}
                    onBackPress={() => { this.clickBack() }}
                />
                <View style={mapViewStyle}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        minZoomLevel={15}
                        style={mapView}
                    >
                        <Marker
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                            }}
                        >
                            <Callout>
                                <Text style={{ textAlign: 'center' }}>{item.title_shop}</Text>
                            </Callout>
                        </Marker>
                    </MapView>
                    <View style={locationStyle}>
                        <Image
                            style={{ width: 30, height: 30, marginLeft: 10 }}
                            source={require('../icon/location.png')}
                        />
                        <Text style={textLocation}>{item.detailed_location}</Text>
                    </View>
                    <View style={buttonClick}>
                        <TouchableOpacity
                            style={clickLocation}
                        >
                            <Text style={textButton}>Chỉ đường tới đây</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ShopTimeOnComponent
                    numberTime={item.time_open}
                    numberContact={item.number_contact}
                />
            </View>
        );
    }
    clickBack() {
        this.props.navigation.goBack()
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    mapViewStyle: {
        flex: 1,
        backgroundColor: 'white'
    },
    mapView: {
        flex: 1,
        margin: 10,
        marginTop: -10
    },
    locationStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'95%',
        padding:5
    },
    textLocation: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    buttonClick: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    clickLocation: {
        width: '85%',
        borderWidth: 2,
        borderRadius: 5,
    },
    textButton: {
        textAlign: 'center',
        fontSize: 18,
        padding: 10,
    }
})
export default ClickMapShopScreen;