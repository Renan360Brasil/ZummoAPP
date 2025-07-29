import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {TextInputMask} from 'react-native-masked-text';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const window = Dimensions.get('window');

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campoNome: '',
      campoSobrenome: '',
      campoCargo: '',
      campoRazaoSocial: '',
      campoNomeFantasia: '',
      campoCnpj: '',
      campoEmail: '',
      campoCelular: '',
      campoTelefone: '',
      campoModeloMaquina: '',
      campoSerieMaquina: '',
      campoSenha: '',
      errorNome: '',
      errorSobrenome: '',
      errorCargo: '',
      errorRazao: '',
      errorSenha: '',
      loader: false,
    };
  }

  static navigationOptions = {
    title: 'Cadastre-se',
    //header: null,
  };

  _focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  _enviaCadastro = () => {
    const {
      campoNome,
      campoSobrenome,
      campoCargo,
      campoRazaoSocial,
      campoNomeFantasia,
      campoCnpj,
      campoEmail,
      campoCelular,
      campoTelefone,
      campoModeloMaquina,
      campoSerieMaquina,
      campoSenha,
    } = this.state;

    this.setState({loader: true});

    if (!campoNome) {
      this.setState({errorNome: 'Este campo é obrigatório', loader: false});
      this._focusNextField('1');
      this.setState({loader: false});
      return false;
    }

    if (!campoSobrenome) {
      this.setState({
        errorSobrenome: 'Este campo é obrigatório',
        loader: false,
      });
      this._focusNextField('2');
      this.setState({loader: false});
      return false;
    }

    if (!campoEmail) {
      this.setState({errorEmail: 'Este campo é obrigatório', loader: false});
      this._focusNextField('7');
      this.setState({loader: false});
      return false;
    }

    if (!campoModeloMaquina) {
      this.setState({errorModelo: 'Este campo é obrigatório', loader: false});
      this._focusNextField('10');
      this.setState({loader: false});
      return false;
    }

    if (!campoSerieMaquina) {
      this.setState({errorSerie: 'Este campo é obrigatório', loader: false});
      this._focusNextField('11');
      this.setState({loader: false});
      return false;
    }

    if (!campoSenha) {
      this.setState({errorSenha: 'Este campo é obrigatório', loader: false});
      this._focusNextField('12');
      this.setState({loader: false});
      return false;
    }

    fetch('https://www.zummo.com.br/_app/cadastro.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: campoNome,
        sobrenome: campoSobrenome,
        cargo: campoCargo,
        razao_social: campoRazaoSocial,
        nome_fantasia: campoNomeFantasia,
        cnpj: campoCnpj,
        email: campoEmail,
        celular: campoCelular,
        telefone: campoTelefone,
        modelo_maquina: campoModeloMaquina,
        serie_maquina: campoSerieMaquina,
        senha: campoSenha,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({loader: false});

        // If server response message same as Data Matched
        if (responseJson === 'Cadastrado') {
          this.setState({
            campoNome: '',
            campoSobrenome: '',
            campoCargo: '',
            campoRazaoSocial: '',
            campoNomeFantasia: '',
            campoCnpj: '',
            campoEmail: '',
            campoCelular: '',
            campoTelefone: '',
            campoModeloMaquina: '',
            campoSerieMaquina: '',
            campoSenha: '',
            errorNome: '',
            errorSobrenome: '',
            errorCargo: '',
            errorRazao: '',
            errorSenha: '',
          });

          Alert.alert(
            'Sucesso!',
            'Cadastro realizado com sucesso!\nAguarde a liberação para acessar o sistema.',
            [{text: 'Entendi', onPress: () => {}}],
            {cancelable: false},
          );

          this.props.navigation.replace('Login');
        } else {
          //Alert.alert(responseJson);
          Alert.alert(
            'Oops!',
            responseJson,
            [{text: 'Entendi', onPress: () => {}}],
            {cancelable: false},
          );
        }
      })
      .catch(error => {
        this.setState({loader: false});

        console.error(error);
        Alert.alert('Erro!', error, [{text: 'Entendi', onPress: () => {}}], {
          cancelable: false,
        });
      });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView>
          <ScrollView style={styles.container}>
            <View style={{flex: 1, padding: 20}}>
              <Text style={{fontSize: 18}}>
                Preencha os campos abaixo para solicitar o acesso ao aplicativo!
              </Text>
              {/* <TextInput
                        ref='1'
                        style={styles.campoForm}
                        onChangeText={campoNome => this.setState({ campoNome })}
                        placeholder="Nome"
                        returnKeyType="next"
                        value={this.state.campoNome}
                        onSubmitEditing={() => this._focusNextField('2')}
                    /> */}

              {/* <TextInput
                        ref='10'
                        style={styles.campoForm}
                        onChangeText={campoSenha => this.setState({ campoSenha })}
                        placeholder="Senha"
                        returnKeyType="done"
                        secureTextEntry={true}
                        value={this.state.campoSenha}
                    /> */}

              <TextField
                ref="1"
                label="* Nome"
                value={this.state.campoNome}
                onChangeText={campoNome =>
                  this.setState({campoNome, errorNome: ''})
                }
                onSubmitEditing={() => this._focusNextField('2')}
                tintColor="#d5ccc2"
                returnKeyType="next"
                error={this.state.errorNome}
              />

              <TextField
                ref="2"
                label="* Sobrenome"
                value={this.state.campoSobrenome}
                onChangeText={campoSobrenome =>
                  this.setState({campoSobrenome, errorSobrenome: ''})
                }
                onSubmitEditing={() => this._focusNextField('3')}
                tintColor="#d5ccc2"
                returnKeyType="next"
                error={this.state.errorSobrenome}
              />

              <TextField
                ref="3"
                label="* Cargo"
                value={this.state.campoCargo}
                onChangeText={campoCargo =>
                  this.setState({campoCargo, errorCargo: ''})
                }
                onSubmitEditing={() => this._focusNextField('7')}
                tintColor="#d5ccc2"
                returnKeyType="next"
                error={this.state.errorCargo}
              />

              {/* <TextField
                        ref='4'
                        label='* Razão Social'
                        value={this.state.campoRazaoSocial}
                        onChangeText={campoRazaoSocial => this.setState({ campoRazaoSocial, errorRazao: '' })}
                        onSubmitEditing={() => this._focusNextField('5')}
                        tintColor="#d5ccc2"
                        returnKeyType="next"
                        error={this.state.errorRazao}
                    /> */}

              {/* <TextField
                        ref='5'
                        label='* Nome Fantasia'
                        value={this.state.campoNomeFantasia}
                        onChangeText={campoNomeFantasia => this.setState({ campoNomeFantasia, errorFantasia: '' })}
                        onSubmitEditing={() => this._focusNextField('6')}
                        tintColor="#d5ccc2"
                        returnKeyType="next"
                        error={this.state.errorFantasia}
                    /> */}

              {/* <TextInputMask
                        ref='6'
                        refInput={ref => { this.input = ref }}
                        label='* CNPJ'
                        placeholder="* CNPJ"
                        value={this.state.campoCnpj}
                        onChangeText={campoCnpj => this.setState({ campoCnpj, errorCNPJ: '' })}
                        onSubmitEditing={() => this._focusNextField('7')}
                        tintColor="#d5ccc2"
                        returnKeyType="next"
                        error={this.state.errorCNPJ}
                        style={{ borderWidth: 0.5, borderColor: "transparent", borderBottomColor: "rgba(0, 0, 0, 0.2)", marginTop: 10, height: 60 }}
                        type={'cnpj'}
                    /> */}

              <TextField
                ref="7"
                label="* E-mail"
                value={this.state.campoEmail}
                onChangeText={campoEmail =>
                  this.setState({campoEmail, errorCNPJ: ''})
                }
                onSubmitEditing={() => {
                  this.celularRef.getElement().focus();
                }}
                tintColor="#d5ccc2"
                returnKeyType="next"
                error={this.state.errorEmail}
              />

              <TextInputMask
                ref={ref => (this.celularRef = ref)}
                label="* Celular"
                placeholder="* Celular"
                value={this.state.campoCelular}
                onChangeText={campoCelular =>
                  this.setState({campoCelular, errorCelular: ''})
                }
                onSubmitEditing={() => {
                  this.telefoneRef.getElement().focus();
                }}
                tintColor="#d5ccc2"
                returnKeyType="next"
                error={this.state.errorCelular}
                style={{
                  borderWidth: 0.5,
                  borderColor: 'transparent',
                  borderBottomColor: 'rgba(0, 0, 0, 0.2)',
                  marginTop: 10,
                  height: 60,
                }}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
              />

              <TextInputMask
                ref={ref => (this.telefoneRef = ref)}
                label="* Telefone"
                placeholder="* Telefone"
                value={this.state.campoTelefone}
                onChangeText={campoTelefone =>
                  this.setState({campoTelefone, errorTelefone: ''})
                }
                onSubmitEditing={() => this._focusNextField('10')}
                tintColor="#d5ccc2"
                returnKeyType="next"
                error={this.state.errorTelefone}
                style={{
                  borderWidth: 0.5,
                  borderColor: 'transparent',
                  borderBottomColor: 'rgba(0, 0, 0, 0.2)',
                  marginTop: 10,
                  height: 60,
                }}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
              />

              <TextField
                ref="10"
                label="* Modelo da Máquina"
                value={this.state.campoModeloMaquina}
                onChangeText={campoModeloMaquina =>
                  this.setState({campoModeloMaquina, errorModelo: ''})
                }
                onSubmitEditing={() => this._focusNextField('11')}
                tintColor="#d5ccc2"
                returnKeyType="next"
                error={this.state.errorModelo}
              />

              <TextField
                ref="11"
                label="* Nº Série da Máquina"
                value={this.state.campoSerieMaquina}
                onChangeText={campoSerieMaquina =>
                  this.setState({campoSerieMaquina, errorSerie: ''})
                }
                onSubmitEditing={() => this._focusNextField('12')}
                tintColor="#d5ccc2"
                returnKeyType="next"
                error={this.state.errorSerie}
              />

              <TextField
                ref="12"
                label="* Senha"
                value={this.state.campoSenha}
                onChangeText={campoSenha =>
                  this.setState({campoSenha, errorSenha: ''})
                }
                tintColor="#d5ccc2"
                secureTextEntry={true}
                returnKeyType="done"
                error={this.state.errorSenha}
              />

              <TouchableOpacity
                style={styles.btnLogin}
                onPress={this._enviaCadastro}>
                <Text style={styles.btnLoginText}>CADASTRAR</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },

  campoForm: {
    width: window.width - 30,
    height: 60,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#FFF',
    color: '#000',
  },

  btnLogin: {
    marginTop: 20,
    width: window.width - 30,
    height: 50,
    padding: 10,
    backgroundColor: '#d5ccc2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnLoginText: {
    color: '#FFF',
  },
});
