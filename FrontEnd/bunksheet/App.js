import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createBottomTabNavigator } from 'react-navigation';
import reducers from './reducers';

import LoginScreen from './Modules/Authentication/LoginScreen';
import SignUpScreen_1 from './Modules/Authentication/SignUpScreen_1';
import SignUpScreen_2 from './Modules/Authentication/SignUpScreen_2';
import ConfirmationScreen from './Modules/Authentication/ConfirmationScreen'
import ForgotPasswordScreen from './Modules/Authentication/ForgotPasswordScreen';
import LibraryNotificationScreen from './Modules/Library/LibraryNotificationScreen';
import BarCodeScannerScreen from './Modules/Library/BarCodeScanner'
import FreshArrivalsList from './Modules/Library/FreshArrivalsList';
import { Icon } from 'react-native-elements';
import AllBooksListScreen from './Modules/Library/AllBooksListScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
        
        library: {
          screen: createBottomTabNavigator({
            all_books_list: { screen: AllBooksListScreen },
            freshArrivals: { screen: FreshArrivalsList },
           })
         },
       barCodeScanner: { screen: BarCodeScannerScreen },
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
