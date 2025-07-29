import React, { Component } from "react";
import { StyleSheet, Dimensions, View, SafeAreaView, Text } from "react-native";

import api from "../../services/api_zummo";
import Pdf from "react-native-pdf";

export default class InformacoesPDF extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    informacaoInfo: {},
    informacoes: [],
    page: 1,
    loader: false,
    listener: [],
    connectionStatus: "",
    isBuffering: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title || "Informações e Vídeos"
  });

  componentWillMount() {
  }

  render() {
    const source = {
      uri: `https://www.zummo.com.br/_app/uploads/informacoes_videos/${this.props.navigation.state.params.file}`,
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
