import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Image, Modal} from 'react-native';

const bege = require('../../images/bege.png');
const graphite = require('../../images/graphite.png');
const brown = require('../../images/brown.png');
const orange = require('../../images/orange.png');
const inox = require('../../images/inox.png');

const z06graphite = require('../../images/z06graphite.png');
const z06brown = require('../../images/z06brown.png');
const z06orange = require('../../images/z06orange.png');
const z06bege = require('../../images/z06bege.png');
const z06inox = require('../../images/z06inox.png');

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
            {this.state.modalImg == 'z06graphite' ? (
              <>
                <Image
                  source={z06graphite}
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
            {this.state.modalImg == 'z06brown' ? (
              <>
                <Image
                  source={z06brown}
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
            {this.state.modalImg == 'z06orange' ? (
              <>
                <Image
                  source={z06orange}
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
            {this.state.modalImg == 'z06bege' ? (
              <>
                <Image
                  source={z06bege}
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
            {this.state.modalImg == 'z06inox' ? (
              <>
                <Image
                  source={z06inox}
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
              this.setState({modalImg: 'z06graphite'});
            }}>
            <Image
              source={graphite}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z06brown'});
            }}>
            <Image
              source={brown}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z06orange'});
            }}>
            <Image
              source={orange}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z06bege'});
            }}>
            <Image
              source={bege}
              style={{width: 32, height: 32, marginHorizontal: 2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({modalImg: 'z06inox'});
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
