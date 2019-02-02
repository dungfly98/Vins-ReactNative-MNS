import React, { PureComponent } from 'react';
import { FlatList, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon } from 'native-base';
import { getFeedBack } from '../networking/Server';
import asyncStorage from '../data/Asyncstorage';
class FlastListItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            starCount: this.props.item.num_star,
        };
    }
    render() {
        const {
            container,
            iconName,
            contentStyle,
            textName,
            textReview,
            timeReivew
        } = styles;
        return (
            <View style={container}>
                <View style={iconName}>
                    <Icon
                        name='md-contact'
                    />
                </View>
                <View style={contentStyle}>
                    <Text style={textName}>{this.props.item.name}</Text>
                    <View style={{ width: 70 }}>
                        <StarRating
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            emptyStarColor={'blue'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            rating={this.state.starCount}
                            fullStarColor={'blue'}
                            starSize={20}
                        />
                    </View>
                    <Text style={textReview}>{this.props.item.comment}</Text>
                    <Text style={timeReivew}>{this.props.item.created_at}</Text>
                </View>
            </View>
        );
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
}
class FlastListReviewComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            feedBackFromSever: []
        };
    }
    componentWillMount() {
        this.refreshDataFromSever();
    }
    refreshDataFromSever = () => {
        getFeedBack().then((feedBack) => {
            this.setState({ feedBackFromSever: feedBack });
            this.setState({ refreshing: false })
        }).catch((error) => {
            this.setState({ feedBackFromSever: [] });
            this.setState({ refreshing: false })
        })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.feedBackFromSever}
                    renderItem={({ item, index }) => {
                        return (
                            <FlastListItem item={item} index={index}>
                            </FlastListItem>
                        );
                    }}
                    keyExtractor={(item) => item.created_at}
                >
                </FlatList>
            </View>
        );
    }
    componentDidUpdate() {
        const length = this.state.feedBackFromSever.length
        asyncStorage.saveCountText(length.toString())
        console.log()
        if (this.props.all === true) {
            const ok = this.state.feedBackFromSever
            let citrus = ok.slice(-3);
            this.state.feedBackFromSever = citrus
        }
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 2,
        flexDirection: 'row',
    },
    iconName: {
        marginLeft: 10,
        marginTop: 5,
    },
    contentStyle: {
        marginTop: 5,
        marginLeft: 10,
    },
    textName: {
        fontWeight: 'bold'
    },
    textReview: {
        paddingRight: 30,
        marginTop: 5,
        marginRight: 30,
    },
    timeReivew: {
        marginTop: 5,
        marginBottom: 5,
        color: 'grey'
    }
})
export default FlastListReviewComponent;