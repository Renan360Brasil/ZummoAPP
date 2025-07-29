import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  SafeAreaView
} from "react-native";
import NetInfo from '@react-native-community/netinfo';
import api from "../../services/api_zummo";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import Pusher from "pusher-js/react-native";

const noConnection = require("../../images/no-connection.png");

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

export default class Main extends Component {
  static navigationOptions = {
    title: "Manuais"
    //header: null,
  };

  state = {
    manualInfo: {},
    manuais: [],
    page: 1,
    loader: false,
    listener: [],
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

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", data => {
      this.setState({
        manuais: data.manuais
      });
    });

    this.loadNoticias();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
  }

  loadNoticias = async (page = 1) => {
    const response = await api.get(`manuais.php?page=${page}`);
    const { manuais, ...manualInfo } = response.data;

    this.setState({
      manuais: [...this.state.manuais, ...manuais],
      manualInfo,
      loader: false,
      page
    });
  };

  loadMore = () => {
    const { page, manualInfo } = this.state;
    if (page === manualInfo.page) return;
    const pageNumber = page + 1;
    this.loadNoticias(pageNumber);
  };

  _handleConnectivityChange = isConnected => {
    if (isConnected == true) {
      this.setState({ connectionStatus: "Online" });
      this.loadNoticias();
    } else {
      this.setState({ connectionStatus: "Offline" });
    }
  };

  openFile = async file => {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/${file.file_name}`;

      await RNFS.downloadFile({
        fromUrl: file.arquivo,
        toFile: filePath
      });

      await FileViewer.open(filePath);
    } catch (err) {
      console.log(err);
    }
  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.titulo}</Text>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          //this.props.navigation.push("Manual", { id: item.id, title: item.titulo, file: item.arquivo });
          this.openFile(item);
        }}
      >
        <Text style={styles.productButtonText}>Ver Manual</Text>
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
              data={this.state.manuais}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.1}
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
          Aguardando a conexão para exibir os manuais.
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
  },

  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF"
  }
});
