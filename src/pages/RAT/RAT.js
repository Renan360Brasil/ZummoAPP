import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class RAT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      visible: true
    };
  }

  static navigationOptions = {
    title: "Atendimento Técnico"
    //header: null,
  };

  hideSpinner = () => {
    this.setState({ visible: false });
  };
  showSpinner = () => {
    this.setState({ visible: true });
  };

  // ActivityIndicatorLoadingView() {
  //   //making a view to show to while loading the webpage
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: "#040608"
  //       }}
  //     >
  //       <ActivityIndicator color="#FFFFFF" size="large" />
  //     </View>
  //   );
  // }

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
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{ uri: "https://www.zummo.com.br/_app/rat.php?page=inicio" }}
          style={{ marginTop: 0 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          //renderLoading={this.ActivityIndicatorLoadingView}
          startInLoadingState={true}
          geolocationEnabled={true}
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
        />
        {this.state.visible && (
          <ActivityIndicator
            style={{
              flex: 1,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#040608"
            }}
            size="large"
            color="#fff"
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },

  text: {
    marginBottom: 10
  }
});
