import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, TouchableWithoutFeedback, Alert, Platform } from 'react-native';
import SingleHeaderComponent from '../components/SingleHeaderComponent';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import { routeName } from '../config/Constant';
import asyncStorage from '../data/Asyncstorage';

const apiSendFeedBack = 'http://appmns.yez.vn/api/mns_feed_back';

class FeedBackScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 4,
            text: '',
            name: 'Nguyen Tien Dung'
        };
    }
    componentWillMount() {
        this.getNameText();
    };
    getNameText() {
        asyncStorage.getNameText().then(name => {
            if (name !== null) {
                this.setState({ name: name })
            }
        })
    };
    render() {
        const {
            container,
            writeFeedBack,
            starFeedBack,
            textFeedBack,
            sendFeedBack,
            textSendStyle,
            clickSend,
            buttonSend,
            textsend
        } = styles;
        return (
            <View style={container}>
                <SingleHeaderComponent
                    iconLeft='md-arrow-round-back'
                    text='Gửi phản hồi'
                    onBackPress={() => { this.onBack() }}
                />
                <View style={writeFeedBack}>
                    <View style={starFeedBack}>
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
                            starSize={35}
                        />
                    </View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={textFeedBack}>
                            <TextInput
                                style={{ padding: 10 }}
                                multiline={true}
                                returnKeyType='done'
                                onSubmitEditing={Keyboard.dismiss}
                                value={this.state.text}
                                onChangeText={(text) => { this.setState({ text }) }}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                </View>
                <View style={sendFeedBack}>
                    <View>
                        <Text style={textSendStyle}>Đính kèm</Text>
                        <Image
                            style={{ width: 150, height: 120, marginLeft: 10, marginTop: 5 }}
                            source={{ uri: 'http://appmns.yez.vn/' + this.props.navigation.state.params.image }}
                        />
                        <Text style={{ color: 'red' }}>{this.state.name}</Text>
                    </View>
                    <View style={clickSend}>
                        <TouchableOpacity style={buttonSend} onPress={() => { this.onSend() }}>
                            <Text style={textsend}>Gửi phản hồi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }


    onBack() {
        this.props.navigation.goBack();
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    onSend() {
        const { text, starCount, name } = this.state;
        if (text === '' || starCount === '') {
            Alert.alert('Mời bạn nhập thông tin')
        }
        const user = {
            comment: text,
            num_star: starCount,
            name: name,
            attachment: 'http://appmns.yez.vn/' + this.props.navigation.state.params.image
        }
        axios.post(apiSendFeedBack, user)
            .then(function (res) {
                console.log(res);
            }).catch(erro => {
                alert(erro)
            })
        Alert.alert(
            'Thông báo',
            'Cảm ơn bạn đã đánh giá',
            [
                { text: 'OK', onPress: () => this.props.navigation.replace(routeName.StackHomeScreen) },
            ]
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1,
    },
    writeFeedBack: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    starFeedBack: {
        width: 200,
    },
    textFeedBack: {
        marginTop: 20,
        borderColor: 'grey',
        borderWidth: 1,
        width: '95%',
        height: 150
    },
    sendFeedBack: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
    },
    textSendStyle: {
        marginTop: 20,
        marginLeft: 10,
        fontSize: 18,
    },
    clickSend: {
        width: '100%',
    },
    buttonSend: {
        width: '100%',
        height: 60,
        backgroundColor: 'blue',
        justifyContent: 'center'
    },
    textsend: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default FeedBackScreen;