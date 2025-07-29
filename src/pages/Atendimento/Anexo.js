import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import NetInfo from '@react-native-community/netinfo';
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import Pusher from "pusher-js/react-native";

import api from "../../services/api_zummo";

const noConnection = require("../../images/no-connection.png");

export default class Anexo extends Component {
  constructor(props) {
    super(props);

    this.arrayholder = [];
  }

  static navigationOptions = {
    title: "Anexos"
    //header: null,
  };

  state = {
    anexosInfo: {},
    anexos: [],
    page: 1,
    loader: false,
    connectionStatus: ""
  };

  componentWillMount() {
    this.setState({ loader: true });
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected == true) {
        this.setState({ connectionStatus: "Online" });
      } else {
        this.setState({ connectionStatus: "Offline" });
      }
    });

    var pusher = new Pusher("9bb8ea6dc2e81c3eaca2", {
      cluster: "us2",
      forceTLS: true
    });

    var channel = pusher.subscribe("my-anexos");
    channel.bind("my-anexosUpdate", data => {
      this.setState({
        anexos: data.anexos
      });
    });

    this.loadpropostas();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
  }

  loadpropostas = async (page = 1) => {
    const login = await AsyncStorage.getItem("login");
    const response = await api.get(`anexos.php?id=${login}`);

    const { anexos, ...anexosInfo } = response.data;
    this.arrayholder = [...this.arrayholder, ...anexos];

    this.setState({
      anexos: [...this.state.anexos, ...anexos],
      anexosInfo,
      loader: false,
      page
    });
  };

  loadMore = () => {
    const { page, anexosInfo } = this.state;
    if (page === anexosInfo.page) return;
    const pageNumber = page + 1;
    this.loadpropostas(pageNumber);
  };

  _handleConnectivityChange = isConnected => {
    if (isConnected == true) {
      this.setState({ connectionStatus: "Online" });
      this.loadpropostas();
    } else {
      this.setState({ connectionStatus: "Offline" });
    }
  };

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.descricao.toUpperCase()}   
          ${item.descricao.toUpperCase()} ${item.codigo.toUpperCase()} ${item.grupo.toUpperCase()} ${item.especie.toUpperCase()} ${item.preco.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ anexos: newData });
  };

  openFile = async file => {
    this.setState({ loader: true });

    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/${file.file}`;

      await RNFS.downloadFile({
        fromUrl: `http://www.zummo.com.br/_app/uploads/anexos/${file.file}`,
        toFile: filePath
      }).promise;

      this.setState({ loader: false });

      await FileViewer.open(filePath);
    } catch (err) {
      console.log(err);
    }
  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity
        // onPress={() => { this.props.navigation.push("AnexoVer", { id: item.file }) }}
        onPress={() => {
          this.openFile(item);
        }}
      >
        <Text style={styles.productTitle} selectable={true} key={item.id}>
          {item.file}
        </Text>
        <Text style={styles.productDescription} selectable={true} key={item.id}>
          Data: {item.data}
        </Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    if (this.state.connectionStatus == "Online") {
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
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.anexos}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              ref="flatListRef"
            />

            <ActionButton
              buttonColor="rgba(255,106,19,1)"
              buttonText={<Icon name="ios-add" style={{ fontSize: 32 }} />}
              onPress={() => {
                this.props.navigation.push("AnexoEnviar");
              }}
            />
          </View>
        </SafeAreaView>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={noConnection}
          style={{
            width: 200,
            height: 137,
            resizeMode: "contain",
            marginBottom: 15
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "#040608",
            textAlign: "center"
          }}
        >
          Sem conexão com a internet
        </Text>
        <Text
          style={{
            fontWeight: "100",
            fontSize: 14,
            color: "#555",
            textAlign: "center"
          }}
        >
          Verifique sua conexão com Wi-Fi ou Internet Móvel.
        </Text>
        <Text
          style={{
            fontWeight: "100",
            fontSize: 14,
            color: "#555",
            textAlign: "center"
          }}
        >
          Aguardando a conexão para exibir os anexos.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },

  list: {
    padding: 20
  },

  productContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 5,
    marginBottom: 20,
    padding: 20
  },

  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },

  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },

  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#ff6a00",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },

  productButtonText: {
    fontSize: 16,
    color: "#ff6a00",
    fontWeight: "bold"
  }
});
