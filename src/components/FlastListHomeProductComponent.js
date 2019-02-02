import React, { PureComponent } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
class FlastListItem extends PureComponent {
    render() {
        return (
            <View style={{ backgroundColor: 'white', width: 180, margin: 1 }}>
                <TouchableOpacity onPress={() => this.props.onClick(this.props.item)}>
                    <Image
                        source={{ uri: 'http://appmns.yez.vn/' + this.props.item.imageArr.image1 }}
                        style={{ width: '100%', height: 120 }}
                    />
                    <Text style={{ marginLeft: 10, fontSize: 18, marginTop: 5, color:'black' }}>{this.props.item.product_name}</Text>
                    <NumberFormat
                        value={this.props.item.price}
                        displayType={'text'}
                        thousandSeparator="." decimalSeparator=","
                        renderText={
                            value => <Text style={{ marginLeft: 10, fontSize: 15, color: 'red', marginTop: 5 }}>{value} <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
                            </Text>
                        }
                    />
                    <Text style={{ margin: 5, marginLeft: 10, fontSize: 14, color: 'grey', marginRight:10 }} numberOfLines={2}>{this.props.item.description}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
class FlastListHomeProductComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false,
        };
    }
    componentDidMount() {
        this.makeRemoteRequest();
    }
    makeRemoteRequest = () => {
        const url = 'http://appmns.yez.vn/api/mns_all_products';
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                res.data.forEach((element) => {
                    element.imageArr = JSON.parse(element.image);
                })
                this.setState({
                    data: res.data.filter(item => item.order_by >= 5),
                    error: res.error || null,
                    loading: false,
                    refreshing: false,
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false, });
            });
    };
    render() {
        return (
            <View style={{ flex: 1, padding: 1 }}>
                <FlatList
                    data={this.state.data}
                    horizontal={true}
                    keyExtractor={(item) => item.created_at}
                    renderItem={({ item, index }) => {
                        return (
                            <FlastListItem item={item} index={index} onClick={(item) => this.props.onClick(item)}>
                            </FlastListItem>
                        );
                    }}
                >
                </FlatList>
            </View>
        );
    }
}

export default FlastListHomeProductComponent;