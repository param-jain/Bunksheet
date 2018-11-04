import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';

class LibraryScreen extends Component {

    onBackLoginPress() {
        this.props.navigation.navigate('login');
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle="light-content" animated={true} hidden={false} translucent={true} />
                <Header
                    backgroundColor="#FF9800"
                    leftComponent={
                        <TouchableOpacity>
                            <Icon
                                name='arrow-right'
                                type='entypo' />
                        </TouchableOpacity>
                    }
                    centerComponent={<Icon />}
                    rightComponent={<Icon />}
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
      },
});

export default LibraryScreen;