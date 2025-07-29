import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  SafeAreaView
} from "react-native";

import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";

export default class AnexoEnviar extends Component {
  constructor() {
    super();
    this.state = {
      ImageSource: null,
      data: null,
      Image_TAG: "",
      usuario: "",
      loader: false
    };
  }

  static navigationOptions = {
    title: "Enviar Anexo"
    //header: null,
  };

  selectPhotoTapped() {
    const options = {
      title: "Escolha uma imagem",
      cancelButtonTitle: "Cancelar",
      takePhotoButtonTitle: "Tirar uma foto",
      chooseFromLibraryButtonTitle: "Escolher da galeria",
      quality: 1.0,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, response => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        //console.log('Usuário cancelou escolha da imagem.');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //console.log('Usuário clicou no botão customizado: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          ImageSource: source,
          data: response.data
        });
      }
    });
  }

  uploadImageToServer = async () => {
    this.setState({ loader: true });

    try {
      const value = await AsyncStorage.getItem("login");
      if (value !== null) {
        // We have data!!
        this.setState({ usuario: value });
      }
    } catch (error) {
      // Error retrieving data
    }

    RNFetchBlob.fetch(
      "POST",
      `https://www.zummo.com.br/_app/upload_anexo.php?login=${
        this.state.usuario
      }`,
      {
        Authorization: "Bearer access-token",
        otherHeader: "foo",
        "Content-Type": "multipart/form-data"
      },
      [
        {
          name: "image",
          filename: "image.png",
          type: "image/png",
          data: this.state.data
        },
        { name: "image_tag", data: this.state.Image_TAG }
      ]
    )
      .then(resp => {
        this.setState({ loader: false });
        var tempMSG = resp.data;
        tempMSG = tempMSG.replace(/^"|"$/g, "");
        Alert.alert(tempMSG);
      })
      .catch(err => {
        this.setState({ loader: false });
        Alert.alert(err);
        // ...
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
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={styles.ImageContainer}>
              {this.state.ImageSource === null ? (
                <Text>Selecione ou tire uma foto</Text>
              ) : (
                <Image
                  style={styles.ImageContainer}
                  source={this.state.ImageSource}
                />
              )}
            </View>
          </TouchableOpacity>
          <TextInput
            placeholder="Insira um nome para a imagem"
            onChangeText={data => this.setState({ Image_TAG: data })}
            underlineColorAndroid="transparent"
            style={styles.TextInputStyle}
          />
          <TouchableOpacity
            onPress={this.uploadImageToServer}
            activeOpacity={0.6}
            style={styles.button}
          >
            <Text style={styles.TextStyle}> ENVIAR ANEXO </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    paddingTop: 20
  },
  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: "#e1e1e1",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd"
  },
  TextInputStyle: {
    textAlign: "center",
    height: 40,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginTop: 20
  },
  button: {
    width: "80%",
    backgroundColor: "#f16300",
    borderRadius: 7,
    marginTop: 20
  },
  TextStyle: {
    color: "#fff",
    textAlign: "center",
    padding: 10
  }
});
