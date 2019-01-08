import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { Header, Icon } from 'react-native-elements';

class Issuance extends Component {

    constructor (props) {
        super(props);

        this.state = {
            loading: false,
            data:[],
            error: '',
            bookSelected: [],
        }

        this.arrayHolder = [];
    }

    toAllBooksListScreen() {
        this.props.navigation.navigate('all_books_list');
    }

    renderHeader = () => {
        return(
            <Header
            backgroundColor="#FFA000"
            outerContainerStyles={{borderBottomWidth: 0.5, borderColor: '#000000'}}
            centerContainerStyle={{paddingTop: 10}}
            leftContainerStyle={{margin: 10}}
            centerComponent={{ text: 'Issuance Counter', style: { color: '#fff',fontSize: 22, fontWeight: 'bold' } }}
            leftComponent={{ icon: 'arrow-left', type: 'entypo', color: '#fff', onPress: () => this.toAllBooksListScreen(), size: 30, underlayColor:'#64b5f6' }}
            />
        );
    }

    toBarCode = () => {
        this.props.navigation.navigate('barCodeScanner');
    }

    floatingButton = () => {
        return (
            <TouchableOpacity onPress={() => this.toBarCode()} style={styles.fab}>
                <Icon 
                  raised
                  name='plus'
                  type='entypo'
                  color = '#E65100'
                  style ={styles.checkButtonLayout}/>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>

                        {this.renderHeader()}

                        {this.floatingButton()}

                    </View>
                </TouchableWithoutFeedback>
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
    fab: { 
        position: 'absolute', 
        width: 70, 
        height: 70, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 50, 
        bottom: 50, 
        backgroundColor: '#03A9F4', 
        borderRadius: 40, 
        elevation: 8 
    }
});

export default Issuance;