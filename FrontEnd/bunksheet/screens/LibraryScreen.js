import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, FlatList, Keyboard, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Header, List, ListItem, SearchBar } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import { librarySearchTextChanged } from '../actions/index';

class LibraryScreen extends Component {

    constructor(props) {
        super(props);

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

      searchFilterFunction = text => {
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
        });
      };

      handleOnClearText = () => {
        if(this.search != null) {
            this.search.clearText();   
        }
    }

      renderHeader = () => {
        return (
          <SearchBar
            placeholder="Find me a Book..."
            lightTheme
            round
            clearIcon={{color: '#FF9800'}}
            onChangeText={text => this.searchFilterFunction(text)}
            onClearText={()=>this.handleOnClearText()}
            autoCorrect={false}
          />
        );
      };
    

    onBackLoginPress() {
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
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <ListItem
                                roundAvatar
                                title={`${item.name.first} ${item.name.last}`}
                                subtitle={item.email}
                                avatar={{ uri: item.picture.thumbnail }}
                                containerStyle={{ borderBottomWidth: 0 }}
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
      }
});

const mapStateToProps = (state) => {
    return {
        loading: this.state.loading,
        data: this.state.data,
        error: this.state.error,
        searchBarText: this.state.searchBarText
    }
}

export default connect(mapStateToProps, { librarySearchBarTextChanged })(LibraryScreen);