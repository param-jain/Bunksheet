import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Keyboard, Text, View, TextInput, Alert, TouchableWithoutFeedback, Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';

import { emailChanged, passwordChanged, loginUser } from '../actions/index';

class LoginScreen extends Component {

    onEmailChange(text) {
        text=text.trim();
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        text=text.trim();
        this.props.passwordChanged(text);
    }

    onLoginPress() {
        const { email, password } = this.props;
        Alert.alert(
            'Login Pressed',
            'Hurray!!!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        this.props.loginUser({ email, password });
    }

    onSignUpPress() {
        this.props.navigation.navigate('library');
    }

    loginButtonDisabled = (email, password) => {
        if (
                (password.length<6)||
                (email.indexOf('.') === -1)||
                (email.split('').filter(x => x === '@').length !== 1)||
                (email.length < 5)
            ) {
            return true;
        } else {
            return false;
        }
    }

    validateEmail = (email) => {
        if (!this.props.emailTouched) {
            return (  
                <View>
                    <TextInput
                        autoCapitalize = 'none'
                        underlineColorAndroid="transparent" 
                        placeholder="Email" 
                        placeholderColor="#c4c3cb" 
                        style={styles.loginFormTextInput} 
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </View>        
            );
        } else {
            if (email.length < 5) {
                return (  
                    <View>
                        <TextInput
                            autoCapitalize = 'none'
                            underlineColorAndroid="transparent" 
                            placeholder="Email" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#DD2C00'}]} 
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                        <Text style={styles.errorMessage}>Email should be at least 5 characters long!</Text>
                    </View>        
                );
            } else if (email.split('').filter(x => x === '@').length !== 1) {
                return (  
                    <View>
                        <TextInput
                            autoCapitalize = 'none'
                            underlineColorAndroid="transparent" 
                            placeholder="Email" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#DD2C00'}]} 
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                        <Text style={styles.errorMessage}>Email should contain '@'</Text>
                    </View>        
                );
            } else if (email.indexOf('.') === -1) {
                return (  
                    <View>
                        <TextInput
                            autoCapitalize = 'none'
                            underlineColorAndroid="transparent" 
                            placeholder="Email" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#DD2C00'}]} 
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                        <Text style={styles.errorMessage}>Email should contain at least one dot (.)</Text>
                    </View>        
                );
            } else {
                return (  
                    <View>
                        <TextInput
                            autoCapitalize = 'none'
                            underlineColorAndroid="transparent" 
                            placeholder="Email" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#1B5E20'}]} 
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                    </View>        
                );
            }
        }
    }

    validatePassword = (password) => {
        if (!this.props.passwordTouched) {
            return (  
                <View>
                    <TextInput
                            underlineColorAndroid="transparent" 
                            placeholder="Password" 
                            placeholderColor="#c4c3cb" 
                            style={styles.loginFormTextInput} 
                            secureTextEntry={true}
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                </View>        
            );
        } else { 
            if (password.length < 6) {
                return (
                    <View>
                         <TextInput
                            underlineColorAndroid="transparent" 
                            placeholder="Password" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#DD2C00'}]} 
                            secureTextEntry={true}
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                        <Text style={styles.errorMessage}>Password should be at least 6 characters long</Text>
                    </View>
                );
            } else {
                return (
                    <View>
                         <TextInput
                            underlineColorAndroid="transparent" 
                            placeholder="Password" 
                            placeholderColor="#c4c3cb" 
                            style={[styles.loginFormTextInput, {borderColor: '#1B5E20'}]} 
                            secureTextEntry={true}
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                    </View>
                );
            }
        }
    }

    render() {
        return (
          <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <StatusBar barStyle = "dark-content" hidden = {true} translucent = {true}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerView}>
                    <View style={styles.loginFormView}>
                        <View style={styles.logoImageView}>
                            <Image 
                                style={styles.logoImage}
                                source={require('../assets/bunksheet_logos/White_Background.png')}
                            />
                        </View>
                        <Text style={styles.logoText}>BunkSheet</Text>
                        {this.validateEmail(this.props.email)}
                        {this.validatePassword(this.props.password)}
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={() => this.onLoginPress()}
                            title="Login"
                            disabled={this.loginButtonDisabled(this.props.email, this.props.password)}
                        />
                        <View style={styles.rectangle} />
                    <Button
                            buttonStyle={styles.signUpButton}
                            onPress={() => this.onSignUpPress()}
                            title="Sign Up"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        );
    }
}
const styles = {
    containerView: {
        flex: 1,
    },
    logoImageView: { 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginBottom: 30,
        textAlign: 'center',
    },
    logoImage: {
        marginTop: 10,
    },
    loginFormView: {
        justifyContent: 'center',
        flex: 1,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#777777',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
      
    },
    errorMessage: {
        color: 'red',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: '#FF6D00',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
    },
    signUpButton: {
        backgroundColor: '#FFAB00',
        borderRadius: 5,
        height: 45,
        marginTop: 50,
    },
    rectangle: {
        width: 'auto',
        height: 1,
        backgroundColor: 'blue',
        marginTop: 50,
        marginLeft: 120,
        marginRight: 120
    }
    
  };

  const mapStateToProps = (state) => {
      return {
          email: state.auth.email,
          password: state.auth.password,
          emailTouched: state.auth.emailTouched,
          passwordTouched: state.auth.passwordTouched,
      }
  }

  export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginScreen);