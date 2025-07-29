import React, { Component } from 'react';

import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import api from '../../services/api_zummo';

import RNFetchBlob from "rn-fetch-blob";

import CoresZ1 from './CoresZ1';
import CoresZ06 from './CoresZ06';
import CoresZ14 from './CoresZ14';

const z1nature = require('../../images/Z1-Nature.png');
const z06nature = require('../../images/Z06-Nature.png');
const z40nature = require('../../images/Z40-Nature.png');
const z14nature = require('../../images/Z14-Nature.png');
const z14natureSS = require('../../images/Z14-Nature-Self-Service.png');
const z14natureSSP = require('../../images/Z14-Nature-Self-Service-Plus.png');
const z14natureFresh = require('../../images/Z14-Nature-Fresh.png');
const z40natureSSFresh = require('../../images/Z40-Nature-SS.png');
const z40natureSPFresh = require('../../images/Z40-Nature-SPLUS.png');
const z40natureSSPFresh = require('../../images/Z40-Nature-SSPLUS.png');

const vol1 = require('../../images/vol1.png');
const vol2 = require('../../images/vol2.png');
const vol3 = require('../../images/vol3.png');
const vol4 = require('../../images/vol4.png');
const vol5 = require('../../images/vol5.png');
const vol6 = require('../../images/vol6.png');

const z1tipoFruta = require('../../images/z1-tipo-fruta.png');
const z06tipoFruta = require('../../images/z06-tipo-fruta.png');
const z40tipoFruta = require('../../images/z40-tipo-fruta.png');
const z14tipoFruta = require('../../images/z14-tipo-fruta.png');
const z14SStipoFruta = require('../../images/z14-tipo-fruta.png');
const z40SSPtipoFruta = require('../../images/z40SSP-tipo-fruta.png');

const z1tech = require('../../images/z1-tech.png');
const z06tech = require('../../images/z06-tech.png');
const z14tech = require('../../images/z06-tech.png');
const z40tech = require('../../images/z40-tech.png');
const z14SStech = require('../../images/z14SS-tech.png');
const z14SSPtech = require('../../images/z14SSP-tech.png');
const z14Freshtech = require('../../images/z14Fresh-tech.png');
const z40SSPtech = require('../../images/z40SSP-tech.png');

export default class ProdutoNovo extends Component {
  state = {
    productInfo: {},
    especInfo: {},
    produtos: [],
    especs: [],
    page: 1,
    id: 1,
    idEspec: 1,
    titulo: '',
    loader: false,
    modalVisible: false,
    modalImg: '',
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title || 'Produto',
  });

  componentWillMount() {
    this.setState({ loader: true });
  }

  componentDidMount() {
    this.loadProducts();
    this.loadEspecs();
  }

  async requestCardPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await this.setState({ permissao: true });
      } else {
        await this.setState({ permissao: false });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async downloadFicha(uri, file, mime) {
    await this.requestCardPermission();

    const {
      dirs: { DownloadDir, DocumentDir },
    } = RNFetchBlob.fs;
    const isIOS = Platform.OS === 'ios';
    const directoryPath = Platform.select({
      ios: DocumentDir,
      android: DownloadDir,
    });

    if (this.state.permissao) {
      let dirs = RNFetchBlob.fs.dirs;
      RNFetchBlob.config({
        // response data will be saved to this path if it has access right.
        path: directoryPath + "/Zummo/" + file,
        android: {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            // mime: mimeType,
            title: file,
            mediaScannable: true,
            notification: true,
          },
        }
      })
        .fetch("GET", uri, {
          //some headers ..
        })
        .then(res => {
          // the path should be dirs.DocumentDir + 'path-to-file.anything'
          RNFetchBlob.fs.scanFile([{ path: res.path(), mime }]);
          //alert('Imagem salva com sucesso! ' + res.path());
          Alert.alert(
            "Download",
            "Ficha Técnica Salva em DOWNLOADS com Sucesso!",
            [{ text: "Fechar", onPress: () => { }, style: "cancel" }],
            { cancelable: true }
          );

          if (isIOS) {
            RNFetchBlob.ios.openDocument(res.data);
          }
        });
    }
  }

  alertDownloadFicha(uri, file, mime) {
    Alert.alert(
      "Download",
      `Deseja salvar esta Ficha Técnica?`,
      [
        { text: "Sim", onPress: () => this.downloadFicha(uri, file, mime) },
        { text: "Não", onPress: () => { }, style: "cancel" }
      ],
      { cancelable: true }
    );
  }

  async downloadFolheto(uri, file, mime) {
    await this.requestCardPermission();

    const {
      dirs: { DownloadDir, DocumentDir },
    } = RNFetchBlob.fs;
    const isIOS = Platform.OS === 'ios';
    const directoryPath = Platform.select({
      ios: DocumentDir,
      android: DownloadDir,
    });

    if (this.state.permissao) {
      let dirs = RNFetchBlob.fs.dirs;
      RNFetchBlob.config({
        // response data will be saved to this path if it has access right.
        path: directoryPath + "/Zummo/" + file,
        android: {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            // mime: mimeType,
            title: file,
            mediaScannable: true,
            notification: true,
          },
        }
      })
        .fetch("GET", uri, {
          //some headers ..
        })
        .then(res => {
          // the path should be dirs.DocumentDir + 'path-to-file.anything'
          RNFetchBlob.fs.scanFile([{ path: res.path(), mime }]);
          //alert('Imagem salva com sucesso! ' + res.path());
          Alert.alert(
            "Download",
            "Folder em DOWNLOADS com Sucesso!",
            [{ text: "Fechar", onPress: () => { }, style: "cancel" }],
            { cancelable: true }
          );

          if (isIOS) {
            RNFetchBlob.ios.openDocument(res.data);
          }
        });
    }
  }

  alertDownloadFolheto(uri, file, mime) {
    Alert.alert(
      "Download",
      `Deseja salvar este Folheto Informativo?`,
      [
        { text: "Sim", onPress: () => this.downloadFolheto(uri, file, mime) },
        { text: "Não", onPress: () => { }, style: "cancel" }
      ],
      { cancelable: true }
    );
  }

  loadProducts = async (id = 1) => {
    const { navigation } = this.props;
    const idParam = navigation.getParam('id');

    const response = await api.get(`get_produto2.php?id=${idParam}`);
    const { produtos, ...productInfo } = response.data;
    this.setState({
      produtos: [...this.state.produtos, ...produtos],
      productInfo,
      loader: false,
      titulo: produtos.titulo,
      id,
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  loadEspecs = async (idEspec = 1) => {
    const { navigation } = this.props;
    const idParam = navigation.getParam('id');

    const response = await api.get(`get_especificacoes.php?id=${idParam}`);
    const { especs, ...especInfo } = response.data;
    this.setState({
      especs: [...this.state.especs, ...especs],
      especInfo,
      loader: false,
      idEspec,
    });
  };

  renderItemProd = ({ item }) => {
    return (
      <View>
        {item.thumb == 'Z1-Nature.png' ? (
          <Image
            source={z1nature}
            style={{ flex: 1, width: null, height: 550 }}
            resizeMode={'stretch'}
          />
        ) : null}
        {item.thumb == 'Z06-Nature.png' ? (
          <Image
            source={z06nature}
            style={{ flex: 1, width: null, height: 550 }}
            resizeMode={'stretch'}
          />
        ) : null}
        {item.thumb == 'Z14-Nature.png' ? (
          <Image
            source={z14nature}
            style={{ flex: 1, width: null, height: 550 }}
            resizeMode={'stretch'}
          />
        ) : null}
        {item.thumb == 'Z40-Nature.png' ? (
          <Image
            source={z40nature}
            style={{ flex: 1, width: null, height: 550 }}
            resizeMode={'stretch'}
          />
        ) : null}
        {item.thumb == 'Z14-Nature-Self-Service.png' ? (
          <Image
            source={z14natureSS}
            style={{ flex: 1, width: null, height: 550 }}
            resizeMode={'stretch'}
          />
        ) : null}
        {item.thumb == 'Z14-Nature-Self-Service-Plus.png' ? (
          <Image
            source={z14natureSSP}
            style={{ flex: 1, width: null, height: 550 }}
            resizeMode={'stretch'}
          />
        ) : null}
        {item.thumb == 'Z14-Nature-Fresh.png' ? (
          <Image
            source={z14natureFresh}
            style={{ flex: 1, width: null, height: 550 }}
            resizeMode={'stretch'}
          />
        ) : null}
        {item.thumb == 'Z40-Nature-SS.png' ? (
          <Image
            source={z40natureSSFresh}
            style={{ flex: 1, width: null, height: 550 }}
            resizeMode={'stretch'}
          />
        ) : null}
        {item.thumb == 'Z40-Nature-SSPLUS.png' ? (
          <Image
            source={z40natureSSPFresh}
            style={{ flex: 1, width: null, height: 550 }}
            resizeMode={'stretch'}
          />
        ) : null}
        {item.thumb == 'Z40-Nature-SPLUS.png' ? (
          <Image
            source={z40natureSPFresh}
            style={{ flex: 1, width: null, height: 550 }}
            resizeMode={'stretch'}
          />
        ) : null}

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(item.video);
          }}
          style={{
            backgroundColor: '#040608',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
            Assista ao vídeo demonstrativo
          </Text>
        </TouchableOpacity>

        <Text style={styles.text}>{item.descricao}</Text>

        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: '#e5e5e5',
            marginBottom: 20,
          }}
        />

        {item.cores == 'S' && item.titulo == 'Z01' || item.titulo == 'Z1' ? <CoresZ1 /> : null}

        {item.cores == 'S' && item.titulo == 'Z06' ? <CoresZ06 /> : null}

        {item.cores == 'S' && item.titulo == 'Z14' ? <CoresZ14 /> : null}

        <Text style={{ textAlign: 'center', marginTop: 15, color: '#000' }}>
          Volume
        </Text>
        {item.vol == 'vol1' ? (
          <Image
            source={vol1}
            style={{ flex: 1, width: 152, height: 25, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.vol == 'vol2' ? (
          <Image
            source={vol2}
            style={{ flex: 1, width: 152, height: 25, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.vol == 'vol3' ? (
          <Image
            source={vol3}
            style={{ flex: 1, width: 152, height: 25, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.vol == 'vol4' ? (
          <Image
            source={vol4}
            style={{ flex: 1, width: 152, height: 25, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.vol == 'vol5' ? (
          <Image
            source={vol5}
            style={{ flex: 1, width: 152, height: 25, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.vol == 'vol6' ? (
          <Image
            source={vol6}
            style={{ flex: 1, width: 152, height: 25, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}

        <Text style={{ textAlign: 'center', marginTop: 15, color: '#000' }}>
          Tipo de Fruta
        </Text>
        {item.tipoFruta == 'z1tipoFruta' ? (
          <Image
            source={z1tipoFruta}
            style={{ flex: 1, width: 19, height: 22, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tipoFruta == 'z06tipoFruta' ? (
          <Image
            source={z06tipoFruta}
            style={{ flex: 1, width: 170, height: 22, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tipoFruta == 'z14tipoFruta' ? (
          <Image
            source={z14tipoFruta}
            style={{ flex: 1, width: 170, height: 22, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tipoFruta == 'z40tipoFruta' ? (
          <Image
            source={z40tipoFruta}
            style={{ flex: 1, width: 170, height: 22, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}

        {item.tipoFruta == 'z14SStipoFruta' ? (
          <Image
            source={z14SStipoFruta}
            style={{ flex: 1, width: 170, height: 22, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}

        {item.tipoFruta == 'z14SSPtipoFruta' ? (
          <Image
            source={z14SStipoFruta}
            style={{ flex: 1, width: 170, height: 22, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}

        {item.tipoFruta == 'z14FreshtipoFruta' ? (
          <Image
            source={z14tipoFruta}
            style={{ flex: 1, width: 170, height: 22, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}

        {item.tipoFruta == 'z40SSPtipoFruta' ? (
          <Image
            source={z40SSPtipoFruta}
            style={{ flex: 1, width: 170, height: 22, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}

        {item.tipoFruta == 'z40SStipoFruta' ? (
          <Image
            source={z40SSPtipoFruta}
            style={{ flex: 1, width: 170, height: 22, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}

        {item.tipoFruta == 'z40SPtipoFruta' ? (
          <Image
            source={z40SSPtipoFruta}
            style={{ flex: 1, width: 170, height: 22, alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        ) : null}

        {item.tech == 'z1tech' ? (
          <Image
            source={z1tech}
            style={{
              flex: 1,
              width: 300,
              height: 70,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tech == 'z06tech' ? (
          <Image
            source={z06tech}
            style={{
              flex: 1,
              width: 300,
              height: 70,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tech == 'z14tech' ? (
          <Image
            source={z14tech}
            style={{
              flex: 1,
              width: 300,
              height: 70,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tech == 'z40tech' ? (
          <Image
            source={z40tech}
            style={{
              flex: 1,
              width: 300,
              height: 70,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tech == 'z14SStech' ? (
          <Image
            source={z14SStech}
            style={{
              flex: 1,
              width: 300,
              height: 70,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tech == 'z14SSPtech' ? (
          <Image
            source={z14SSPtech}
            style={{
              flex: 1,
              width: 300,
              height: 70,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tech == 'z14Freshtech' ? (
          <Image
            source={z14Freshtech}
            style={{
              flex: 1,
              width: 300,
              height: 70,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tech == 'z40SStech' ? (
          <Image
            source={z40SSPtech}
            style={{
              flex: 1,
              width: 300,
              height: 70,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tech == 'z40SSPtech' ? (
          <Image
            source={z40SSPtech}
            style={{
              flex: 1,
              width: 300,
              height: 70,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
        ) : null}
        {item.tech == 'z40SPtech' ? (
          <Image
            source={z40SSPtech}
            style={{
              flex: 1,
              width: 300,
              height: 70,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
        ) : null}
      </View>
    );
  };

  renderItemEspec = ({ item, index }) => (
    <View>
      <View style={{
        padding: 10,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
      }}>
        <View
          style={[styles.produtoTituloEspec, { backgroundColor: item.background }]}>
          <Text
            style={[
              styles.txtTituloEspec,
              // {color: item.title, fontWeight: 'bold'},
              { color: '#040608', fontWeight: 'bold' },
            ]}>
            {item.caracteristica}
          </Text>
        </View>

        <View style={[styles.produtoEspec, { backgroundColor: item.background }]}>
          {/* <Text style={[styles.txtEspec, {color: item.text}]}>{item.valor}</Text> */}
          <Text style={[styles.txtEspec, { color: "#444" }]}>{item.valor}</Text>
        </View>
      </View>

      {(item.ficha_tecnica && index == (this.state.especs.length - 1)) ? (
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#222", height: 50, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              this.alertDownloadFicha(
                `https://www.zummo.com.br/_app/uploads/ficha_tecnica/${item.ficha_tecnica}`,
                `${item.ficha_tecnica}`,
                `${item.mime_ficha}`
              );
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#FFF",
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >
              Download Ficha Técnica
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {(item.folheto && index == (this.state.especs.length - 1)) ? (
        <View style={{ marginTop: 0 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#444", height: 50, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              this.alertDownloadFolheto(
                `https://www.zummo.com.br/_app/uploads/folheto/${item.folheto}`,
                `${item.folheto}`,
                `${item.mime_folheto}`
              );
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#FFF",
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >
              Download Folder
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );

  render() {
    if (this.state.loader) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#040608',
          }}>
          <ActivityIndicator color="#FFFFFF" size="large" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.produtos}
            keyExtractor={item => item.id}
            renderItem={this.renderItemProd}
          />
          <Text
            style={{
              color: '#000',
              alignSelf: 'center',
              marginVertical: 15,
              fontWeight: 'bold',
            }}>
            Especificações Técnicas
          </Text>
          <FlatList
            contentContainerStyle={styles.listEspec}
            data={this.state.especs}
            keyExtractor={item => item.idEspec}
            renderItem={this.renderItemEspec}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  text: {
    fontSize: 16,
    color: '#040608',
    padding: 20,
    lineHeight: 24,
    textAlign: 'justify',
  },
});
