import React, { PureComponent } from 'react';
import { Route } from './src/config/Router';
import { Provider } from 'react-redux';
import store from './src/redux/store/Store';
import OneSignal from 'react-native-onesignal';
import { Platform } from 'react-native';
class App extends PureComponent {
  componentWillMount() {
    Platform.OS === 'ios' ? null : OneSignal.init("882f8601-6ece-434f-9517-f6cd49717e89");
  }
  render() {
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}

export default App;