import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Share,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import api from '../../services/api_zummo';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const noConnection = require('../../images/no-connection.png');

export default class Informacoes extends Component {
  static navigationOptions = {
    title: 'Informações e Vídeos',
    //header: null,
  };

  state = {
    informacaoInfo: {},
    informacoes: [],
    page: 1,
    loader: false,
    listener: [],
    connectionStatus: '',
  };

  componentWillMount() {
    this.setState({loader: true});
  }

  componentDidMount() {
    // NetInfo.isConnected.addEventListener(
    //   'connectionChange',
    //   this._handleConnectivityChange,
    // );

    NetInfo.addEventListener(this._handleConnectivityChange);
    

    // NetInfo.isConnected.fetch().done(isConnected => {
    //   if (isConnected == true) {
    //     this.setState({connectionStatus: 'Online'});
    //   } else {
    //     this.setState({connectionStatus: 'Offline'});
    //   }
    // });

    this.loadNoticias();
  }

  componentWillUnmount() {
    // NetInfo.isConnected.removeEventListener(
    //   'connectionChange',
    //   this._handleConnectivityChange,
    // );

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        // Alert.alert('online');
        this.setState({connectionStatus: 'Online'});
      } else {
        // Alert.alert('offline');
        this.setState({connectionStatus: 'Offline'});
      }
    });
  }

  loadNoticias = async (page = 1) => {
    const response = await api.get(
      `informacoes_videos.php?page=${page}&categoria=${this.props.navigation.state.params.categoria}`,
    );
    const {informacoes, ...informacaoInfo} = response.data;

    this.setState({
      informacoes: [...this.state.informacoes, ...informacoes],
      informacaoInfo,
      loader: false,
      page,
    });
  };

  loadMore = () => {
    const {page, informacaoInfo} = this.state;
    if (page === informacaoInfo.page) return;
    const pageNumber = page + 1;
    this.loadNoticias(pageNumber);
  };

  _handleConnectivityChange = state => {
    if (state.isConnected) {
      // Alert.alert('online');
      this.setState({connectionStatus: 'Online'});
    } else {
      // Alert.alert('offline');
      this.setState({connectionStatus: 'Offline'});
    }
  };

  // onShare = async (title, url, short) => {
  //   try {
  //     const result = await Share.share({
  //       message: 'Zummo | ' + title + ' \n ' + `https://www.zummo.com.br/_app/view_video.php?video=${url}&folder=informacoes_videos`,
  //       title: 'Zummo | ' + title,
  //       url: `https://www.zummo.com.br/_app/view_video.php?video=${url}&folder=informacoes_videos`
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  getDataUsingGet = (title, url) => {
    //GET request to convert our long URL to short one
    fetch(
      `https://tinyurl.com/api-create.php?url=https://www.zummo.com.br/_app/view_video.php?video=${url}&folder=informacoes_videos`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.text())
      //Response to text
      .then((responseJson) => {
        //Printing the Response String
        console.log(responseJson);
        //responseJson is our short URL
        //Sharing the short URL with our message
        Share.share({
          message:
            'Zummo | ' + title + '\n' +
            responseJson,
        })
          .then((result) => console.log(result))
          .catch((errorMsg) => console.log(errorMsg));
      })
      //If response is not in text then in error
      .catch((error) => {
        //Error
        alert('Error -> ' + JSON.stringify(error));
        console.error(error);
      });
  };

  openFile = async file => {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/${file.file_name}`;

      await RNFS.downloadFile({
        fromUrl: file.arquivo,
        toFile: filePath,
      });

      await FileViewer.open(filePath);
    } catch (err) {
      console.log(err);
    }
  };

  renderItem = ({item}) => {
    if (item.tipo == 'P') {
      return (
        <View style={styles.productContainer}>
          <TouchableOpacity
            style={styles.productButton}
            onPress={() => {
              this.props.navigation.push('InformacoesPDF', {
                id: item.id,
                title: item.titulo,
                file: item.file_name,
              });
            }}>
            {/* <Text style={styles.productButtonText}>Assistir Vídeo</Text> */}
            <Image
              style={{width: 250, height: 174}}
              source={{
                uri:
                  'https://www.zummo.com.br/_app/uploads/informacoes_videos/' +
                  item.thumb,
              }}
              resizeMode={'contain'}
            />
            <Text style={styles.productTitle}>{item.titulo}</Text>
            <Text style={styles.productDescription}>{item.descricao}</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={
            {
              backgroundColor:'#d5ccc2',
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10
            }
          }
          onPress={ () => this.getDataUsingGet(item.titulo, item.video, item.short)}
          >
            <Text style={{color: "#fff"}}>Compartilhar</Text>
          </TouchableOpacity>          
        </View>
      );
    }

    return (
      <View style={styles.productContainer}>
        <TouchableOpacity
          style={styles.productButton}
          onPress={() => {
            this.props.navigation.push('InformacaoVideo', {
              id: item.id,
              title: item.titulo,
              file: item.file_name,
            });
          }}>
          {/* <Text style={styles.productButtonText}>Assistir Vídeo</Text> */}
          <Image
            style={{width: 250, height: 174}}
            source={{
              uri:
                'https://www.zummo.com.br/_app/uploads/informacoes_videos/' +
                item.thumb,
            }}
            resizeMode={'contain'}
          />
          <Text style={styles.productTitle}>{item.titulo}</Text>
          <Text style={styles.productDescription}>{item.descricao}</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={
          {
            backgroundColor:'#d5ccc2',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10
          }
        }
        onPress={ () => this.getDataUsingGet(item.titulo, item.video, item.short)}
        >
          <Text style={{color: "#fff"}}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
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
          <View style={styles.container}>
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.informacoes}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.1}
            />
          </View>
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
          Aguardando a conexão para exibir os manuais.
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
    padding: 20,
  },

  productContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 5,
    marginBottom: 20,
    padding: 20,
  },

  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },

  productButton: {
    height: 209,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#ff6a00',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  productButtonText: {
    fontSize: 16,
    color: '#ff6a00',
    fontWeight: 'bold',
  },

  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});
