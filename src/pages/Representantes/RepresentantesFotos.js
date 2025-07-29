import React, { Component } from "react";
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Linking,
  SafeAreaView
} from "react-native";
import Gallery from "react-native-image-gallery";
import RNFetchBlob from "rn-fetch-blob";
import Orientation from "react-native-orientation";
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export default class RepresentantesFotos extends Component {
  static navigationOptions = {
    title: "Fotos"
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      ModalVisibleStatus: false,
      TempImageURL: "",
      ImageName: "",
      dataSource: [],
      index: 0,
      permissao: false
    };

    this.onChangeImage = this.onChangeImage.bind(this);
  }

  onChangeImage(index) {
    this.setState({ index });
  }

  async componentDidMount() {
    Orientation.unlockAllOrientations();
    await this.requestStoragePermission();
    this.carregarFotos();
  }

  carregarFotos() {
    fetch("https://www.zummo.com.br/_app/representantes_fotos.php?page=1")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

async requestStoragePermission() {
  if (Platform.OS === 'android') {
    const sdkInt = Platform.constants.Release;

    // Android 13+
    if (Platform.Version >= 33) {
      const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      return result === RESULTS.GRANTED;
    }

    // Android 10-12
    if (Platform.Version >= 29) {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }

    // Android < 10
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  return true; // iOS ou outros
}

  async download(uri, file) {
    const permissao = await this.requestStoragePermission();

    if (!permissao) {
      Alert.alert("Permissão", "Permissão negada para salvar a imagem.");
      return;
    }

    try {
      const dirs = RNFetchBlob.fs.dirs;
      const pasta = `${dirs.DownloadDir}/Zummo`;

      await RNFetchBlob.fs.mkdir(pasta).catch(() => {});

      const caminho = `${pasta}/${file}`;

      const res = await RNFetchBlob.config({
        path: caminho,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: caminho,
          description: "Imagem baixada por Zummo App"
        }
      }).fetch("GET", uri);

      await RNFetchBlob.fs.scanFile([{ path: res.path(), mime: "image/jpeg" }]);

      Alert.alert("Download", "Imagem salva com sucesso!");
    } catch (error) {
      console.error("Erro ao baixar imagem:", error);
      Alert.alert("Erro", "Não foi possível salvar a imagem.");
    }
  }

  alertDownload(uri, file) {
    Alert.alert(
      "Download",
      "Deseja salvar esta imagem?",
      [
        { text: "Sim", onPress: () => this.download(uri, file) },
        { text: "Não", style: "cancel" }
      ],
      { cancelable: true }
    );
  }

  get caption() {
    const { dataSource, index } = this.state;
    return (
      <View
        style={{
          bottom: 0,
          height: 65,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          width: "100%",
          position: "absolute",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.alertDownload(
              `https://www.zummo.com.br/_app/uploads/representantes_fotos/${dataSource[index].caption}`,
              `${dataSource[index].caption}`
            );
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
              fontStyle: "italic"
            }}
          >
            Clique aqui para baixar esta imagem
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Gallery
            style={{ flex: 1, backgroundColor: "black" }}
            images={this.state.dataSource}
            onPageSelected={this.onChangeImage}
            initialPage={0}
          />
          {this.caption}
        </View>
      </SafeAreaView>
    );
  }
}
