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

const noConnection = require("../../images/no-connection.png");

export default class Main extends Component {
  static navigationOptions = {
    title: "Notícias"
    //header: null,
  };

  state = {
    noticiaInfo: {},
    noticias: [],
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

    this.loadNoticias();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
  }

  loadNoticias = async (page = 1) => {
    const response = await api.get(`noticias.php?page=${page}`);
    const { noticias, ...noticiaInfo } = response.data;

    this.setState({
      noticias: [...this.state.noticias, ...noticias],
      noticiaInfo,
      loader: false,
      page
    });
  };

  loadMore = () => {
    const { page, noticiaInfo } = this.state;
    if (page === noticiaInfo.page) return;
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

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: item.thumb }}
        style={{
          width: "100%",
          height: 150,
          resizeMode: "cover",
          marginBottom: 15
        }}
      />
      <Text style={styles.productTitle}>{item.titulo}</Text>
      <Text style={styles.productDescription}>{item.chamada}</Text>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          this.props.navigation.push("Noticia", {
            id: item.id,
            title: item.titulo
          });
        }}
      >
        <Text style={styles.productButtonText}>Leia Mais</Text>
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
              data={this.state.noticias}
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
          Aguardando a conexão para exibir as notícias.
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
