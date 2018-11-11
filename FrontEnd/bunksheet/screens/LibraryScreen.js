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
                            outerContainerStyles={{borderBottomWidth: 4, borderColor: '#000000'}}
                            centerContainerStyle={{paddingTop: 5}}
                            rightContainerStyle={{paddingTop: 5}}
                            centerComponent={{ text: 'Library', style: { color: '#fff',fontSize: 19, paddingTop: 15, fontWeight: 'bold' } }}
                            rightComponent={{ icon: 'bullhorn', type: 'font-awesome', color: '#fff' }}
                        />

                        <View style={styles.sectionStyle}>
                          <View style={{marginLeft: 15, marginRight: 10, alignContent:'center'}}>
                            <Icon name='magnifying-glass' type='entypo' color='#FF8F00'/>
                          </View>
                          <TextInput
                            autoCapitalize = 'none'
                            underlineColorAndroid="transparent" 
                            placeholder="Find me a Book ..." 
                            placeholderTextColor="#616161" 
                            style={styles.searchBarTextInput}
                            //onChangeText={this.onSearchTextChange.bind(this)}
                            //value={this.props.email}
                          />
                          <View style={{marginRight: 5, alignContent:'center'}}>
                            <Icon name='cross' type='entypo' color='#FF8F00'/>
                          </View>
                        </View>
                       

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

export default connect(mapStateToProps, { })(LibraryScreen);