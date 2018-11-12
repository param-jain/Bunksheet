   /* axios.get(`https://ya9g6taoj0.execute-api.ap-south-1.amazonaws.com/prod/post/testget`, { 
      params: {
        Reg_ID: regID,
        First_Name: fName,
        Last_Name: lName,
        Email_ID: email
      } 
    })
      .then ( res => {
        console.log(res);
        this.setState({ isAuthenticating: false });
      })
      .catch ( err => {
        console.log(err);
        this.setState({ isAuthenticating: false });
      });

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
*/
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

  toBookDetail() {
    this.props.navigation.navigate('login');
  }

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
                              //ListHeaderComponent={this.renderHeader}
                            />
                        </List>


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

<Image source={require('../images/o_search.png')} style={styles.imageStyle} />
                          