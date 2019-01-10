import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

const bookLoading = require('../../Animations/process_complete.json'); 

export default class ReturnSuccessToken extends React.Component {
  state = {
    animation: null,
  };

  componentWillMount() {
    this._playAnimation();
  }

  render() {
    return (
        <View>
            <View style={styles.animationContainer}>
            {this.state.animation &&
                <Lottie
                    ref={animation => {
                    this.animation = animation;
                    }}
                    style={{
                    width: 400,
                    height: 400,
                    backgroundColor: '#eee',
                    }}
                    source={this.state.animation}
                />}
            </View>
            <View style={styles.containerView}>
                    <View style={styles.successTextView}>
                        <Text style={styles.successText}>RETURN SUCCESS</Text>
                    </View>
                    <View style={styles.bodyView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.bodyBlue}>Book Title: </Text>
                            <Text style={styles.body}>The Lean Startup</Text>
                        </View>
                    </View>
            </View>
        </View>
    );
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this.setState({
        animation: bookLoading
      }, this._playAnimation);
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
  },
  containerView: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
  },
  successText: {
      alignSelf: 'center',
      fontSize: 22,
      fontWeight: 'bold',
      color: 'green',
      marginBottom: 20,
  },
  successTextView: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bodyView: {
      margin: 10,
      justifyContent: 'center',
      alignContent: 'center',
  },
  bodyBlue: {
     fontSize: 18,
     alignSelf: 'center',
     color: '#2196F3'
  },
  body: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#424242'
 }
});
