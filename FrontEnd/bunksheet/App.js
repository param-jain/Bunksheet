import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createBottomTabNavigator } from 'react-navigation';
import reducers from './reducers';

import LoginScreen from './screens/LoginScreen';
import AllBooksListScreen from './screens/Library/AllBooksListScreen';
import SignUpScreen_1 from './screens/SignUpScreen_1';
import SignUpScreen_2 from './screens/SignUpScreen_2';
import ConfirmationScreen from './screens/ConfirmationScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import LibraryNotificationScreen from './screens/LibraryNotificationScreen';
import BarCodeScannerScreen from './screens/BarCodeScanner'

export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
        library: { screen: AllBooksListScreen },
        barCodeScanner: { screen: BarCodeScannerScreen },
        login: { screen: LoginScreen },
        forgot_password: { screen: ForgotPasswordScreen },  
        libraryNotifications: { screen: LibraryNotificationScreen},
        sign_up: { 
          screen: createBottomTabNavigator({
            sign_up_1: { screen: SignUpScreen_1 },
            sign_up_2: { screen: SignUpScreen_2 },
            otp_confirmation: { screen: ConfirmationScreen }
          }, {
            navigationOptions: {
              tabBarVisible: false
            }
          })
        }
      }, {
        navigationOptions: {
          tabBarVisible: false
        }, lazy: true
    });

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
