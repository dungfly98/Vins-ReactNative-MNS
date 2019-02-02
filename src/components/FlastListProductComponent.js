import React, { PureComponent } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, RefreshControl } from 'react-native';
import NumberFormat from 'react-number-format';
import HeaderProductComponent from './HeaderProductComponent';
class FlastListItem extends PureComponent {
    render() {
        // console.log(this.props.item.imageArr.image1);
        return (
            <View style={{ backgroundColor: 'white', margin: 1, width: '50%' }}>
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
                            value => <Text style={{ marginLeft: 10, fontSize: 15, color: 'red' }}>{value} <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
                            </Text>
                        }
                    />
                    <Text style={{ margin: 5, marginLeft: 10, fontSize: 14, color: 'grey', marginRight:10 }} numberOfLines={2}>{this.props.item.description}</Text>
                </TouchableOpacity>
            </View >
        );
    }
}
class FlastListProductComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false,
        };
        this.arrayholder = [];
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
                if (this.props.dataProducts) {
                    // duyệt image
                    res.data.forEach((element) => {
                        element.imageArr = JSON.parse(element.image);
                    })
                    //end
                    this.setState({
                        data: res.data,
                        error: res.error || null,
                        loading: false,
                        refreshing: false,
                    });
                    this.arrayholder = res.data;
                    // console.log(res)
                } else {
                    res.data.forEach((element) => {
                        element.imageArr = JSON.parse(element.image);
                    })
                    this.setState({
                        data: res.data.filter(item => item.order_by >= 5),
                        error: res.error || null,
                        loading: false,
                        refreshing: false,
                    });
                }
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false, });
            });
    };
    searchFilterFunction(text) {
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.product_name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    render() {
        return (
            <View style={{ flex: 1, padding: 1 }}>
                <HeaderProductComponent
                    onTextSeacher={(text) => { this.searchFilterFunction(text) }}
                    onNotification={this.props.onNotification}
                    all={this.props.all}
                />
                <FlatList
                    data={this.state.data}
                    numColumns={2}
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
        )
    }
}

export default FlastListProductComponent;