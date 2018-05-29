import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button, Alert, Image, ActivityIndicator,Modal
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class App extends Component{
    constructor(props) {
      super(props);
      this.state = {
                    srcImg: '',
                    uri: '',
                    fileName: '',
                    loading: false,
                   };
    }
  choosePicture = () => {
      console.log("upload")
      var ImagePicker = require('react-native-image-picker');
      var options = {
          title: 'Pilih Gambar',
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
      };

      ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
            console.log(source);
            console.log(response.fileName);
            this.setState({
              srcImg: source,
              uri: response.uri,
              fileName: response.fileName

            });
          }
      });
  };

  uploadPicture = () => {
    console.log('mulai upload');
    this.setState  ({loading : true })

    const data = new FormData();
    //data.append('name', 'Fotoku'); // you can append anyone.
    data.append('fileToUpload', {
      uri: this.state.uri,
      type: 'image/jpeg', // or photo.type
      name: this.state.fileName,
    });
    const url= "http://hollanoona.000webhostapp.com/api/upload.php"
    fetch(url, {
      method: 'post',
      body: data
    })
    .then((response) => response.json())
    .then((responseJson) =>
      {
        console.log(responseJson);
        this.setState  ({
            loading : false
           })
      });
  }
  render() {
    return (
      <View style={styles.conMain}>
      {
          (this.state.loading===true)&&
             (
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.loading}
                        onRequestClose={() => {
                          alert('Modal has been closed.');
                        }}
                        >
                        <ActivityIndicator
                          animating={true}
                          style={styles.indicator}
                          size="large"
                        />
                    </Modal>
            )
          }
        <View style={styles.conHeader}>
          <Text style={styles.textHeader}>Winda Kerti Kusumayani</Text>
        </View>
        <View style={styles.conPreview} >
         {(this.state.srcImg!='') &&
            (<Image source={this.state.srcImg} style={styles.uploadAvatar} />)
         }
        </View>
        <View style={styles.conButton}>
          <Button
            onPress={
              () => this.choosePicture()
            }
            title="Pilih Foto"
          />
          <Button
            onPress={
              () => this.uploadPicture()
            }
            title="Upload Foto"
          />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conMain : {
    flex:1
  },
  conHeader : {
    flex:1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeader : {
    fontSize: 20,
    color :'white'
  },
  conPreview: {
    flex:8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  conButton: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  uploadAvatar: {
    height: 400,
    width: 400
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});