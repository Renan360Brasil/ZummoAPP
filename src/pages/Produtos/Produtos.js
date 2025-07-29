import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import api from '../../services/api_zummo';

const logo = require('../../images/logo.png');
const logoP1 = require('../../images/logo-produtos1.png');
const logoP2 = require('../../images/logo-produtos2.png');
const noConnection = require('../../images/no-connection.png');

export default class Produtos extends Component {
  state = {
    productInfo: {},
    produtos: [],
    page: 1,
    loader: false,
    connectionStatus: '',
  };

  componentWillMount() {
    this.setState({loader: true});
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.setState({connectionStatus: 'Online'});
      }
    });
  }

  componentDidMount() {
    // NetInfo.fetch().then(state => {
    //   if (state.isConnected) {
    //     this.setState({connectionStatus: 'Online'});
    //   }
    // });

    // NetInfo.isConnected.addEventListener(
    //   "connectionChange",
    //   this._handleConnectivityChange
    // );

    // NetInfo.isConnected.fetch().done(isConnected => {
    //   if (isConnected == true) {
    //     this.setState({ connectionStatus: "Online" });
    //   } else {
    //     this.setState({ connectionStatus: "Offline" });
    //   }
    // });

    this.loadProducts();
  }

  componentWillUnmount() {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.setState({connectionStatus: 'Online'});
      }
    });
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`produtos.php`);
    const {produtos, ...productInfo} = response.data;
    this.setState({
      produtos: [...this.state.produtos, ...produtos],
      productInfo,
      loader: false,
      page,
    });
  };

  loadMore = () => {
    const {page, productInfo} = this.state;
    if (page === productInfo.pages) return;
    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  };

  // _handleConnectivityChange = isConnected => {
  //   if (isConnected == true) {
  //     this.setState({ connectionStatus: "Online" });
  //     this.loadProducts();
  //   } else {
  //     this.setState({ connectionStatus: "Offline" });
  //   }
  // };

  renderItem = ({item}) => {
    if (item.categoria == 1) {
      return (
        <View style={styles.viewButtons}>
          <TouchableOpacity
            style={styles.btnMenu}
            onPress={() => {
              this.props.navigation.push('ProdutoNovo', {
                id: item.id,
                title: item.titulo,
              });
            }}>
            <Image source={{uri: item.thumb}} style={styles.imgBtn} />
            <Text
              style={{
                fontSize: 20,
                color: '#040608',
                fontWeight: 'bold',
                fontFamily: 'OpenSans-Regular',
                textAlign: 'center',
              }}>
              {item.titulo}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderItemSelf = ({item}) => {
    if (item.categoria == 2) {
      return (
        <View style={styles.viewButtons}>
          <TouchableOpacity
            style={styles.btnMenu}
            onPress={() => {
              this.props.navigation.push('ProdutoNovo', {
                id: item.id,
                title: item.titulo,
              });
            }}>
            <Image source={{uri: item.thumb}} style={styles.imgBtn} />
            <Text
              style={{
                fontSize: 20,
                color: '#040608',
                fontWeight: 'bold',
                fontFamily: 'OpenSans-Regular',
                textAlign: 'center',
              }}>
              {item.titulo}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  static navigationOptions = {
    title: 'Zummo Nature',
    //header: null,
  };

  render() {
    if (this.state.connectionStatus == 'Online') {
      if (this.state.loader) {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#040608',
            }}>
            <ActivityIndicator color="#FFFFFF" size="large" />
          </View>
        );
      }
      return (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={styles.container}>
            <View
              style={{
                flex: 1,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={logoP1}
                style={{width: '75%', height: 90, marginTop: 20}}
                resizeMode={'contain'}
              />
            </View>
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.produtos}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              numColumns={2}
              //onEndReached={this.loadMore}
              //onEndReachedThreshold={0.1}
            />
            <View
              style={{
                flex: 1,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={logoP2}
                style={{width: '75%', height: 90, marginTop: 20}}
                resizeMode={'contain'}
              />
            </View>
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.produtos}
              keyExtractor={item => item.id}
              renderItem={this.renderItemSelf}
              numColumns={2}
              //onEndReached={this.loadMore}
              //onEndReachedThreshold={0.1}
            />
          </ScrollView>
        </SafeAreaView>
      );
    }

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={noConnection}
          style={{
            width: 200,
            height: 137,
            resizeMode: 'contain',
            marginBottom: 15,
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#040608',
            textAlign: 'center',
          }}>
          Sem conexão com a internet
        </Text>
        <Text
          style={{
            fontWeight: '100',
            fontSize: 14,
            color: '#555',
            textAlign: 'center',
          }}>
          Verifique sua conexão com Wi-Fi ou Internet Móvel.
        </Text>
        <Text
          style={{
            fontWeight: '100',
            fontSize: 14,
            color: '#555',
            textAlign: 'center',
          }}>
          Aguardando a conexão para exibir os produtos.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },

  list: {
    //padding: 20,
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  viewButtons: {
    //paddingLeft: 20,
    //paddingRight: 20,
    marginBottom: 15,
    flex: 1,
    height: 272,
  },

  btnMenu: {
    flex: 1,
    margin: 5,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    //height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgBtn: {
    width: 150,
    height: 214,
    resizeMode: 'contain',
  },
});
