import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, FlatList, Icon, Keyboard, TextInput, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Header, List, ListItem, SearchBar } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import { librarySearchTextChanged } from '../actions/index';

class LibraryScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          searchLoad: false,
        }

        this.arrayHolder = [];
    }

    componentDidMount(){
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url = `https://randomuser.me/api/?&results=20`;
        this.setState({ loading: true });
    
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: res.results,
              error: res.error || null,
              loading: false,
            });
            this.arrayHolder = res.results;
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      };

      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '86%',
              backgroundColor: '#CED0CE',
              marginLeft: '14%',
            }}
          />
        );
      };

      searchFilterFunction = (text) => {
        this.setState({ searchLoad: true , searchClearIcon: true });
        text=text.trim();
        this.props.librarySearchTextChanged(text);
        console.log(this.arrayHolder);
        const newData = this.arrayHolder.filter(item => {
          const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
          searchLoad: false
        });
      };

      handleOnClearText = () => {
        Keyboard.dismiss();
        this.setState({
          searchLoad: false,
          searchClearIcon: false,
        });
        if(this.search != null) {
            this.search.clearText(); 
            this.searchFilterFunction("");  
        }
    }

      renderHeader = () => {
        return (
          <SearchBar
            placeholder="  Find me a Book ..."
            lightTheme
            round
            showLoadingIcon={this.state.searchLoad}
            placeholderTextColor='#FF6F00'
            icon={{color: '#FF6F00'}}
            clearIcon={{ color: '#FF6F00' }}
            onChangeText={text => this.searchFilterFunction(text)}
            onClearText={()=>this.handleOnClearText()}
            autoCorrect={false}
            value={this.props.searchBarText}
        />
        );
      };

    toBookDetail() {
      this.props.navigation.navigate('login');
    }

    render() {
        if (this.state.loading) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Spinner visible={this.state.loading} />
              </View>
            );
          }
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle = "dark-content" hidden = {true} translucent = {true}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Header
                            backgroundColor="#FF9800"
                            outerContainerStyles={{borderBottomWidth: 1, borderColor: '#000000'}}
                            centerContainerStyle={{paddingTop: 20}}
                            rightContainerStyle={{paddingTop: 20}}
                            centerComponent={{ text: 'Library', style: { color: '#fff', fontSize: 22, paddingTop: 15, fontWeight: 'bold' } }}
                            rightComponent={{ icon: 'bullhorn', type: 'font-awesome', color: '#fff' }}
                        />

                        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                            <FlatList
                              keyboardShouldPersistTaps='always'
                              data={this.state.data}
                              renderItem={({ item }) => (
                                <ListItem
                                roundAvatar
                                title={`${item.name.first} ${item.name.last}`}
                                subtitle={item.email}
                                avatar={{ uri: item.picture.thumbnail }}
                                containerStyle={{ borderBottomWidth: 0 }}
                                onPress={() => this.toBookDetail()}
                                />
                              )}
                              keyExtractor={item => item.email}
                              ItemSeparatorComponent={this.renderSeparator}
                              ListHeaderComponent={this.renderHeader}
                            />
                        </List>
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
      searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
});

const mapStateToProps = (state) => {
    return {
          data: state.data,
          error: state.error,
        searchBarText: state.searchBarText
    }
}

export default connect(mapStateToProps, { librarySearchTextChanged })(LibraryScreen);