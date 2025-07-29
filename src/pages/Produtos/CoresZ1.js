import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Image, Modal} from 'react-native';

const bege = require('../../images/bege.png');
const graphite = require('../../images/graphite.png');
const brown = require('../../images/brown.png');
const orange = require('../../images/orange.png');

const z1graphite = require('../../images/z1graphite.png');
const z1brown = require('../../images/z1brown.png');
const z1orange = require('../../images/z1orange.png');
const z1bege = require('../../images/z1bege.png');

export default class CoresZ1 extends Component {
  state = {
    modalVisible: false,
    modalImg: '',
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <>
        <Modal
          style={{backgroundColor: '#000', flex: 1}}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View style={{flex: 1}}>
            {this.state.modalImg == 'z1graphite' ? (
              <>
                <Image
                  source={z1graphite}
                  style={{
                    flex: 1,
                    width: 540,
                    height: 756,
                    alignSelf: 'center',
                  }}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#333',
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center',
                      marginBottom: 5,
                    }}>
                    X
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
            {this.state.modalImg == 'z1brown' ? (
              <>
                <Image
                  source={z1brown}
                  style={{
                    flex: 1,
                    width: 540,
                    height: 756,
                    alignSelf: 'center',
                  }}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#333',
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center',
                      marginBottom: 5,
                    }}>
                    X
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
            {this.state.modalImg == 'z1orange' ? (
              <>
                <Image
                  source={z1orange}
                  style={{
                    flex: 1,
                    width: 540,
                    height: 756,
                    alignSelf: 'center',
                  }}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#333',
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center',
                      marginBottom: 5,
                    }}>
                    X
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
            {this.state.modalImg == 'z1bege' ? (
              <>
                <Image
                  source={z1bege}
                  style={{
                    flex: 1,
                    width: 540,
                    height: 756,
                    alignSelf: 'center',
                  }}
                  resizeMode={'contain'}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#333',
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center',
                      marginBottom: 5,
                    }}>
                    X
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </Modal>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{alignSelf: 'center', fontSize: 9, marginVertical: 5}}>
            *Clique na cor para visualizar a foto
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z1graphite'});
            }}>
            <Image
              source={graphite}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z1brown'});
            }}>
            <Image
              source={brown}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z1orange'});
            }}>
            <Image
              source={orange}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z1bege'});
            }}>
            <Image
              source={bege}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
        </View>
        <Text style={{alignSelf: 'center', fontSize: 12, marginTop: 5}}>
          Disponível em 4 Cores
        </Text>
      </>
    );
  }
}
