import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Keyboard, ActivityIndicator, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Header, ListItem } from 'react-native-elements';

class FreshArrivalsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          data:[],
          error: ''
        }

        this.arrayHolder = [];
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

    toAllBooksListScreen() {
        this.props.navigation.navigate('all_books_list');
    }
      
    renderHeader = () => {
        return(
            <Header
            backgroundColor="#FFC110"
            outerContainerStyles={{borderBottomWidth: 0.5, borderColor: '#000000'}}
            centerContainerStyle={{paddingTop: 10}}
            rightContainerStyle={{paddingTop: 10}}
            leftContainerStyle={{margin: 10}}
            centerComponent={{ text: 'Fresh Arrivals', style: { color: '#fff',fontSize: 22, fontWeight: 'bold' } }}
            leftComponent={{ icon: 'arrow-left', type: 'entypo', color: '#fff', onPress: () => this.toAllBooksListScreen(), size: 30, underlayColor:'#64b5f6' }}
            />
        );
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
                  leftAvatar={{ source: { uri: item.Image } }}
                  containerStyle={{ borderBottomWidth: 0 }}
                  onPress={() => this.toBookDetail()}
                  />
                )}
                keyExtractor={item => item.ISBN}
                ItemSeparatorComponent={this.renderSeparator}
                //ListHeaderComponent={this.renderHeader}
              />
            </View>
        );
    }

    toBookDetail() {
        this.props.navigation.navigate('bookDetailPage');
      }

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
                        
                        {this.renderHeader()}
                        {this.renderList()}

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
    }
}

export default FreshArrivalsList;
