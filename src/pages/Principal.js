import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Orientation from 'react-native-orientation-locker';

const logo = require("../images/logo.png");
const alertRestrito = require("../images/alert-restrito.png");

const btnEspremedores = require("../images/btn-espremedores.png");
const btnCaracteristicas = require("../images/btn-caracteristicas.png");

const btnLocacao = require("../images/btn-locacao.png");
// const btnManuais = require("../images/btn-manuais.png");

const btnInstrucoes = require("../images/btn-instrucoes.png");
const btnInfo = require("../images/btn-info.png");

const btnAssistencia = require("../images/btn-assistencia.png");
const btnNoticias = require("../images/btn-noticias.png");

// const btnAtendimento = require("../images/btn-atendimento.png");
// const btnPerfil = require("../images/btn-perfil.png");

// const btnPropostas = require("../images/btn-propostas.png");
// const btnRAT = require("../images/btn-rat.png");

// const btnRepresentantes = require("../images/btn-representantes.png");

// const btnPecas = require("../images/btn-pecas.png");
const btnLogout = require("../images/btn-logout.png");
const btnLogin = require("../images/btn-login.png");

// const bLogin = require("../images/login.png");
// const bLogoff = require("../images/logoff.png");

import { NavigationActions, StackActions } from "react-navigation";

export default class Principal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "ZUMMO"
      //header: null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      logado: "N",
      modalVisible: false
    };
  }

  UNSAFE_componentWillMount() {
    this.setModalVisible(!this.state.modalVisible);
    Orientation.lockToPortrait();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

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

  _sairAPP = () => {
    AsyncStorage.clear();
    this.props.navigation.replace("Principal", 0);
  };

  _verificaLogin = () => {
    if (this.state.logado == "S") {
      return (
        <View style={styles.viewButtons}>
          <TouchableOpacity style={styles.btnMenu} onPress={this._sairAPP}>
            <Image source={btnLogout} style={styles.imgBtn} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.viewButtons}>
        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => {
            this.props.navigation.push("Login");
          }}
        >
          <Image source={btnLogin} style={styles.imgBtn} />
        </TouchableOpacity>
      </View>
    );
  };

  UNSAFE_componentWillMount() {
    this._getLogado();
    this._verificaLogin();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={{ backgroundColor: "rgba(0,0,0, .75)" }}>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Image
                source={alertRestrito}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                  marignBottom: 0
                }}
              />
            </TouchableOpacity>
          </View>
        </Modal>

        <ScrollView style={styles.container}>
          <View style={{ flex: 1, padding: 20 }}>
            <Image
              source={logo}
              style={{ width: 150, height: 30, marginTop: 20 }}
            />
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("Produtos");
              }}
            >
              <Image source={btnEspremedores} style={styles.imgBtn} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("Caracteristicas");
              }}
            >
              <Image source={btnCaracteristicas} style={styles.imgBtn} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("Locacao");
              }}
            >
              <Image source={btnLocacao} style={styles.imgBtn} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("InformacoesMenu");
              }}
            >
              <Image source={btnInfo} style={styles.imgBtn} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("Assistencia");
              }}
            >
              <Image source={btnAssistencia} style={styles.imgBtn} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                // Alert.alert(
                //   "Oops!",
                //   "Para acessar esta área, é necessário estar fazer login no aplicativo!",
                //   [{ text: "Entendi", onPress: () => {} }],
                //   { cancelable: false }
                // );
                this.setModalVisible(true);
              }}
            >
              <Image source={btnInstrucoes} style={styles.imgBtn} />
            </TouchableOpacity>
          </View>

          {this._verificaLogin()}
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

  viewButtons: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20
  },

  btnMenu: {
    flex: 1,
    margin: 5,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },

  imgBtn: {
    width: 127,
    height: 96
  }
});
