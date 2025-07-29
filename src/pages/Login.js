import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationActions, StackActions } from "react-navigation";

const window = Dimensions.get("window");
const logo = require("../images/logo.png");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campoLogin: "",
      campoSenha: "",
      loader: false
    };
  }

  static navigationOptions = {
    title: "ZUMMO"
    //header: null
  };

  _setLogado = async (login, permissao) => {
    try {
      await AsyncStorage.setItem("logado", "S");
      await AsyncStorage.setItem("login", login);
      await AsyncStorage.setItem("permissao", permissao);
    } catch (error) {
      // Error saving data
    }
  };

  _getLogado = async () => {
    try {
      const value = await AsyncStorage.getItem("logado");
      const tipo = await AsyncStorage.getItem("permissao");
      if (value !== null) {
        // We have data!!
        if (value === "S") {
          if (tipo == "Z") {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "PrincipalZ" })]
              // actions: [StackActions.push({routeName: 'Details'})]
            });
            const pushAction = StackActions.push({
              routeName: "PrincipalZ"
            });
            this.props.navigation.dispatch(resetAction);
          }
          if (tipo == "R") {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "PrincipalR" })]
              // actions: [StackActions.push({routeName: 'Details'})]
            });
            const pushAction = StackActions.push({
              routeName: "PrincipalR"
            });
            this.props.navigation.dispatch(resetAction);
          }
          if (tipo == "C") {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "PrincipalC" })]
              // actions: [StackActions.push({routeName: 'Details'})]
            });
            const pushAction = StackActions.push({
              routeName: "PrincipalC"
            });
            this.props.navigation.dispatch(resetAction);
          }
          if (tipo == "") {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "Principal" })]
              // actions: [StackActions.push({routeName: 'Details'})]
            });
            const pushAction = StackActions.push({
              routeName: "Principal"
            });
            this.props.navigation.dispatch(resetAction);
          }
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  UNSAFE_componentWillMount() {
    this._getLogado();
  }

  _verificaLogin = () => {
    const { campoLogin } = this.state;
    const { campoSenha } = this.state;

    this.setState({ loader: true });

    fetch("https://www.zummo.com.br/_app/login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        l: campoLogin,
        s: campoSenha
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ loader: false });

        // If server response message same as Data Matched
        if (responseJson.Message === "Logado") {
          //Then open Profile activity and send user email to profile activity.
          this._setLogado(campoLogin, responseJson.Permissao);

          if (responseJson.Permissao == "Z") {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "PrincipalZ" })]
              // actions: [StackActions.push({routeName: 'Details'})]
            });
            const pushAction = StackActions.push({
              routeName: "PrincipalZ"
            });
            this.props.navigation.dispatch(resetAction);
          }

          if (responseJson.Permissao == "C") {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "PrincipalC" })]
              // actions: [StackActions.push({routeName: 'Details'})]
            });
            const pushAction = StackActions.push({
              routeName: "PrincipalC"
            });
            this.props.navigation.dispatch(resetAction);
          }

          if (responseJson.Permissao == "R") {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "PrincipalR" })]
              // actions: [StackActions.push({routeName: 'Details'})]
            });
            const pushAction = StackActions.push({
              routeName: "PrincipalR"
            });
            this.props.navigation.dispatch(resetAction);
          }
        } else if (responseJson.Message === "Não Logado") {
          //Alert.alert(responseJson);
          Alert.alert(
            "Oops!",
            responseJson.Message,
            [{ text: "Entendi", onPress: () => {} }],
            { cancelable: false }
          );
        } else {
          //Alert.alert(responseJson);
          Alert.alert(
            "Oops!",
            responseJson.Message,
            [{ text: "Entendi", onPress: () => {} }],
            { cancelable: false }
          );
        }
      })
      .catch(error => {
        this.setState({ loader: false });

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
            backgroundColor: "#040608"
          }}
        >
          <ActivityIndicator color="#FFFFFF" size="large" />
        </View>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Image source={logo} style={styles.logo} />
          </View>

          <View style={styles.containerForm}>
            <TextInput
              style={styles.campoLogin}
              onChangeText={campoLogin => this.setState({ campoLogin })}
              placeholder="E-mail"
              keyboardType="email-address"
              value={this.state.campoLogin}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.campoSenha}
              onChangeText={campoSenha => this.setState({ campoSenha })}
              placeholder="*****"
              secureTextEntry={true}
              value={this.state.campoSenha}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.opcoesForm}>
            <TouchableOpacity
              style={styles.btnEsqueceu}
              onPress={() => {
                this.props.navigation.push("EsqueceuSenha");
              }}
            >
              <Text style={styles.opcoesFormEsqueceu}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={this._verificaLogin}
            >
              <Text style={styles.btnLoginText}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCadastro}
              onPress={() => {
                this.props.navigation.push("Cadastro");
              }}
            >
              <Text style={styles.btnLoginText}>CADASTRE-SE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: "#f6f6f6"
  },

  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  containerForm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  containerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  opcoesForm: {
    marginTop: -10,
    width: window.width - 30,
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },

  opcoesFormEsqueceu: {
    color: "#888"
  },

  opcoesFormCadastro: {
    color: "#d5ccc2"
  },

  campoLogin: {
    width: window.width - 30,
    height: 60,
    padding: 10,
    margin: 5,
    backgroundColor: "#FFF",
    color: "#000"
  },

  campoSenha: {
    width: window.width - 30,
    height: 60,
    padding: 10,
    margin: 5,
    backgroundColor: "#FFF",
    color: "#000"
  },

  btnLogin: {
    width: window.width - 30,
    height: 50,
    padding: 10,
    backgroundColor: "#d5ccc2",
    justifyContent: "center",
    alignItems: "center"
  },

  btnLoginText: {
    color: "#FFF",
    fontFamily: "OpenSans-Regular"
  },

  btnCadastro: {
    width: window.width - 30,
    marginTop: 10,
    height: 50,
    padding: 10,
    backgroundColor: "#040608",
    justifyContent: "center",
    alignItems: "center"
  },

  btnEsqueceu: {
    backgroundColor: "transparent"
  },

  logo: {
    width: 250,
    height: 50
  }
});
