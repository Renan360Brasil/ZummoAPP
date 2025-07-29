import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from "react-native";

const window = Dimensions.get("window");

const logo = require("../../images/logo.png");

const btnZ01 = require("../../images/z01.png");
const btnZ06 = require("../../images/z06.png");
const btnZ14 = require("../../images/z14.png");
const btnZ40 = require("../../images/z40.png");

export default class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false
    };
  }

  static navigationOptions = {
    title: "Espremedores"
    //header: null,
  };

  render() {
    if (this.state.loader) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ff6b00"
          }}
        >
          <ActivityIndicator color="#FFFFFF" size="large" />
        </View>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View
            style={{
              flex: 1,
              padding: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={logo}
              style={{ width: 150, height: 30, marginTop: 20 }}
            />
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity style={styles.btnMenu}>
              <Image
                source={{
                  uri: "http://www.zummo.com.br/_app/uploads/z01-nature.png"
                }}
                style={styles.imgBtn}
              />
              <Text
                style={{ fontSize: 32, color: "#ff6a00", fontWeight: "bold" }}
              >
                Z01
              </Text>
              <Text style={{ fontSize: 14, color: "#ff6a00" }}>Saiba mais</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnMenu}>
              <Image
                source={{
                  uri: "http://www.zummo.com.br/_app/uploads/z06-inox.png"
                }}
                style={styles.imgBtn}
              />
              <Text
                style={{ fontSize: 32, color: "#ff6a00", fontWeight: "bold" }}
              >
                Z06
              </Text>
              <Text style={{ fontSize: 14, color: "#ff6a00" }}>Saiba mais</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity style={styles.btnMenu}>
              <Image
                source={{
                  uri:
                    "http://www.zummo.com.br/_app/uploads/Z14X-self-service.png"
                }}
                style={styles.imgBtn}
              />
              <Text
                style={{ fontSize: 32, color: "#ff6a00", fontWeight: "bold" }}
              >
                Z14
              </Text>
              <Text style={{ fontSize: 14, color: "#ff6a00" }}>Saiba mais</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnMenu}>
              <Image
                source={{
                  uri: "http://www.zummo.com.br/_app/uploads/z40-nature.png"
                }}
                style={styles.imgBtn}
              />
              <Text
                style={{ fontSize: 32, color: "#ff6a00", fontWeight: "bold" }}
              >
                Z40
              </Text>
              <Text style={{ fontSize: 14, color: "#ff6a00" }}>Saiba mais</Text>
            </TouchableOpacity>
          </View>
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

  viewButtons: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20
  },

  btnMenu: {
    flex: 1,
    margin: 5,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },

  imgBtn: {
    width: 150,
    height: 142,
    resizeMode: "contain"
  }
});
