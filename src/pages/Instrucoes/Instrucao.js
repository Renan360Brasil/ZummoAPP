import React, { Component } from "react";
import { StyleSheet, Dimensions, View, SafeAreaView } from "react-native";

import Pdf from "react-native-pdf";

export default class Instrucao extends Component {
  state = {
    titulo: "",
    file: "",
    loader: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title || "Manual"
  });

  render() {
    const source = {
      uri: this.props.navigation.state.params.file,
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
