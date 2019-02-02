import React, { PureComponent } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { getAllNewFromServer } from '../networking/Server';
class FlastListItem extends PureComponent {
    render() {
        return (
            <View style={{ backgroundColor: 'white', margin: 1, width: 180 }}>
                <TouchableOpacity>
                    <Image
                        source={{ uri: 'http://appmns.yez.vn/' + this.props.item.image }}
                        style={{ width: '100%', height: 120 }}
                    />
                    <Text style={{ marginLeft: 10, fontSize: 18, marginTop: 5, color: 'black' }}>{this.props.item.name}</Text>
                    <Text style={{ margin: 5, marginLeft: 10, fontSize: 14, color: 'grey', marginRight: 10 }} numberOfLines={2}>{this.props.item.description}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
class FlastListHomeNewComponent extends PureComponent {
    constructor(props) {
        super(props)
        this.state = ({
            refreshing: false,
            newAllFromSever: [],
        })
    }
    componentDidMount() {
        this.refreshDataFromSever();
    }

    refreshDataFromSever = () => {
        getAllNewFromServer().then((news) => {
            this.setState({ newAllFromSever: news.filter(item => item.order_by > 5) });

        }).catch((error) => {
            this.setState({ newAllFromSever: [] });
        })
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 1 }}>
                <FlatList
                    data={this.state.newAllFromSever}
                    horizontal={this.props.horizontal}
                    keyExtractor={(item) => item.created_at}
                    renderItem={({ item, index }) => {
                        return (
                            <FlastListItem item={item} index={index}>
                            </FlastListItem>
                        );
                    }}
                >
                </FlatList>
            </View>
        );
    }
}
export default FlastListHomeNewComponent;