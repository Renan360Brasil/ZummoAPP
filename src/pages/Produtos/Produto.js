import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  SafeAreaView
} from "react-native";
import api from "../../services/api_zummo";

const bege = require("../../images/bege.png");
const graphite = require("../../images/graphite.png");
const brown = require("../../images/brown.png");
const orange = require("../../images/orange.png");

export default class Produto extends Component {
  state = {
    productInfo: {},
    especInfo: {},
    produtos: [],
    especs: [],
    page: 1,
    id: 1,
    idEspec: 1,
    titulo: "",
    loader: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title || "Produto"
  });

  componentWillMount() {
    this.setState({ loader: true });
  }

  componentDidMount() {
    this.loadProducts();
    this.loadEspecs();
  }

  loadProducts = async (id = 1) => {
    const { navigation } = this.props;
    const idParam = navigation.getParam("id");

    const response = await api.get(`get_produto.php?id=${idParam}`);
    const { produtos, ...productInfo } = response.data;
    this.setState({
      produtos: [...this.state.produtos, ...produtos],
      productInfo,
      loader: false,
      titulo: produtos.titulo,
      id
    });
  };

  loadEspecs = async (idEspec = 1) => {
    const { navigation } = this.props;
    const idParam = navigation.getParam("id");

    const response = await api.get(`get_especificacoes.php?id=${idParam}`);
    const { especs, ...especInfo } = response.data;
    this.setState({
      especs: [...this.state.especs, ...especs],
      especInfo,
      loader: false,
      idEspec
    });
  };

  renderItemProd = ({ item }) => {
    if (item.cores == "S") {
      return (
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
          <View style={styles.produtoTitulo}>
            <Text style={styles.txtTitulo}>{item.titulo}</Text>
          </View>

          <View style={styles.produtoImg}>
            <Image source={{ uri: item.thumb }} style={styles.imgProd} />
          </View>

          <View style={styles.produtoImg}>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                margin: 5,
                color: "#000"
              }}
            >
              Disponível nas cores
            </Text>
          </View>

          <View style={styles.produtoColors}>
            <Image source={bege} style={{ width: 32, height: 32, margin: 2 }} />
            <Image
              source={graphite}
              style={{ width: 32, height: 32, margin: 2 }}
            />
            <Image
              source={brown}
              style={{ width: 32, height: 32, margin: 2 }}
            />
            <Image
              source={orange}
              style={{ width: 32, height: 32, margin: 2 }}
            />
          </View>

          <View style={styles.produtoTituloDesc}>
            <Text style={styles.txtTituloDesc}>Descrição</Text>
          </View>

          <View style={styles.produtoDesc}>
            <Text style={styles.txtDesc}>{item.descricao}</Text>
          </View>

          <View style={[styles.produtoDesc, { marginTop: 5, marginBottom: 5 }]}>
            <Button
              title="Assista ao vídeo demonstrativo"
              color="#040608"
              onPress={() => {
                this.props.navigation.push("ProdutoVideo", {
                  id: item.id,
                  title: item.titulo,
                  uri: item.video
                });
              }}
            />
          </View>

          <View style={styles.produtoTituloDesc}>
            <Text style={styles.txtTituloDesc}>Especificações Técnicas</Text>
          </View>
        </View>
      );
    }

    return (
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
        <View style={styles.produtoTitulo}>
          <Text style={styles.txtTitulo}>{item.titulo}</Text>
        </View>

        <View style={styles.produtoImg}>
          <Image source={{ uri: item.thumb }} style={styles.imgProd} />
        </View>

        <View style={styles.produtoTituloDesc}>
          <Text style={styles.txtTituloDesc}>Descrição</Text>
        </View>

        <View style={styles.produtoDesc}>
          <Text style={styles.txtDesc}>{item.descricao}</Text>
        </View>

        <View style={[styles.produtoDesc, { marginTop: 5, marginBottom: 5 }]}>
          <Button
            title="Assista ao vídeo demonstrativo"
            color="#040608"
            onPress={() => {
              this.props.navigation.push("ProdutoVideo", {
                id: item.id,
                title: item.titulo,
                uri: item.video
              });
            }}
          />
        </View>

        <View style={styles.produtoTituloDesc}>
          <Text style={styles.txtTituloDesc}>Especificações Técnicas</Text>
        </View>
      </View>
    );
  };

  renderItemEspec = ({ item }) => (
    <View
      style={{
        padding: 10,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e1e1e1"
      }}
    >
      <View
        style={[
          styles.produtoTituloEspec,
          { backgroundColor: item.background }
        ]}
      >
        <Text style={[styles.txtTituloEspec, { color: item.title }]}>
          {item.caracteristica}
        </Text>
      </View>

      <View style={[styles.produtoEspec, { backgroundColor: item.background }]}>
        <Text style={[styles.txtEspec, { color: item.text }]}>
          {item.valor}
        </Text>
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
            backgroundColor: "#ff6b13"
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
            data={this.state.produtos}
            keyExtractor={item => item.id}
            renderItem={this.renderItemProd}
          />

          <FlatList
            contentContainerStyle={styles.listEspec}
            data={this.state.especs}
            keyExtractor={item => item.idEspec}
            renderItem={this.renderItemEspec}
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
    justifyContent: "center",
    alignItems: "center"
  },

  txtTitulo: {
    fontSize: 42,
    color: "#040608",
    marginBottom: 10,
    fontWeight: "bold",
    fontFamily: "OpenSans-Regular"
  },

  produtoImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  produtoColors: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
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
    justifyContent: "center",
    alignItems: "center"
  },

  txtDesc: {
    fontSize: 16,
    color: "#000",
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
    color: "#040608",
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
    width: 300,
    height: 385,
    resizeMode: "contain"
  }
});
