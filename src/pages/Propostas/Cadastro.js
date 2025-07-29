import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView
} from "react-native";
import { TextField } from "react-native-material-textfield";
import { TextInputMask } from "react-native-masked-text";

const window = Dimensions.get("window");

export default class Propostas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campo1: "",
      campo2: "",
      campo3: "",
      campo4: "",
      campo5: "",
      campo6: "",
      campo7: "",
      campo8: "",
      campo9: "",
      campo10: "",
      campo11: "",
      campo12: "",
      campo13: "",
      campo14: "",
      campo15: "",
      campo16: "",
      error1: "",
      error2: "",
      error3: "",
      error4: "",
      error5: "",
      error6: "",
      error7: "",
      error8: "",
      error9: "",
      error10: "",
      error11: "",
      error12: "",
      error13: "",
      error14: "",
      error15: "",
      error16: "",
      loader: false
    };
  }

  static navigationOptions = {
    title: "Cadastrar Proposta"
    //header: null,
  };

  _focusNextField(nextField) {
    if (nextField == "1" || nextField == "3") {
      this.refs[nextField]._inputElement.focus();
    } else {
      this.refs[nextField].focus();
    }
  }

  _enviaCadastro = () => {
    const {
      campo1,
      campo2,
      campo3,
      campo4,
      campo5,
      campo6,
      campo7,
      campo8,
      campo9,
      campo10,
      campo11,
      campo12,
      campo13,
      campo14,
      campo15,
      campo16
    } = this.state;

    this.setState({ loader: true });

    if (!campo1) {
      this.setState({ error1: "Este campo é obrigatório", loader: false });
      this._focusNextField("1");
      this.setState({ loader: false });
      return false;
    }

    if (!campo2) {
      this.setState({ error2: "Este campo é obrigatório", loader: false });
      this._focusNextField("2");
      this.setState({ loader: false });
      return false;
    }

    if (!campo3) {
      this.setState({ error3: "Este campo é obrigatório", loader: false });
      this._focusNextField("3");
      this.setState({ loader: false });
      return false;
    }

    if (!campo4) {
      this.setState({ error4: "Este campo é obrigatório", loader: false });
      this._focusNextField("4");
      this.setState({ loader: false });
      return false;
    }

    if (!campo5) {
      this.setState({ error5: "Este campo é obrigatório", loader: false });
      this._focusNextField("5");
      this.setState({ loader: false });
      return false;
    }

    if (!campo6) {
      this.setState({ error6: "Este campo é obrigatório", loader: false });
      this._focusNextField("6");
      this.setState({ loader: false });
      return false;
    }

    if (!campo7) {
      this.setState({ error7: "Este campo é obrigatório", loader: false });
      this._focusNextField("7");
      this.setState({ loader: false });
      return false;
    }

    if (!campo8) {
      this.setState({ error8: "Este campo é obrigatório", loader: false });
      this._focusNextField("8");
      this.setState({ loader: false });
      return false;
    }

    if (!campo9) {
      this.setState({ error9: "Este campo é obrigatório", loader: false });
      this._focusNextField("9");
      this.setState({ loader: false });
      return false;
    }

    if (!campo10) {
      this.setState({ error10: "Este campo é obrigatório", loader: false });
      this._focusNextField("10");
      this.setState({ loader: false });
      return false;
    }

    if (!campo11) {
      this.setState({ error1111: "Este campo é obrigatório", loader: false });
      this._focusNextField("11");
      this.setState({ loader: false });
      return false;
    }

    if (!campo12) {
      this.setState({ error12: "Este campo é obrigatório", loader: false });
      this._focusNextField("12");
      this.setState({ loader: false });
      return false;
    }

    if (!campo13) {
      this.setState({ error13: "Este campo é obrigatório", loader: false });
      this._focusNextField("13");
      this.setState({ loader: false });
      return false;
    }

    if (!campo14) {
      this.setState({ error14: "Este campo é obrigatório", loader: false });
      this._focusNextField("14");
      this.setState({ loader: false });
      return false;
    }

    if (!campo15) {
      this.setState({ error15: "Este campo é obrigatório", loader: false });
      this._focusNextField("15");
      this.setState({ loader: false });
      return false;
    }

    if (!campo16) {
      this.setState({ error16: "Este campo é obrigatório", loader: false });
      this._focusNextField("16");
      this.setState({ loader: false });
      return false;
    }

    this.setState({ loader: true });

    fetch("https://www.zummo.com.br/_app/proposta_cadastro.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        campo1,
        campo2,
        campo3,
        campo4,
        campo5,
        campo6,
        campo7,
        campo8,
        campo9,
        campo10,
        campo11,
        campo12,
        campo13,
        campo14,
        campo15,
        campo16
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ loader: false });

        // If server response message same as Data Matched
        if (responseJson === "Cadastrado") {
          this.setState({
            campo1: "",
            campo2: "",
            campo3: "",
            campo4: "",
            campo5: "",
            campo6: "",
            campo7: "",
            campo8: "",
            campo9: "",
            campo10: "",
            campo11: "",
            campo12: "",
            campo13: "",
            campo14: "",
            campo15: "",
            campo16: "",
            error1: "",
            error2: "",
            error3: "",
            error4: "",
            error5: "",
            error6: "",
            error7: "",
            error8: "",
            error9: "",
            error10: "",
            error11: "",
            error12: "",
            error13: "",
            error14: "",
            error15: "",
            error16: ""
          });

          Alert.alert(
            "Sucesso!",
            "Proposta cadastrada com sucesso!",
            [{ text: "Entendi", onPress: () => {} }],
            { cancelable: false }
          );

          this.props.navigation.goBack();
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
              Preencha os campos abaixo para cadastrar uma nova proposta.
            </Text>

            <TextInputMask
              ref="1"
              refInput={ref => {
                this.input = ref;
              }}
              label="* 1. Data Proposta"
              placeholder="* 1. Data Propsota"
              value={this.state.campo1}
              onChangeText={campo1 => this.setState({ campo1, error1: "" })}
              onSubmitEditing={() => this._focusNextField("2")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error1}
              style={{
                borderWidth: 0.5,
                borderColor: "transparent",
                borderBottomColor: "rgba(0, 0, 0, 0.2)",
                marginTop: 10,
                height: 60
              }}
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY"
              }}
            />

            <TextField
              ref="2"
              label="* 2. Cliente"
              value={this.state.campo2}
              onChangeText={campo2 => this.setState({ campo2, error2: "" })}
              onSubmitEditing={() => this._focusNextField("3")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error2}
            />

            <TextInputMask
              ref="3"
              //refInput={ref => { this.input = ref }}
              label="* 3. CNPJ"
              placeholder="* 3. CNPJ"
              value={this.state.campo3}
              onChangeText={campo3 => this.setState({ campo3, error3: "" })}
              onSubmitEditing={() => this._focusNextField("4")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error3}
              style={{
                borderWidth: 0.5,
                borderColor: "transparent",
                borderBottomColor: "rgba(0, 0, 0, 0.2)",
                marginTop: 10,
                height: 60
              }}
              type={"cnpj"}
            />

            <TextField
              ref="4"
              label="* 4. Quantidade"
              value={this.state.campo4}
              onChangeText={campo4 => this.setState({ campo4, error4: "" })}
              onSubmitEditing={() => this._focusNextField("5")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error4}
            />

            <TextField
              ref="5"
              label="* 5. Produto"
              value={this.state.campo5}
              onChangeText={campo5 => this.setState({ campo5, error5: "" })}
              onSubmitEditing={() => this._focusNextField("6")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error5}
            />

            <TextField
              ref="6"
              label="* 6. Descrição Produto"
              value={this.state.campo6}
              onChangeText={campo6 => this.setState({ campo6, error6: "" })}
              onSubmitEditing={() => this._focusNextField("7")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error6}
            />

            <TextField
              ref="7"
              label="* 7. Nome Produto + Valor"
              value={this.state.campo7}
              onChangeText={campo7 => this.setState({ campo7, error7: "" })}
              onSubmitEditing={() => this._focusNextField("8")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error7}
            />

            <TextField
              ref="8"
              label="* 8. NCM"
              value={this.state.campo8}
              onChangeText={campo8 => this.setState({ campo8, error8: "" })}
              onSubmitEditing={() => this._focusNextField("9")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error8}
            />

            <TextField
              ref="9"
              label="* 9. Linha 1 (*)"
              value={this.state.campo9}
              onChangeText={campo9 => this.setState({ campo9, error9: "" })}
              onSubmitEditing={() => this._focusNextField("10")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error9}
            />

            <TextField
              ref="10"
              label="* 10. Linha 2 (-)"
              value={this.state.campo10}
              onChangeText={campo10 => this.setState({ campo10, error10: "" })}
              onSubmitEditing={() => this._focusNextField("11")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error10}
            />

            <TextField
              ref="11"
              label="* 11. Descrição Produto NF"
              value={this.state.campo11}
              onChangeText={campo11 => this.setState({ campo11, error11: "" })}
              onSubmitEditing={() => this._focusNextField("12")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error11}
            />

            <TextField
              ref="12"
              label="* 12. Instalação Máquina"
              value={this.state.campo12}
              onChangeText={campo12 => this.setState({ campo12, error12: "" })}
              onSubmitEditing={() => this._focusNextField("13")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error12}
            />

            <TextField
              ref="13"
              label="* 13. Prazo Entrega"
              value={this.state.campo13}
              onChangeText={campo13 => this.setState({ campo13, error13: "" })}
              onSubmitEditing={() => this._focusNextField("14")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error13}
            />

            <TextField
              ref="14"
              label="* 14. Transporte/Frete"
              value={this.state.campo14}
              onChangeText={campo14 => this.setState({ campo14, error14: "" })}
              onSubmitEditing={() => this._focusNextField("15")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error14}
            />

            <TextField
              ref="15"
              label="* 15. Validade"
              value={this.state.campo15}
              onChangeText={campo15 => this.setState({ campo15, error15: "" })}
              onSubmitEditing={() => this._focusNextField("16")}
              tintColor="#ff6b00"
              returnKeyType="next"
              error={this.state.error15}
            />

            <TextField
              ref="16"
              label="* 16. Representante"
              value={this.state.campo16}
              onChangeText={campo16 => this.setState({ campo16, error16: "" })}
              tintColor="#ff6b00"
              returnKeyType="done"
              error={this.state.error16}
            />

            <TouchableOpacity
              style={styles.btnLogin}
              onPress={this._enviaCadastro}
            >
              <Text style={styles.btnLoginText}>CADASTRAR</Text>
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

  campoForm: {
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
