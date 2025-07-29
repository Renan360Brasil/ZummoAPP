import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import NetInfo from '@react-native-community/netinfo';
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api_zummo";

const noConnection = require("../../images/no-connection.png");

export default class Propostas extends Component {
  constructor(props) {
    super(props);

    this.arrayholder = [];
  }

  static navigationOptions = {
    title: "Propostas"
    //header: null,
  };

  state = {
    propostaInfo: {},
    propostas: [],
    page: 1,
    loader: false,
    connectionStatus: ""
  };

  _getLogado = async () => {
    try {
      const value = await AsyncStorage.getItem("logado");
      if (value === null || value === "N") {
        // We have data!!
        Alert.alert(
          "Zummo - Acesso Negado",
          "Você precisa estar logado para acessar esta area.",
          [{ text: "Entendi", onPress: () => {} }],
          { cancelable: false }
        );
        this.props.navigation.replace("Login");
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentWillMount() {
    this._getLogado();
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

    this.loadpropostas();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
  }

  loadpropostas = async (page = 1) => {
    const response = await api.get(`propostas.php`);
    const { propostas, ...propostaInfo } = response.data;
    this.arrayholder = [...this.arrayholder, ...propostas];

    this.setState({
      propostas: [...this.state.propostas, ...propostas],
      propostaInfo,
      loader: false,
      page
    });
  };

  loadMore = () => {
    const { page, propostaInfo } = this.state;
    if (page === propostaInfo.page) return;
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
    this.setState({ propostas: newData });
  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle} selectable={true} key={item.id}>
        {item.cliente}
      </Text>
      <Text style={styles.productDescription} selectable={true} key={item.id}>
        Ref.: {item.id}
      </Text>
      <Text style={styles.productDescription} selectable={true} key={item.id}>
        Representante: {item.representante}
      </Text>
      <Text style={styles.productDescription} selectable={true} key={item.id}>
        Data: {item.data}
      </Text>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.push("PropostasEnviar", {
            id: item.id_proposta
          });
        }}
      >
        <Text
          style={[
            styles.productDescription,
            { fontWeight: "900", color: "#ff6a13" }
          ]}
          selectable={true}
          key={item.id}
        >
          Enviar proposta
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
              backgroundColor: "#ff6a13"
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
              data={this.state.propostas}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              ref="flatListRef"
            />

            <ActionButton
              buttonColor="rgba(255,106,19,1)"
              buttonText={<Icon name="ios-add" style={{ fontSize: 32 }} />}
              onPress={() => {
                this.props.navigation.push("PropostasCadastro");
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
            color: "#ff6a13",
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
          Aguardando a conexão para exibir as propostas.
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
