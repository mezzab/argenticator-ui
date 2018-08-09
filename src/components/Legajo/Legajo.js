import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage , Image} from "react-native";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Pages, Keys, Colors, IconsType } from "../../utils/constants";
import TextButton from "../Button";
import styled from "styled-components";
import { InputText, Container, InputField,InformativeField } from "../shared";
import Expo from "expo";


export class Legajo extends React.Component {
  state = {
    email: 'prueba',
    phone: 'prueba',
    selfieUri: '',
    isValid: false,
    code: null
  };

  getMail = async () => {
      this.setState({email: await AsyncStorage.getItem(Keys.Mail) });
    }

   getPhone = async () => {
      this.setState({phone: await AsyncStorage.getItem(Keys.Phone) });
      //console.log(await AsyncStorage.getItem(Keys.Selfie));
    }

    getSelfie = async() =>{
      var uriSelfie = JSON.parse(await AsyncStorage.getItem(Keys.Selfie));
      this.setState({selfieUri: uriSelfie });
    }


  render() {
    this.getMail();
    this.getPhone();
    this.getSelfie();
    return (
      <Container>

          <Text style={{fontWeight: 'bold', marginTop: '20%', fontSize: 25, color: 'white' }}>
          Confirm your data:
          </Text>

          <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white' }}>
          {this.state.email}
          {this.state.phone}
          </Text>

          
{/*         <InformativeField
          name="Mail:"
          value={this.state.email}
        />

        <InformativeField
          name="Phone:"
          value={this.state.phone}
        /> */}

         <Image
          style={{width: 200, height: 200}}
          source={{uri: this.state.selfieUri.uri}}
        />

        <TextButton
          margin="10px 0  10px 0"
          value="Confirm"
          disable={false}
          onPress={() => this.props.navigation.navigate(Pages.Legajo)}
        />

        <TextButton
          margin="10px 0  10px 0"
          value="Go back to home"
          disable={false}
          onPress={() => this.props.navigation.navigate(Pages.HomeScreen)}
        />

      </Container>
    );
  }
}
