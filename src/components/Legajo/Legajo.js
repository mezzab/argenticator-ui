import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Pages, Keys, Colors, IconsType } from "../../utils/constants";
import TextButton from "../Button";
import styled from "styled-components";
import { InputText, Container, InputField } from "../shared";
import Expo from "expo";

const { manifest } = Expo.Constants;
export const api =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost
        .split(`:`)
        .shift()
        .concat(`:8000`)
    : `api.nuestroherokubackend.com`;

export const getColorByIconType = type =>
  type === IconsType.warning ? Colors.caution : Colors.success;

export class Legajo extends React.Component {
  state = {
    email: "",
    isValid: false,
    code: null
  };

  validarMail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false)
      return this.setState({ email: text, isValid: false });
    else return this.setState({ email: text, isValid: true });
  };

  handleContinue = async () => {
/*     try {
      let response = await fetch(`http://${api}/sendEmail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `mail=${this.state.email}`
      });
      let responseJson = await response.json();
      this.setState({ code: responseJson.code });
      console.log("Codigo de verificacion: *** ", responseJson.code, " ***");
    } catch (error) {
      //todo: we have to show an error notification here.
      console.error(error);
    } */

    await AsyncStorage.setItem(Keys.Mail, this.state.email);
    console.log("El mail");
    console.log(await AsyncStorage.getItem(Keys.Mail));
    return this.props.navigation.navigate(Pages.MailCheck, {
      code: this.state.code
    }); 
    // this is how we send data through pages
  };

  getMail = async() => {
    return await AsyncStorage.getItem(Keys.Mail);
  }

  render() {
    AsyncStorage.getItem(Keys.EntityJSON).then(entityJSON =>
      this.setState({ entityJSON }),
      this.state.mail = this.getMail(), 
       );
 
    
    return (
      <Container>
        <Text
          name="Mail:"
          value={this.state.email}
        />

        <TextButton
          disable={!this.state.isValid}
          margin="10px 0  10px 0"
          value="Continue"
          onPress={this.handleContinue}
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