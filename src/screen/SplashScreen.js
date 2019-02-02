import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { routeName } from '../config/Constant';
import asyncStorage from '../data/Asyncstorage';
class SplashScreen extends PureComponent {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props)
        this.state = {
            accid: ''
        }
    }
    componentDidMount() {
        this.getClientID();
        setTimeout(() => {
            if(this.state.accid !== '') {
                return (this.props.navigation.replace(routeName.StackHomeScreen))
            } else {
                return (this.props.navigation.replace(routeName.StackMnsScreen))
            }
        }, 2000);
    }
    render() {
        return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:'white' }}> 
                <Image 
                    source={require('../images/VIN.jpg')}
                />
            </View>
        );
    }
    getClientID() {
        asyncStorage.getClientID().then(accid => {
            if (accid !== null) {
                this.setState({ accid: accid })
            }
        })
    }
}

export default SplashScreen;