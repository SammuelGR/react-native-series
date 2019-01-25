import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

import FormRow from "../components/FormRow";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeHandler(field, value) {
    this.setState({ [field]: value });
  }

  tryLogin() {
    console.log(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <FormRow first>
          <TextInput
            onChangeText={value => this.onChangeHandler("email", value)}
            placeholder="email@example.com"
            style={styles.input}
            value={this.state.email}
          />
        </FormRow>
        <FormRow last>
          <TextInput
            onChangeText={value => this.onChangeHandler("password", value)}
            placeholder="******"
            secureTextEntry
            style={styles.input}
            value={this.state.password}
          />
        </FormRow>
        <Button title="Entrar" onPress={() => this.tryLogin()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  input: {
    paddingBottom: 5,
    paddingHorizontal: 5
  }
});
