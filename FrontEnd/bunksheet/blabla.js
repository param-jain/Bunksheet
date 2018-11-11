Auth.signUp({
    username: email,
    password: password,
    attributes: {
      email: email,
      name: fName,
      family_name: lName,
      'custom:college_reg_id': regID
    }
  })
    .then(data => { 
      this.setState({ isAuthenticating: false });
      this.props.navigation.navigate('otp_confirmation', data);
    })
    .catch(err => { 
      this.setState({ isAuthenticating: false });
      this.setState({ errorMessage: err.message }) 
    });