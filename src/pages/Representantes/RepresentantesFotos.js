import React, { Component } from "react";
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  SafeAreaView
} from "react-native";
import Gallery from "react-native-image-gallery";
import RNFetchBlob from "rn-fetch-blob";
import Orientation from "react-native-orientation-locker";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

export default class RepresentantesFotos extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
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
    const perm = await this.requestStoragePermission();
    this.setState({ permissao: perm });
    this.carregarFotos();
  }

  carregarFotos() {
    fetch("https://www.zummo.com.br/_app/representantes_fotos.php?page=1")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ isLoading: false, dataSource: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

async requestStoragePermission() {
  if (Platform.OS !== "android") return true;

  const sdk = Platform.Version;

  if (sdk >= 33) {
    // Android 13+
    const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    return result === RESULTS.GRANTED;
  }

  if (sdk >= 30 && sdk <= 32) {
    // Android 11 e 12
    const readGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    console.log("READ_EXTERNAL_STORAGE:", readGranted);
    return readGranted === PermissionsAndroid.RESULTS.GRANTED;
  }

  // Android 10 e abaixo
  const writeGranted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  );
  return writeGranted === PermissionsAndroid.RESULTS.GRANTED;
}


  async download(uri, file) {
    if (!this.state.permissao) {
      Alert.alert("Permissão", "Permissão negada para salvar a imagem.");
      return;
    }

    try {
      const dirs = RNFetchBlob.fs.dirs;

      await RNFetchBlob.config({
  addAndroidDownloads: {
    useDownloadManager: true,
    notification: true,
    path: `${dirs.DownloadDir}/${file}`, // sem subpasta!
    mime: "image/jpeg",
    mediaScannable: true,
    description: "Imagem baixada por Zummo App"
  },
  fileCache: true
}).fetch("GET", uri);

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
    if (!dataSource[index]) return null;
    return (
      <View
        style={{
          bottom: 0,
          height: 65,
          backgroundColor: "rgba(0,0,0,0.7)",
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
