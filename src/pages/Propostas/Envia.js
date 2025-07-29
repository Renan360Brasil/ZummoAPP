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

export default class Envia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campoLogin: "",
      loader: false,
      error: ""
    };
  }

  static navigationOptions = {
    title: "Enviar proposta"
    //header: null,
  };

  _enviaSenha = () => {
    const { campoLogin } = this.state;

    const { navigation } = this.props;
    const idProposta = navigation.getParam("id");

    if (!campoLogin) {
      this.setState({ error: "Este campo é obrigatório", loader: false });
      return false;
    }

    this.setState({ loader: true });

    console.log("id:" + idProposta + " email: " + campoLogin);

    fetch(`https://www.zummo.com.br/_app/proposta_enviar.php`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: idProposta,
        email: campoLogin
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
            "Proposta enviada com sucesso!",
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
            backgroundColor: "#ff6b00"
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
              Preencha o campo abaixo com o e-mail que deseja enviar a proposta.
            </Text>

            <TextField
              label="* E-mail"
              value={this.state.campoLogin}
              onChangeText={campoLogin =>
                this.setState({ campoLogin, error: "" })
              }
              tintColor="#ff6b00"
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
    backgroundColor: "#ff6a00",
    justifyContent: "center",
    alignItems: "center"
  },

  btnLoginText: {
    color: "#FFF"
  }
});
