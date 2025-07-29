import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { WebView } from 'react-native-webview';
import Orientation from "react-native-orientation";

export default class ProdutoVideo extends Component {
  state = {
    titulo: "",
    uri: "",
    loader: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title || "Vídeo",
    headerStyle: {
      backgroundColor: "#000"
    },
    headerTintColor: "#FFF"
  });

  componentWillMount() {
    this.setState({ loader: true });
    Orientation.lockToLandscapeLeft();
  }

  componentDidMount() {
    this.setState({ loader: false });
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

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
        <WebView source={{ uri: this.props.navigation.state.params.uri }} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  }
});
