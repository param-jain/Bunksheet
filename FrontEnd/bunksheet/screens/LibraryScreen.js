import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class LibraryScreen extends Component {

    onBackLoginPress() {
        this.props.navigation.navigate('login');
    }

    render() {
        return (
            <View>
                <Text>LibraryScreen</Text>
                <Text>LibraryScreen</Text>
                <Text>LibraryScreen</Text>
                <Text>LibraryScreen</Text>
                <Text>LibraryScreen</Text>
                <Text>LibraryScreen</Text>
                <Text>LibraryScreen</Text>
                <Text>LibraryScreen</Text>
                <Button
                    onPress={() => this.onBackLoginPress()}
                    title="Back to Login"
                />
            </View>
        );
    }
}

export default LibraryScreen;