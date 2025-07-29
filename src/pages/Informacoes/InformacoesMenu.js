import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';

import Orientation from 'react-native-orientation';

const logo = require('../../images/logo.png');

const btnFeiraEventos = require('../../images/btn-feira-eventos.png');
const btnZummo = require('../../images/btn-zummo-institucional.png');

import {NavigationActions, StackActions} from 'react-navigation';

export default class InformacoesMenu extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Informações e Vídeos',
      //header: null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      logado: 'N',
      modalVisible: false,
    };
  }

  componentWillMount() {
    this.setModalVisible(!this.state.modalVisible);
    Orientation.lockToPortrait();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <View style={{flex: 1, padding: 20}}>
            <Image
              source={logo}
              style={{width: 150, height: 30, marginTop: 20}}
            />
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("Informacoes", {
                  categoria: 1,
                });
              }}>
              <Image source={btnFeiraEventos} style={styles.imgBtn} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("Informacoes", {
                  categoria: 2,
                });
              }}>
              <Image source={btnZummo} style={styles.imgBtn} />
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
    backgroundColor: '#f6f6f6',
  },

  viewButtons: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },

  btnMenu: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgBtn: {
    width: 127,
    height: 96,
  },
});
