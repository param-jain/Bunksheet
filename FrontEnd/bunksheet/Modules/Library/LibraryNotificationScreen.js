import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class LibraryNotificationScreen extends Component {

    backButtonNavigation() {
        this.setState({ errorMessage: '' });
        this.props.navigation.navigate('all_books_list');
    }

    render() {
        return(
            <View style={styles.container}>

                <View style={styles.headerIconView}>
                    <TouchableOpacity style={styles.headerBackButtonView} onPress={this.backButtonNavigation.bind(this)}>
                        <Image style={styles.backButtonIcon} source={require('../../images/black_back.png')} />
                    </TouchableOpacity>
                </View>

                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
                <Text>NOTIFICATIONS</Text>
            </View>
        );
    }
}

styles={
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
      },
    headerIconView: {
        flex: 0.15,
        backgroundColor: 'transparent',
        marginBottom: 20,
      },
      headerBackButtonView: {
        width: 35,
        height: 35,
        position: 'absolute',
        top: 35,
        left: 15,
        marginBottom: 10
      },
      backButtonIcon: {
        resizeMode: 'contain',
        width: 35,
        height: 25
      },
}

export default LibraryNotificationScreen;
