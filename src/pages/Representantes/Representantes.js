import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const btnGaleria = require("../../images/btn-galeria.png");
const btnVideos = require("../../images/btn-videos.png");
const btnPrecos = require("../../images/btn-precos.png");
const btnPrecos2 = require("../../images/btn-precos2.png");
const btnDescontos = require("../../images/btn-desconto.png");
const btnTamanhos = require("../../images/btn-tamanhos.png");

export default class Representantes extends Component {
  static navigationOptions = {
    title: "Representantes"
    //header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loader: false
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("RepresentantesFotos");
              }}
            >
              <Image source={btnGaleria} style={styles.imgBtn} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("RepresentantesVideos");
              }}
            >
              <Image source={btnVideos} style={styles.imgBtn} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("RepresentantesPrecos");
              }}
            >
              <Image source={btnPrecos} style={styles.imgBtn} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("RepresentantesDescontos");
              }}
            >
              <Image source={btnDescontos} style={styles.imgBtn} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("RepresentantesPrecos2");
              }}
            >
              <Image source={btnPrecos2} style={styles.imgBtn} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => {
                this.props.navigation.push("RepresentantesTamanhos");
              }}
            >
              <Image source={btnTamanhos} style={styles.imgBtn} />
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
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },

  imgBtn: {
    width: 127,
    height: 96
  }
});
