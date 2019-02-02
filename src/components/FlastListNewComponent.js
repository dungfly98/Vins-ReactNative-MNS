import React, { PureComponent } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { getAllNewFromServer } from '../networking/Server';
class FlastListItem extends PureComponent {
    render() {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 1 }}>
                <TouchableOpacity onPress={() => this.props.onClick(this.props.item)}>
                    <Image
                        source={{ uri: 'http://appmns.yez.vn/' + this.props.item.image }}
                        style={{ width: '100%', height: 180 }}
                    />
                    <Text style={{ marginLeft: 10, fontSize: 18, marginTop: 5, color:'black' }}>{this.props.item.name}</Text>
                    <Text style={{ margin: 5, marginLeft: 10, fontSize: 14, color: 'grey', marginRight: 10 }} numberOfLines={2}>{this.props.item.description}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
class FlastListNewComponent extends PureComponent {
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
        if (this.props.dataNews) {
            getAllNewFromServer().then((news) => {
                this.setState({ newAllFromSever: news });
                this.setState({ refreshing: false })
                // console.log(news)
            }).catch((error) => {
                this.setState({ newAllFromSever: [] });
                this.setState({ refreshing: false })
            })
        } else {
            getAllNewFromServer().then((news) => {
                this.setState({ newAllFromSever: news.filter(item => item.order_by > 5) });
                this.setState({ refreshing: false })
                // console.log(news)
            }).catch((error) => {
                this.setState({ newAllFromSever: [] });
                this.setState({ refreshing: false })
            })
        }
    }
    onRefresh = () => {
        this.refreshDataFromSever();
    }
    render() {
        return (
            <View style={{ flex: 1, padding: 2 }}>
                <FlatList
                    data={this.state.newAllFromSever}
                    horizontal={this.props.horizontal}
                    renderItem={({ item, index }) => {
                        return (
                            <FlastListItem item={item} index={index} onClick={(item) => { this.props.onClick(item) }}>
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

export default FlastListNewComponent;