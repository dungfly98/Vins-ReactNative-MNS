import React, { PureComponent } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, RefreshControl } from 'react-native';
import NumberFormat from 'react-number-format';
import { getApiYouCareFromServer } from '../networking/Server';
class FlastListItem extends PureComponent {
    render() {
        return (
            <View style={{ backgroundColor: 'white', margin: 2, width: 180 }}>
                <TouchableOpacity onPress={() => this.props.onClick(this.props.item)}>
                    <Image
                        source={{ uri: 'http://appmns.yez.vn/' + this.props.item.image }}
                        style={{ width: '100%', height: 120 }}
                    />
                    <Text style={{ marginLeft: 10, fontSize: 18, marginTop: 5 }}>{this.props.item.name}</Text>
                    <NumberFormat
                        value={this.props.item.price}
                        displayType={'text'}
                        thousandSeparator="." decimalSeparator=","
                        renderText={
                            value => <Text style={{ margin: 10, fontSize: 15, color: 'red' }}>{value} <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
                            </Text>
                        }
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
class FlastListYouCareComponent extends PureComponent {
    constructor(props) {
        super(props)
        this.state = ({
            refreshing: false,
            youCareServer: [],
        })
    }
    componentDidMount() {
        this.refreshDataFromSever();
    }

    refreshDataFromSever = () => {
        getApiYouCareFromServer().then((care) => {
            this.setState({ youCareServer: care });
            this.setState({ refreshing: false })
            // console.log(care)
        }).catch((error) => {
            this.setState({ youCareServer: [] });
            this.setState({ refreshing: false })
        })
    }
    onRefresh = () => {
        this.refreshDataFromSever();
    }
    render() {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <FlatList
                    data={this.state.youCareServer}
                    horizontal={true}
                    renderItem={({ item, index }) => {
                        return (
                            <FlastListItem item={item} index={index} onClick={(item) => this.props.onClick(item)}>
                            </FlastListItem>
                        );
                    }}
                    keyExtractor={(item) => item.created_at}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >
                </FlatList>
            </View>
        );
    }
}

export default FlastListYouCareComponent;