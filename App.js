import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-web';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: '',
      userPassword: ''
    }
  }

  handleSubmitPress = () => {
    if (!userEmail) { return }
    if (!userPassword) { return }
    let dataToSend = {email: this.state.userEmail, password: this.state.userPassword}
    let formBody = []
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&');

    fetch('http://localhost:8080/api/user/login', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':'application/x-www-form-urlencoded;chatset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.status === 'success') {
          //AsyncStorage.setItem('user_id', responseJson.data.email);
          //console.log(responseJson.data.email);
          //NavigationPreloadManager.replace('..etc')
        } else {
          console.log("Email address as id or password incorrect")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            onChangeText={(UserEmail) => this.setState({userEmail:UserEmail}) }
            placeholder="Enter Email"
            keyboardType="email-address"
            returnKeyType="next" />
        </View>
        <View>
        <TextInput
                
                onChangeText={(UserPassword) =>
                  this.setState({userPassword:UserPassword})
                }
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
        </View>
        <TouchableOpacity              
              activeOpacity={0.5}
              onPress={this.handleSubmitPress}>
              <Text>LOGIN</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
