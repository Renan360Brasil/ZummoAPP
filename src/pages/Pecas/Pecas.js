import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
  Alert,
  SafeAreaView
} from "react-native";
import NetInfo from '@react-native-community/netinfo';
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api_zummo";

const noConnection = require("../../images/no-connection.png");

export default class Pecas extends Component {
  constructor(props) {
    super(props);

    this.arrayholder = [];
  }

  static navigationOptions = {
    title: "Peças"
    //header: null,
  };

  state = {
    pecaInfo: {},
    pecas: [],
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
    // NetInfo.isConnected.addEventListener(
    //   "connectionChange",
    //   this._handleConnectivityChange
    // );

    // NetInfo.isConnected.fetch().done(isConnected => {
    //   if (isConnected == true) {
    //     this.setState({ connectionStatus: "Online" });
    //   } else {
    //     this.setState({ connectionStatus: "Offline" });
    //   }
    // });

    NetInfo.addEventListener(this._handleConnectivityChange);

    this.loadpecas();
  }

  componentWillUnmount() {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        // Alert.alert('online');
        this.setState({connectionStatus: 'Online'});
      } else {
        // Alert.alert('offline');
        this.setState({connectionStatus: 'Offline'});
      }
    });
  }

  loadpecas = async (page = 1) => {
    const response = await api.get(`pecas.php`);
    const { pecas, ...pecaInfo } = response.data;
    this.arrayholder = [...this.arrayholder, ...pecas];

    this.setState({
      pecas: [...this.state.pecas, ...pecas],
      pecaInfo,
      loader: false,
      page
    });
  };

  loadMore = () => {
    const { page, pecaInfo } = this.state;
    if (page === pecaInfo.page) return;
    const pageNumber = page + 1;
    this.loadpecas(pageNumber);
  };

  _handleConnectivityChange = state => {
    if (state.isConnected) {
      // Alert.alert('online');
      this.setState({connectionStatus: 'Online'});
    } else {
      // Alert.alert('offline');
      this.setState({connectionStatus: 'Offline'});
    }
  };

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.descricao.toUpperCase()}   
          ${item.descricao.toUpperCase()} ${item.codigo.toUpperCase()} ${item.grupo.toUpperCase()} ${item.especie.toUpperCase()} ${item.preco.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ pecas: newData });
  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle} selectable={true} key={item.id}>
        {item.descricao}
      </Text>
      <Text style={styles.productDescription} selectable={true} key={item.id}>
        Código: {item.codigo}
      </Text>
      <Text style={styles.productDescription} selectable={true} key={item.id}>
        Espécie: {item.especie}
      </Text>
      <Text style={styles.productDescription} selectable={true} key={item.id}>
        Grupo: {item.grupo}
      </Text>
      <Text
        style={[
          styles.productDescription,
          { color: "#d5ccc2", fontSize: 18, fontWeight: "900" }
        ]}
        selectable={true}
        key={item.id}
      >
        {item.preco}
      </Text>
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
            <TextInput
              selectable={true}
              placeholder="Procure aqui..."
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              style={{
                backgroundColor: "#FFF",
                borderWidth: 1,
                borderColor: "#e1e1e1",
                color: "#555",
                height: 50
              }}
            />

            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.pecas}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              ref="flatListRef"
            />

            <ActionButton
              buttonColor="#d5ccc2"
              buttonText={<Icon name="ios-arrow-up" style={{ fontSize: 20 }} />}
              onPress={() => {
                this.refs.flatListRef.scrollToOffset({
                  x: 0,
                  y: 0,
                  animated: true
                });
              }}
            />
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
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
              color: "#d5ccc2",
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
            Aguardando a conexão para exibir as peças.
          </Text>
        </View>
      </SafeAreaView>
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
