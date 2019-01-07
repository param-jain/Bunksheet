import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Keyboard, ActivityIndicator, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import { Header, ListItem, Card } from 'react-native-elements';

class BookDetailPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          data:[],
          error: ''
        }

        this.arrayHolder = [];
    }

    backButtonNavigation() {
        this.setState({ errorMessage: '' });
        this.props.navigation.navigate('all_books_list');
    }

    componentDidMount(){
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url = `https://collegebuddy.pythonanywhere.com/api/FA`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
            this.setState({
                //data: res.results,
                data: res,
                error: res.error || null,
                loading: false,
            });
            this.arrayHolder = res;
            //this.arrayHolder = res.results;
            })
            .catch(error => {
            this.setState({ error, loading: false });
            });
    };

    render() {
        if (this.state.loading) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" animating={this.state.loading} />
              </View>
            );
        } 
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>

                        <View style={styles.headerIconView}>
                            <TouchableOpacity style={styles.headerBackButtonView} onPress={this.backButtonNavigation.bind(this)}>
                                <Image style={styles.backButtonIcon} source={require('../../images/black_back.png')} />
                            </TouchableOpacity>
                        </View>

                        <Card title="AWESOME BOOK" containerStyle={{flex:}} >
                            <View style={{ height: 200 }}>
                                <Image 
                                    style={{flex: 1, marginBottom: 10}} 
                                    cacheEnabled={Platform.OS === 'android'}
                                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                                />
                                <View style={styles.detailedWrapper}>
                                    <Text style={styles.italics}>Publisher Name</Text>
                                    <Text style={styles.italics}>Author Name</Text>
                                </View>
                                <ScrollView >
                                    <Text>Discover the beautiful science of flowers! Through full-color photos and simple, easy-to-follow text, this nonfiction book introduces emergent readers to the basics of botany, including information on how flowers grow, along with their uses. All Pebble Plus books align with national and state standards and are designed to help new readers read independently, making them the perfect choice for every child.</Text>
                                </ScrollView>
                            </View>
                        </Card>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

styles={
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
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
    },
    cardImage: {
        height: "65%",
    },
    headerIconView: {
        flex: 0.15,
        backgroundColor: 'transparent',
        marginBottom: 10,
        marginTop: 10,
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
      detailedWrapper: {
        marginTop: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
        },
        italics: {
            fontStyle: 'italic'
        },

}

export default BookDetailPage;



----------


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, FlatList, Image, Keyboard, TextInput, StyleSheet, StatusBar, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Header, List, ListItem, SearchBar, Icon } from 'react-native-elements';

class AllBooksListScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          searchLoad: false,
          searchBarText: '',
          searchBarTextTouched: false,
          data:[],
          error: '',
          modalVisible:false,
          bookSelected:[],
        }

        this.arrayHolder = [];
    }

    componentDidMount(){
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url = `https://collegebuddy.pythonanywhere.com/api/book/100`;
        this.setState({ loading: true });
    
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              //data: res.results,
              data: res,
              error: res.error || null,
              loading: false,
            });
            this.arrayHolder = res;
            //this.arrayHolder = res.results;
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      };

    onSearchTextChange(text) {
      //text=text.trim();
      this.setState({
        searchBarText: text,
        searchBarTextTouched: true,
        searchLoad: true
      });
      console.log(this.arrayHolder);
      const newData = this.arrayHolder.filter(item => {
        const itemData = `${item.Author.toUpperCase()} ${item.Publisher.toUpperCase()} ${item.Title.toUpperCase()}`;
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
            <Icon name='cross' type='entypo' color='#FF8F00' onPress={() => this.clearSearchText() } underlayColor={'#64b5f6'}/>
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

    bookDetailModal = (item) => {
      this.setState({bookSelected: item}, () =>{
        this.setModalVisible(true);
      });
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
        <View>
          <FlatList
            keyboardShouldPersistTaps='always'
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
              roundAvatar
              title={item.Title}
              subtitle={`A: ${item.Author}  P: ${item.Publisher}`}
              leftAvatar={{ source: { uri: "http://books.google.com/books/content?id=_ojXNuzgHRcC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE730gA8gykyn3eW-2UcqAait5rm7mkY0fxMIYsgNqe7rMLL1N1Lem_aEPK4CjW_o-gWHKcV2yQw6EtiyUhmZkNa2Mp4GgfRpnLNjq7lgHu_Nfwj1TaZZBkmqxR2coVrJ9BWmydUK&source=gbs_api" } }} //uri:item.image
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.bookDetailModal(item)}
              />
            )}
            keyExtractor={item => item.ISBN}
            ItemSeparatorComponent={this.renderSeparator}
            //ListHeaderComponent={this.renderHeader}
          />
        </View>
    );
  }

toNotificationScreen() {
  this.props.navigation.navigate('libraryNotifications');
}

toBarCodeScannerScreen() {
  this.props.navigation.navigate('barCodeScanner');
}

  renderHeader = () => {
    return(
      <Header
        backgroundColor="#FF9800"
        outerContainerStyles={{borderBottomWidth: 0.5, borderColor: '#000000'}}
        centerContainerStyle={{paddingTop: 10}}
        rightContainerStyle={{paddingTop: 10}}
        leftContainerStyle={{margin: 10}}
        centerComponent={{ text: 'All Books', style: { color: '#fff',fontSize: 24, fontWeight: 'bold' } }}
        rightComponent={{ icon: 'bullhorn', type: 'font-awesome', color: '#fff', onPress: () => this.toNotificationScreen(), size: 27, underlayColor:'#64b5f6' }}
        leftComponent={{ icon: 'barcode', type: 'font-awesome', color: '#fff', onPress: () => this.toBarCodeScannerScreen(), size: 30, underlayColor:'#64b5f6' }}
      />
    );
  }
    

    render() {
        if (this.state.loading) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" animating={this.state.loading} />
              </View>
            );
        } 
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        
                        {this.renderHeader()}

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

export default connect(mapStateToProps, {})(AllBooksListScreen);



--------------------


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





=============



import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = "http://rallycoding.herokuapp.com/api/tokens"

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log("blabla"+previousToken);
  
  if (previousToken) {
    return;
  } else {
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    await axios.post(PUSH_ENDPOINT, { token: { token } });
    AsyncStorage.setItem('pushtoken', token);
    console.log("token"+token);
  }
};



=========


<Modal
                animationType={'fade'}
                transparent={true}
                onRequestClose={() => this.setModalVisible(false)}
                visible={this.state.modalVisible}>

                    <View style={styles.popupOverlay}>
                    <View style={styles.popup}>
                        <View style={styles.popupContent}>
                        <ScrollView contentContainerStyle={styles.modalInfo}>
                            
                            <Text style={styles.name}>{this.state.noticeSelected.title}</Text> 
                            <Text style={styles.about}>{this.state.noticeSelected.body}</Text>
                        
                        </ScrollView>
                        </View>
                        <View style={styles.popupButtons}>
                        <LinearGradient
                        colors={['#FF9800', '#FB8C00', '#EF6C00']}
                        style={styles.btnClose}
                        >
                            <TouchableOpacity onPress={() => {this.setModalVisible(false) }}>
                            <Text style={styles.txtClose}>Close</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        </View>
                    </View>
                    </View>
                </Modal>