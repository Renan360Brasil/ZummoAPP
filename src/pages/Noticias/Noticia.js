import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Linking,
  Button,
  Dimensions,
  SafeAreaView
} from "react-native";
import api from "../../services/api_zummo";
import HTML from "react-native-render-html";

const calendarIcon = require("../../images/calendar-icon.png");

export default class Noticia extends Component {
  state = {
    noticiaInfo: {},
    noticias: [],
    page: 1,
    id: 1,
    titulo: "",
    loader: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title || "Notícia"
  });

  componentWillMount() {
    this.setState({ loader: true });
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (id = 1) => {
    const { navigation } = this.props;
    const idParam = navigation.getParam("id");

    const response = await api.get(`get_noticia.php?id=${idParam}`);
    const { noticias, ...noticiaInfo } = response.data;
    this.setState({
      noticias: [...this.state.noticias, ...noticias],
      noticiaInfo,
      loader: false,
      titulo: noticias.titulo,
      id
    });
  };

  renderItemProd = ({ item }) => (
    <View
      style={{
        padding: 10,
        margin: 15,
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e1e1e1"
      }}
    >
      <View>
        <Text style={styles.txtTitulo}>{item.titulo}</Text>
      </View>
      <View style={styles.produtoImg}>
        <Image source={{ uri: item.thumb }} style={styles.imgProd} />
      </View>

      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            source={calendarIcon}
            style={{
              marginTop: -3,
              marginRight: 5,
              width: 16,
              resizeMode: "contain"
            }}
          />
          <HTML html={item.data} />
        </View>

        <View
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, .02)"
          }}
        />

        <View>
          <HTML
            html={item.descricao}
            imagesMaxWidth={Dimensions.get("window").width - 30}
          />
        </View>
      </View>
    </View>
  );

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
        <ScrollView style={styles.container}>
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.noticias}
            keyExtractor={item => item.id}
            renderItem={this.renderItemProd}
          />
        </ScrollView>
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
    paddingLeft: 20,
    paddingRight: 20
  },

  produtoTitulo: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  txtTitulo: {
    fontSize: 32,
    color: "#ff6a13",
    // marginTop: 10,
    fontWeight: "900",
    fontFamily: "OpenSans-Regular"
  },

  produtoImg: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 15
  },

  produtoTituloDesc: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  txtTituloDesc: {
    fontSize: 22,
    color: "#333",
    paddingTop: 15,
    fontWeight: "bold",
    fontFamily: "OpenSans-Regular"
  },

  produtoDesc: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  txtDesc: {
    fontSize: 16,
    color: "#555",
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: "100",
    fontFamily: "OpenSans-Regular"
  },

  produtoTituloEspec: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 0,
    paddingLeft: 5,
    paddingTop: 5
  },

  txtTituloEspec: {
    fontSize: 22,
    color: "#ff6a13",
    // paddingTop: 5,
    fontWeight: "bold",
    fontFamily: "OpenSans-Regular",
    marginBottom: 0,
    paddingLeft: 5
  },

  produtoEspec: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 0,
    paddingLeft: 5,
    paddingBottom: 5
  },

  txtEspec: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    fontFamily: "OpenSans-Regular",
    marginBottom: 0,
    paddingLeft: 5
  },

  list: {
    flex: 1
  },

  imgProd: {
    width: "100%",
    height: 250,
    resizeMode: "cover"
  }
});
