import React from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import firebase from "firebase";

import FormRow from "../components/FormRow";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      message: ""
    };
  }

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBP4nUBWU0NsEEyMb5nfm7ZcK1PwyKRYfQ",
      authDomain: "series-aff1f.firebaseapp.com",
      databaseURL: "https://series-aff1f.firebaseio.com",
      projectId: "series-aff1f",
      storageBucket: "series-aff1f.appspot.com",
      messagingSenderId: "147399561434"
    };
    firebase.initializeApp(config);
  }

  onChangeHandler(field, value) {
    this.setState({ [field]: value });
  }

  tryLogin() {
    this.setState({ isLoading: true, message: "" });
    const { email, password } = this.state;

    const loginUserSucess = user => {
      this.setState({ message: "Sucesso! " });
    };

    const loginUserFailed = error => {
      this.setState({ message: this.getMessageByErrorCode(error.code) });
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loginUserSucess)
      .catch(error => {
        if (error.code === "auth/user-not-found") {
          Alert.alert(
            "Usuário não encontrado",
            "Deseja criar um cadastro com as informações inseridas?",
            [
              { text: "Não", onPress: () => {}, style: "cancel" },
              {
                text: "Sim",
                onPress: () => {
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(loginUserSucess)
                    .catch(loginUserFailed);
                }
              }
            ],
            { cancelable: false }
          );
          return;
        }
        loginUserFailed(error);
      })
      .then(() => this.setState({ isLoading: false }));
  }

  getMessageByErrorCode(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/user-not-found":
        return "Usuário não encontrado";
      default:
        return "Erro desconhecido";
    }
  }

  renderMessage() {
    const { message } = this.state;
    if (!message) return null;
    return (
      <View>
        <Text>{message}</Text>
      </View>
    );
  }

  renderButton() {
    if (this.state.isLoading) return <ActivityIndicator />;
    return <Button title="Entrar" onPress={() => this.tryLogin()} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <FormRow first>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={value => this.onChangeHandler("email", value)}
            placeholder="email@example.com"
            style={styles.input}
            textContentType="emailAddress"
            value={this.state.email}
          />
        </FormRow>
        <FormRow last>
          <TextInput
            autoCapitalize="none"
            onChangeText={value => this.onChangeHandler("password", value)}
            placeholder="******"
            secureTextEntry
            style={styles.input}
            textContentType="password"
            value={this.state.password}
          />
        </FormRow>
        {this.renderButton()}
        {this.renderMessage()}
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
