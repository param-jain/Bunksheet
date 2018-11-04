import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';

class LibraryScreen extends Component {

    onBackLoginPress() {
        this.props.navigation.navigate('login');
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle = "dark-content" hidden = {true} translucent = {true}/>
                <Header
                    backgroundColor="#FF9800"
                    centerContainerStyle={{paddingTop: 20}}
                    rightContainerStyle={{paddingTop: 20}}
                    centerComponent={{ text: 'Library', style: { color: '#fff', fontSize: 22, paddingTop: 15 } }}
                    rightComponent={{ icon: 'bullhorn', type: 'font-awesome', color: '#fff' }}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
      }
});

export default LibraryScreen;