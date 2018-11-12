import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, FlatList, Image, Keyboard, TextInput, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Header, List, ListItem, SearchBar, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

class LibraryScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          searchLoad: false,
          searchBarText: '',
          searchBarTextTouched: false,
          data:[],
          error: ''
        }

        this.arrayHolder = [];
    }

    componentDidMount(){
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url = `https://randomuser.me/api/?&results=2000`;
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

    onSearchTextChange(text) {
      text=text.trim();
      this.setState({
        searchBarText: text,
        searchBarTextTouched: true,
        searchLoad: true
      });
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
    }

    modifySearchBar = () => {
        return (
          <TextInput
            ref="searchBarInput"
            autoCapitalize = 'none'
            underlineColorAndroid="transparent" 
            placeholder="Find me a Book ..." 
            placeholderTextColor="#616161" 
            style={styles.searchBarTextInput}
            onChangeText={(text) => this.onSearchTextChange(text)}
            value={this.state.searchBarText}
          />
        );
    }

    clearSearchText() {
      Keyboard.dismiss();
      this.setState({
        searchBarText: '',
        searchBarTextTouched: false,
        searchLoad: false
      });
      this.onSearchTextChange("");
    }

    crossIconFunctionality = () => {
      console.log(this.state.searchBarTextTouched);
      console.log(this.state.searchBarText);
      if (this.state.searchBarTextTouched) {
        return (
          <View style={{marginRight: 5, alignContent:'center'}}>
            <Icon name='cross' type='entypo' color='#FF8F00' onPress={() => this.clearSearchText()}/>
          </View>
        );
      }
    }

    focusTextInput() {
      this.refs.searchBarInput.focus();
    }

    searchIconFunctionality = () => {
      return (
        <View style={{marginLeft: 15, marginRight: 10, alignContent:'center'}}>
          <Icon name='magnifying-glass' type='entypo' color='#FF8F00' onPress={() => this.focusTextInput()} />
        </View>
      );
    }

    toBookDetail() {
      this.props.navigation.navigate('login');
    }

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


  renderList = () => {
      return (
        <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0 }}>
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
            //ListHeaderComponent={this.renderHeader}
          />
      </List>
      );
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
                <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Header
                            backgroundColor="#FF9800"
                            outerContainerStyles={{borderBottomWidth: 4, borderColor: '#000000'}}
                            centerContainerStyle={{paddingTop: 5}}
                            rightContainerStyle={{paddingTop: 5}}
                            centerComponent={{ text: 'Library', style: { color: '#fff',fontSize: 19, paddingTop: 15, fontWeight: 'bold' } }}
                            rightComponent={{ icon: 'bullhorn', type: 'font-awesome', color: '#fff' }}
                        />

                        <View style={styles.sectionStyle}>
                          {this.searchIconFunctionality()}
                          {this.modifySearchBar()}
                          {this.crossIconFunctionality()}
                        </View>

                        {this.renderList()}

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
    searchBarTextInput: {
      flex: 1
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#F57C00',
    height: 35,
    borderRadius: 15,
    margin: 5
  }
});

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, {})(LibraryScreen);