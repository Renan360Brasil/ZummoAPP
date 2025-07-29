import React, { Component } from "react";
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking
} from "react-native";

import Swiper from "react-native-swiper";

const slide1 = require("../../images/slides/1.jpg");
const slide2 = require("../../images/slides/2.jpg");
const slide3 = require("../../images/slides/3.jpg");
const slide4 = require("../../images/slides/4.jpg");
const slide5 = require("../../images/slides/5.jpg");
const slide6 = require("../../images/slides/6.jpg");
const slide7 = require("../../images/slides/7.jpg");
const slide8 = require("../../images/slides/8.jpg");
const slide9 = require("../../images/slides/9.jpg");
const slide10 = require("../../images/slides/10.jpg");
const slide11 = require("../../images/slides/11.jpg");
const slide12 = require("../../images/slides/12.jpg");
const slide13 = require("../../images/slides/13.jpg");
const slide14 = require("../../images/slides/14.jpg");
const slide15 = require("../../images/slides/15.jpg");
const slide16 = require("../../images/slides/16.jpg");
const slide17 = require("../../images/slides/17.jpg");
const slide18 = require("../../images/slides/18.jpg");
const slide19 = require("../../images/slides/19.jpg");
const slide20 = require("../../images/slides/20.jpg");
const slide21 = require("../../images/slides/21.jpg");
const slide22 = require("../../images/slides/22.jpg");

console.disableYellowBox = true;

export default class Caracteristicas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false
    };
  }

  static navigationOptions = {
    title: "Características Exclusivas",
    header: null
  };

  handleClick = () => {
    Linking.canOpenURL("https://www.zummo.com.br/contato").then(supported => {
      if (supported) {
        Linking.openURL("https://www.zummo.com.br/contato");
      } else {
        // console.log(
        //   "Não foi possível abrir a URL: " + "https://www.zummo.com.br/contato"
        // );
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
                source={slide1}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide2}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide3}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide4}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide5}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide6}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide7}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide8}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide9}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide10}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide11}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide12}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide13}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide14}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide15}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide16}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide17}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide18}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide19}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide20}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>

            <View style={styles.slide1}>
              <Image
                source={slide21}
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
                  source={slide22}
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
    marginTop: 0
  }
});

// const styles = StyleSheet.create({
//   wrapper: {},

//   slide1: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f6f6f6"
//   }
// });
