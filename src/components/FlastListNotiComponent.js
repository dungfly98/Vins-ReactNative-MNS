import React, { PureComponent } from 'react';
import { FlatList, View, Text, TouchableOpacity, RefreshControl } from 'react-native';
class FlastListItem extends PureComponent {
    render() {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 1 }}>
                <TouchableOpacity onPress={this.props.click}>
                    <Text style={{ marginLeft: 10, marginBottom: 5, color: 'black', fontSize: 20 }}>{this.props.item.title}</Text>
                    <Text style={{ marginLeft: 10, marginBottom: 5, color: 'black', fontSize: 14 }}>{this.props.item.content}</Text>
                    <Text style={{ color: 'grey', marginBottom: 5, textAlign: 'right', marginRight: 10 }}>{this.props.item.created_at}</Text>
                    <View style={{
                        width: 8, height: 8, borderRadius: 8 / 2, marginTop: 5, marginRight: 10,
                        position: 'absolute', right: 0, backgroundColor: this.props.bkaStatus
                    }}></View>
                </TouchableOpacity>
            </View>
        );
    }
}
class FlastListNotiComponent extends PureComponent {
    constructor(props) {
        super(props)
        this.state = ({
            refreshing: false,
            data: [],
        })
    }
    componentDidMount() {
        fetch(`http://appmns.yez.vn/api/mns_list_notifications`)
            .then((res) => res.json())
            .then((res) => {
                let ok = res.data;
                this.setState({
                    data: ok,
                    refreshing: false,
                });
                let status = [];
                ok.map((item) => {
                    return item.status
                });
                console.log(status);
                this.setState({
                    numberNoti: status,
                    refreshing: false,
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.data}
                    horizontal={this.props.horizontal}
                    keyExtractor={(item) => item.created_at}
                    renderItem={({ item, index }) => {
                        return (
                            <FlastListItem item={item} index={index} click={this.props.click}
                                bkaStatus={item.status === 'true' ? 'red' : 'white'} >
                            </FlastListItem>
                        );
                    }}
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
export default FlastListNotiComponent;