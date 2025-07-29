import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import NetInfo from '@react-native-community/netinfo';
import Icon from "react-native-vector-icons/FontAwesome5";
import IconF from "react-native-vector-icons/FontAwesome";
import api from "../../services/api_zummo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Pusher from "pusher-js/react-native";
import HTML from "react-native-render-html";

const noConnection = require("../../images/no-connection.png");
const window = Dimensions.get("window");

export default class Mensagem extends Component {
  static navigationOptions = {
    title: "Mensagens"
    //header: null,
  };

  state = {
    msg: "",
    heightInput: 0,
    noticiaInfo: {},
    noticias: [],
    page: 1,
    loader: false,
    connectionStatus: "",
    login: ""
  };

  componentWillMount() {
    this._getLogin();
    this._alteraVisualizou();
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

    var channel = pusher.subscribe("my-chat");
    channel.bind("my-message", data => {
      this.setState({
        noticias: data.noticias
      });
    });

    this.loadNoticias();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );

    pusher.disconnect();
  }

  _alteraVisualizou = async () => {
    const login = await AsyncStorage.getItem("login");
    const response = await api.get(`mensagem_status.php?id=${login}`);
  };

  _getLogin = async () => {
    try {
      const login = await AsyncStorage.getItem("login");
      this.setState({ login });
    } catch (error) {
      // Error retrieving data
    }
  };

  loadNoticias = async (page = 1) => {
    const login = await AsyncStorage.getItem("login");
    const response = await api.get(`mensagem.php?page=${page}&id=${login}`);

    const { noticias, ...noticiaInfo } = response.data;

    this.setState({
      noticias: [...noticias, ...this.state.noticias],
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

  renderItem = ({ item }) => {
    if (item.enviou == "Z") {
      return (
        <View key={item.id}>
          <View style={styles.viewZummo}>
            {/* <Text style={styles.txtZummo} selectable={true}>{item.msg}</Text> */}
            <HTML style={styles.txtZummo} html={item.msg} />
            <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
              <Text style={styles.txtDataHoraZummo}>{item.data}</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View key={item.id}>
        <View style={styles.viewCliente}>
          {/* <Text style={styles.txtCliente} selectable={true}>{item.msg}</Text> */}
          <HTML style={styles.txtCliente} html={item.msg} />
          <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
            <Text style={styles.txtDataHoraCliente}>{item.data}</Text>
            <Icon
              name={item.class}
              color="#fff"
              size={8}
              style={{ marginTop: 7, marginLeft: 10 }}
            />
          </View>
        </View>
      </View>
    );
  };

  loadMore = () => {
    const { page, noticiaInfo } = this.state;
    if (page === noticiaInfo.page) return;
    const pageNumber = page + 1;
    this.loadNoticias(pageNumber);
    this.flatList.scrollToOffset({ animated: true, offset: 0 });
  };

  _onScroll = event => {
    this.loadMore();

    //console.log(event.nativeEvent.contentOffset.y);
    // if(event.nativeEvent.contentOffset.y == 0) {
    //     //this.loadMore();
    // }
  };

  _enviaRecado = () => {
    const { msg, login } = this.state;

    if (!msg) {
      this.setState({ error: "Este campo é obrigatório", loader: false });
      return false;
    }

    //this.setState({ loader: true });

    fetch(`https://www.zummo.com.br/_app/mensagem_envia.php`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        msg: msg,
        email: login
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ loader: false });

        // If server response message same as Data Matched
        if (responseJson === "Enviado") {
          this.setState({ msg: "" });
          this.flatList.scrollToEnd({ animated: true });
        } else {
          //Alert.alert(responseJson);
          Alert.alert(
            "Oops!",
            responseJson,
            [{ text: "Entendi", onPress: () => {} }],
            { cancelable: false }
          );
        }
      })
      .catch(error => {
        this.setState({ loader: false });

        console.error(error);
        Alert.alert("Erro!", error, [{ text: "Entendi", onPress: () => {} }], {
          cancelable: false
        });
      });
  };

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
            <View
              ref={ref => (this.scrollView = ref)}
              style={styles.containerScroll}
            >
              <FlatList
                ref={ref => (this.flatList = ref)}
                onRefresh={this._onScroll}
                refreshing={false}
                scrollEventThrottle={160}
                //inverted={true}
                contentContainerStyle={styles.list}
                data={this.state.noticias}
                keyExtractor={item => item.id}
                renderItem={this.renderItem}
                onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                //onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                //onEndReached={this.loadMore}
                //onEndReachedThreshold={0.05}
              />
            </View>
            <View style={styles.messageBox}>
              <TextInput
                {...this.props}
                multiline={true}
                onChangeText={msg => {
                  this.setState({ msg });
                }}
                onContentSizeChange={event => {
                  this.setState({
                    heightInput: event.nativeEvent.contentSize.height
                  });
                }}
                style={[
                  styles.messageBoxInput,
                  { height: Math.max(50, this.state.heightInput) }
                ]}
                value={this.state.msg}
              />
              <TouchableOpacity
                style={[styles.messageBoxButton, {}]}
                onPress={this._enviaRecado}
              >
                <IconF name="send" color="#fff" size={16} />
              </TouchableOpacity>
            </View>
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },
  containerScroll: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },
  list: {
    paddingTop: 5
  },
  viewZummo: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 20,
    maxWidth: window.width - 100,
    borderWidth: 1,
    borderColor: "#f3f3f3"
  },
  txtZummo: {
    color: "#555"
  },
  txtDataHoraZummo: {
    fontSize: 10,
    color: "#999",
    alignSelf: "flex-end",
    marginTop: 5
  },
  viewCliente: {
    alignSelf: "flex-end",
    backgroundColor: "#25475c",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 20,
    maxWidth: window.width - 100
  },
  txtCliente: {
    color: "#fff"
  },
  txtDataHoraCliente: {
    fontSize: 10,
    color: "#fff",
    alignSelf: "flex-end",
    marginTop: 5
  },
  messageBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    padding: 10
  },
  messageBoxInput: {
    flex: 1,
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  messageBoxButton: {
    backgroundColor: "#ff6b00",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 50,
    height: 50,
    borderRadius: 25
  }
});
