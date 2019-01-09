import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createBottomTabNavigator } from 'react-navigation';
import reducers from './reducers';
import { Notifications } from 'expo';

import LoginScreen from './Modules/Authentication/LoginScreen';
import SignUpScreen_1 from './Modules/Authentication/SignUpScreen_1';
import SignUpScreen_2 from './Modules/Authentication/SignUpScreen_2';
import ConfirmationScreen from './Modules/Authentication/ConfirmationScreen'
import ForgotPasswordScreen from './Modules/Authentication/ForgotPasswordScreen';
import LibraryNotificationScreen from './Modules/Library/LibraryNotificationScreen';
import BarCodeScannerScreen from './Modules/Library/BarCodeScanner'
import FreshArrivalsList from './Modules/Library/FreshArrivalsList';
import AllBooksListScreen from './Modules/Library/AllBooksListScreen';

import registerForNotifications from './Modules/Services/push_notifications_service'
import Issuance from './Modules/Library/IssuancePage';
import TEST from './blabla';

export default class App extends React.Component {

  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const text = notification.body;

        Alert.alert(
          'New Notice',
          text,
          [{ text: 'Ok.' }]
        );
    });  
  }

  render() {
    const MainNavigator = createBottomTabNavigator({

        library: {
          screen: createBottomTabNavigator({
            all_books_list: { screen: AllBooksListScreen },
            freshArrivals: { screen: FreshArrivalsList },
            test: { screen: TEST }
           })
         },
       barCodeScanner: { screen: BarCodeScannerScreen },
       issuance: { screen: Issuance },
       libraryNotifications: { screen: LibraryNotificationScreen},

        login: { screen: LoginScreen },
        forgot_password: { screen: ForgotPasswordScreen },

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
 