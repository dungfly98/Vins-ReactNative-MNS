import React, { PureComponent } from 'react';
import { FlatList, View, Text, requireNativeComponent } from 'react-native';
import { getApiMapsFromServer } from '../networking/Server';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
// module.exports = requireNativeComponent('RNTMap', null);
class FlastListItem extends PureComponent {
    render() {
        return (
            <View style={{ backgroundColor: 'white', margin: 1, width: 180 }}>
                <Marker
                    coordinate={{
                        latitude: this.props.item.latitude,
                        longitude: this.props.item.longitude,
                    }}
                >
                    <Callout onPress={() => this.props.clickMap(this.props.item)}>
                        <Text style={{ textAlign: 'center' }}>{this.props.item.title_shop}</Text>
                    </Callout>
                </Marker>
            </View>
        );
    }
}
class FlastListMapComponent extends PureComponent {
    constructor(props) {
        super(props)
        this.state = ({
            refreshing: false,
            mapsFromSever: [],
            latitude: null,
            longitude: null,
            error: null,
        })
    }
    componentDidMount() {
        this.refreshDataFromSever();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                console.log(this.state.longitude)
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 },
        );
    }

    refreshDataFromSever = () => {
        getApiMapsFromServer().then((maps) => {
            this.setState({ mapsFromSever: maps });

        }).catch((error) => {
            this.setState({ mapsFromSever: [] });
            console.log(error)
        })
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 1 }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    minZoomLevel={13}
                    style={{ flex: 1 }}
                >
                    <FlatList
                        data={this.state.mapsFromSever}
                        keyExtractor={(item) => item.created_at}
                        renderItem={({ item, index }) => {
                            return (
                                <FlastListItem item={item} index={index} clickMap={(item) => this.props.clickMap(item)}>
                                </FlastListItem>
                            );
                        }}
                    >
                    </FlatList>
                </MapView>
            </View>
        );
    }
}
export default FlastListMapComponent;