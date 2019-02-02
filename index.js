import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader requires main queue setup',
    'Module RNFetchBlob requires main queue setup',
    'Class RCTCxxModule was not exported', 
    'Method `jumpToIndex` is deprecated',
    'Warning: Failed prop type: Invalid prop', //error review star
    'Possible Unhandled Promise Rejection'
]);
AppRegistry.registerComponent(appName, () => App);
