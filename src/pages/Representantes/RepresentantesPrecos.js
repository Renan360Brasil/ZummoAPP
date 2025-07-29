import React, { Component } from "react";
import { StyleSheet, Dimensions, View, SafeAreaView, Text } from "react-native";

import api from "../../services/api_zummo";
import Pdf from "react-native-pdf";

export default class RepresentantesPrecos extends Component {
  state = {
    titulo: "",
    file: "",
    loader: false,
    noticiaInfo: {},
    noticias: [],
    page: 1,
    loader: false,
    connectionStatus: ""
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Tabela de Preços"
  });

  loadNoticias = async (page = 1) => {
    const response = await api.get(`tabela_precos.php?page=${page}`);
    const { noticias, ...noticiaInfo } = response.data;

    this.setState({
      noticias: [...this.state.noticias, ...noticias],
      noticiaInfo,
      loader: false,
      page,
      url: ""
    });

    const infoUrl = this.state.noticias.map(data => {
      this.setState({ url: `https://www.zummo.com.br/_app/uploads/tabela_precos/${data.file_name}` });
    });
  };

  componentWillMount() {
    this.loadNoticias();
  }

  render() {
    const source = {
      uri: this.state.url,
      cache: true
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Pdf source={source} style={styles.pdf} enablePaging={true} cache={true} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333"
  },
  pdf: {
    flex: 1,
    backgroundColor: "#333",
    width: Dimensions.get("window").width
  }
});
