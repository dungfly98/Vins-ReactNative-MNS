import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Platform } from 'react-native';
import SingleHeaderComponent from '../components/SingleHeaderComponent';
import Swiper from 'react-native-swiper';
import { Icon } from 'native-base';
import StarRating from 'react-native-star-rating';
import FlastListReviewComponent from '../components/FlastListReviewComponent';
import FlastListYouCareComponent from '../components/FlastListYouCareComponent';
import { routeName } from '../config/Constant';
import NumberFormat from 'react-number-format';
import asyncStorage from '../data/Asyncstorage';
class ClickProductScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 4.5,
            number: ''
        };
    }
    render() {
        const {
            container,
            productStyle,
            imageStyle,
            productdetails,
            headerDetails,
            textHeader,
            textClick,
            contenDetails,
            textContent,
            productReview,
            headerReview,
            buttonAllReview,
            headerReviewStyle,
            starReview,
            numberReview,
            youCare,
            headerYouCare,
            textYouCare,
            sendFeedBack,
            textFeedBack,
            buttonSend
        } = styles;
        const { params } = this.props.navigation.state;
        const item = params.item;
        return (
            <View style={container}>
                <SingleHeaderComponent
                    text={item.title}
                    iconLeft='md-arrow-round-back'
                    iconRight='md-share'
                    onBackPress={() => { this.onBack() }}
                    onCheck={() => { this.onShare() }}
                />
                <ScrollView>
                    <View style={productStyle}>
                        <Swiper height={200} horizontal={true} autoplay style={imageStyle}>
                            <Image
                                style={{ width: '100%', height: 200 }}
                                source={{ uri: 'http://appmns.yez.vn/' + item.imageArr.image1 }}
                            />
                            <Image
                                style={{ width: '100%', height: 200 }}
                                source={{ uri: 'http://appmns.yez.vn/' + item.imageArr.image2 }}
                            />
                        </Swiper>
                        <Text style={{ marginLeft: 10, fontSize: 18, marginBottom: 8, marginTop: 10 }}>{item.title}</Text>
                        <NumberFormat
                            value={item.price}
                            displayType={'text'}
                            thousandSeparator="." decimalSeparator=","
                            renderText={
                                value => <Text style={{ margin: 10, fontSize: 15, color: 'red' }}>{value} <Text style={{ textDecorationLine: 'underline' }}>đ</Text>
                                </Text>
                            }
                        />
                    </View>
                    <View style={productdetails}>
                        <View style={headerDetails}>
                            <Text style={textHeader}>Chi tiết sản phẩm</Text>
                            <TouchableOpacity onPress={() => { this.onSeeMore() }}>
                                <Text style={textClick}>Xem thêm</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={contenDetails}>
                            <Text style={textContent}>{item.description}</Text>
                        </View>
                    </View>
                    <View style={productReview}>
                        <View style={headerReview}>
                            <View style={headerReviewStyle}>
                                <Text style={textHeader}>Đánh giá sản phẩm</Text>
                                <View style={starReview}>
                                    <StarRating
                                        disabled={false}
                                        emptyStar={'ios-star-outline'}
                                        emptyStarColor={'blue'}
                                        fullStar={'ios-star'}
                                        halfStar={'ios-star-half'}
                                        iconSet={'Ionicons'}
                                        maxStars={5}
                                        rating={this.state.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        fullStarColor={'blue'}
                                        starSize={25}
                                    />
                                    <Text style={numberReview}>({this.state.number})</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={buttonAllReview} onPress={() => { this.onSeeAll() }}>
                                <Text style={textClick}>Xem tất cả</Text>
                                <Icon
                                    name='ios-arrow-forward'
                                    style={{ color: 'blue', fontSize: 20 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlastListReviewComponent
                        all={true}
                    />
                    <View style={youCare}>
                        <View style={headerYouCare}>
                            <Text style={textYouCare}>Có thể bạn quan tâm</Text>
                            <TouchableOpacity style={buttonAllReview} onPress={() => { this.onclickYouCare() }}>
                                <Text style={textClick}>Xem tất cả</Text>
                                <Icon
                                    name='ios-arrow-forward'
                                    style={{ color: 'blue', fontSize: 20 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlastListYouCareComponent
                        onClick={(item) => { this.clickYouCare(item) }}
                    />
                    <View style={sendFeedBack}>
                        <TouchableOpacity onPress={() => { this.onSend() }} style={buttonSend}>
                            <Text style={textFeedBack}>Gửi phản hồi</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
    componentDidMount() {
        this.getCountText();
    }
    getCountText() {
        asyncStorage.getCountText().then(text => {
            if (text !== null) {
                this.setState({
                    number: text
                })
            }
        })
    }
    onBack() {
        this.props.navigation.goBack()
    }
    onShare() {
        alert('Cick on Share')
    }
    onSeeMore() {
        alert('Click xem thêm')
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    onSend() {
        this.props.navigation.navigate(routeName.StackFeedBackScreen, params = { image: this.props.navigation.state.params.item.imageArr.image1})
    }
    clickYouCare(item) {
        // this.props.navigation.navigate(routeName.StackClickProductScreen, params={item})
    }
    onclickYouCare() {
        this.props.navigation.navigate(routeName.StackYouCareScreen)
    }
    onSeeAll() {
        this.props.navigation.navigate(routeName.StackClickSeeAllReviewScreen)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    productStyle: {
        backgroundColor: 'white'
    },
    imageStyle: {

    },
    productdetails: {
        backgroundColor: 'white',
        marginTop: 10
    },
    headerDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    textHeader: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    textClick: {
        fontSize: 16,
        color: 'blue',
        marginRight: 10,
    },
    contenDetails: {
        margin: 10,
    },
    textContent: {
        fontSize: 16
    },
    productReview: {
        backgroundColor: 'white',
        marginTop: 10,
        height: 60,
        justifyContent: 'center',
    },
    headerReview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    buttonAllReview: {
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center',
    },
    headerReviewStyle: {
        flexDirection: 'column',
    },
    starReview: {
        width: 70,
        marginLeft: 10,
        flexDirection: 'row',
    },
    numberReview: {
        marginLeft: 5,
        marginTop: 5,
    },
    youCare: {
        marginTop: 10,
        marginLeft: 10,
    },
    headerYouCare: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textYouCare: {
        fontWeight: 'bold',
        fontSize: 16
    },
    sendFeedBack: {
        marginTop: 5,
    },
    textFeedBack: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonSend: {
        width: '100%',
        height: 60,
        backgroundColor: 'blue',
        justifyContent: 'center'
    }
})
export default ClickProductScreen;