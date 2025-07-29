import React, { Component } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from "react-native";
import Swiper from "react-native-swiper";

const window = Dimensions.get("window");
const locacao1 = require("../../images/slides/locacao1.png");
const locacao2 = require("../../images/slides/locacao2.png");
const locacao3 = require("../../images/slides/locacao3.png");
const locacao4 = require("../../images/slides/locacao4.png");
const locacao5 = require("../../images/slides/locacao5.png");
const locacao6 = require("../../images/slides/locacao6.png");
const locacao7 = require("../../images/slides/locacao7.png");
const locacao8 = require("../../images/slides/locacao8.png");
const locacao9 = require("../../images/slides/locacao9.png");
const locacao10 = require("../../images/slides/locacao10.png");
const locacao11 = require("../../images/slides/locacao11.png");
const locacao12 = require("../../images/slides/locacao12.png");
const locacao13 = require("../../images/slides/locacao13.png");

export default class Locacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false
    };
  }

  static navigationOptions = {
    title: "Locação / Venda",
    header: null
  };

  handleClick = () => {
    Linking.canOpenURL("https://www.zummo.com.br/contato").then(supported => {
      if (supported) {
        Linking.openURL("https://www.zummo.com.br/contato");
      } else {
        console.log(
          "Não foi possível abrir a URL: " + "https://www.zummo.com.br/contato"
        );
      }
    });
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar hidden={false} />
        <ScrollView
          automaticallyAdjustContentInsets={true}
          removeClippedSubviews={false}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            showsPagination={true}
            activeDotColor="#F6F6F6"
            loop={false}
          >
            <View style={styles.slide1}>
              <Image
                source={locacao1}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={locacao2}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={locacao3}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={locacao4}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={locacao5}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={locacao6}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={locacao7}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide8}>
              <Image
                source={locacao8}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={locacao9}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={locacao10}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={locacao11}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <Image
                source={locacao12}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={styles.slide1}>
              <TouchableOpacity onPress={this.handleClick}>
                <Image
                  source={locacao13}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",

                  }}
                />
              </TouchableOpacity>
            </View>
          </Swiper>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},

  slide1: {
    flexGrow: 1,
    margin: 0
  }
});
