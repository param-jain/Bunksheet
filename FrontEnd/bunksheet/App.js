import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import LibraryScreen from './screens/LibraryScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
        login: { screen: LoginScreen },
        library: { screen: LibraryScreen }
    });

    return (
      <View style={styles.container}>
          <MainNavigator />
      </View>
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