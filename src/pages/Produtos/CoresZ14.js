import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Image, Modal} from 'react-native';

const bege = require('../../images/bege.png');
const graphite = require('../../images/graphite.png');
const brown = require('../../images/brown.png');
const orange = require('../../images/orange.png');
const inox = require('../../images/inox.png');

const z14graphite = require('../../images/z14graphite.png');
const z14brown = require('../../images/z14brown.png');
const z14orange = require('../../images/z14orange.png');
const z14bege = require('../../images/z14bege.png');
const z14inox = require('../../images/z14inox.png');

export default class CoresZ14 extends Component {
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
            {this.state.modalImg == 'z14graphite' ? (
              <>
                <Image
                  source={z14graphite}
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
            {this.state.modalImg == 'z14brown' ? (
              <>
                <Image
                  source={z14brown}
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
            {this.state.modalImg == 'z14orange' ? (
              <>
                <Image
                  source={z14orange}
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
            {this.state.modalImg == 'z14bege' ? (
              <>
                <Image
                  source={z14bege}
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
            {this.state.modalImg == 'z14inox' ? (
              <>
                <Image
                  source={z14inox}
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
          <Text style={{alignSelf: 'center', fontSize: 10, marginVertical: 5}}>
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
              this.setState({modalImg: 'z14graphite'});
            }}>
            <Image
              source={graphite}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z14brown'});
            }}>
            <Image
              source={brown}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z14orange'});
            }}>
            <Image
              source={orange}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z14bege'});
            }}>
            <Image
              source={bege}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z14inox'});
            }}>
            <Image
              source={inox}
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
