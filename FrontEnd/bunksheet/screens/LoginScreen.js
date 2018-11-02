import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Keyboard, Text, View, TextInput, Alert, TouchableWithoutFeedback, Image, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';

import { emailChanged, passwordChanged, loginUser } from '../actions/index';

class LoginScreen extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
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
        const { email, password } = this.props;
        Alert.alert(
            'Sign up Pressed',
            'Proceed to Sign Up Page!!!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        this.props.loginUser({ email, password });
    }

    render() {
        return (
          <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerView}>
                    <View style={styles.loginFormView}>
                        <View style={styles.logoImageView}>
                            <Image 
                                style={styles.logoImage}
                                source={require('/Users/param_jain/Documents/GitHub/Bunksheet/FrontEnd/bunksheet/assets/a9786e34-6b20-4426-8eb7-df9265310b8c.png')}
                            />
                        </View>
                        <Text style={styles.logoText}>BunkSheet</Text>
                        <TextInput 
                            placeholder="Email" 
                            placeholderColor="#c4c3cb" 
                            style={styles.loginFormTextInput} 
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                        <TextInput 
                            placeholder="Password" 
                            placeholderColor="#c4c3cb" 
                            style={styles.loginFormTextInput} 
                            secureTextEntry={true}
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={() => this.onLoginPress()}
                            title="Login"
                            disabled={!(this.props.email.length > 0 && this.props.password.length > 0)}
                        />
                    <View style={styles.rectangle} />
                    <Button
                            buttonStyle={styles.signupButton}
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
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
      
    },
    loginButton: {
        backgroundColor: '#FF6D00',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
    },
    signupButton: {
        backgroundColor: '#FFAB00',
        borderRadius: 5,
        height: 45,
        marginTop: 20,
    },
    rectangle: {
        width: 'auto',
        height: 1,
        backgroundColor: '#000000',
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15
    }
  };

  const mapStateToProps = (state) => {
      return {
          email: state.auth.email,
          password: state.auth.password
      }
  }

  export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginScreen);