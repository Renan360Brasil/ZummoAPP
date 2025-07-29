import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from "react-native";
import { TextField } from "react-native-material-textfield";

const window = Dimensions.get("window");

export default class EsqueceuSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campoLogin: "",
      loader: false,
      error: ""
    };
  }

  static navigationOptions = {
    title: "Recuperar senha"
    //header: null,
  };

  _enviaSenha = () => {
    const { campoLogin } = this.state;

    if (!campoLogin) {
      this.setState({ error: "Este campo é obrigatório", loader: false });
      return false;
    }

    this.setState({ loader: true });

    fetch("https://www.zummo.com.br/_app/recuperar_senha.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        l: campoLogin
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ loader: false });

        // If server response message same as Data Matched
        if (responseJson === "Enviado") {
          this.setState({ campoLogin: "" });
          Alert.alert(
            "Sucesso!",
            "Sua nova senha foi enviada para seu e-mail.",
            [{ text: "Entendi", onPress: () => {} }],
            { cancelable: false }
          );
        } else {
          //Alert.alert(responseJson);
          Alert.alert(
            "Oops!",
            responseJson,
            [{ text: "Entendi", onPress: () => {} }],
            { cancelable: false }
          );
        }
      })
      .catch(error => {
        this.setState({ loader: false });

        console.error(error);
        Alert.alert("Erro!", error, [{ text: "Entendi", onPress: () => {} }], {
          cancelable: false
        });
      });
  };

  render() {
    if (this.state.loader) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d5ccc2"
          }}
        >
          <ActivityIndicator color="#FFFFFF" size="large" />
        </View>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18 }}>
              Preencha o campo abaixo com o e-mail cadastrado para recebar uma
              nova senha de acesso.
            </Text>
            {/* <TextInput
                        style={styles.campoLogin}
                        onChangeText={campoLogin => this.setState({ campoLogin })}
                        placeholder="E-mail"
                        keyboardType="email-address"
                        value={this.state.campoLogin}
                    /> */}

            <TextField
              label="* E-mail"
              value={this.state.campoLogin}
              onChangeText={campoLogin =>
                this.setState({ campoLogin, error: "" })
              }
              tintColor="#d5ccc2"
              keyboardType="email-address"
              error={this.state.error}
            />

            <TouchableOpacity
              style={styles.btnLogin}
              onPress={this._enviaSenha}
            >
              <Text style={styles.btnLoginText}>ENVIAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },

  campoLogin: {
    width: window.width - 30,
    height: 60,
    padding: 10,
    marginTop: 15,
    backgroundColor: "#FFF",
    color: "#000"
  },

  btnLogin: {
    marginTop: 20,
    width: window.width - 30,
    height: 50,
    padding: 10,
    backgroundColor: "#d5ccc2",
    justifyContent: "center",
    alignItems: "center"
  },

  btnLoginText: {
    color: "#FFF"
  }
});
