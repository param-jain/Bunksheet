import React from 'react';
import { Dimensions, StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Button } from 'react-native-elements';

const { width } = Dimensions.get('window');

export default class App extends React.Component {

  state = {
    hasCameraPermission: null,
    askedOnce: false
  }

componentDidMount() {
  this.getCameraPermissions();
}

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  permissionDenied() {
    this.setState({
      hasCameraPermission: null,
      askedOnce: true
    });
    this.getCameraPermissions();
    this.props.navigation.navigate('library');
  }

  BarCodeScanner = () => {
    return (
      <BarCodeScanner
        onBarCodeRead={(scan) => alert(scan.data)}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <Text style={styles.description}>Scan your Book</Text>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
    );
  }

  render() {

    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.permissionText}>Requesting for Camera Permission</Text>
        </View>
      );
    }
    if (hasCameraPermission === false) {
        return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.permissionText}>Camera Permission Denied</Text>
          <Button 
            onPress = {() => this.permissionDenied()}
            title = 'Try Again!'
            buttonStyle={styles.Ok}
            />
        </View>
        );
    }
    
    if (hasCameraPermission === 'granted') {
      {this.BarCodeScanner()}
    }
    }
  }

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
  Ok: {
    backgroundColor: '#FFAB00',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
   permissionText: {
      fontSize: 16,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 5,
      marginBottom: 5,
      color:'#FF6D00'

   }
});