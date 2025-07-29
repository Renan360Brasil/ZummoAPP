import React, {Component} from 'react';

import {View, StyleSheet, ActivityIndicator} from 'react-native';

// import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import {WebView} from 'react-native-webview';

export default class InformacaoVideo extends Component {
  constructor(props) {
    super(props);
    this.onBuffer = this.onBuffer.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title || 'Informações e Vídeos',
  });

  state = {
    informacaoInfo: {},
    informacoes: [],
    page: 1,
    loader: false,
    listener: [],
    connectionStatus: '',
    isBuffering: false,
    uri: '',
  };

  componentWillMount() {
    // Orientation.lockToLandscapeLeft();
    Orientation.unlockAllOrientations();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  onBuffer({isBuffering}) {
    this.setState({isBuffering});
  }

  render() {
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
      // <Video
      //   source={{
      //     uri:
      //       "https://www.zummo.com.br/_app/uploads/informacoes_videos/20190904102913_mundo_empresarial.mp4",
      //       cache: { size: 100, expiresIn: 36000000000 }
      //   }} // Can be a URL or a local file.
      //   ref={ref => {
      //     this.player = ref;
      //   }}
      //   onBuffer={this.onBuffer} // Callback when remote video is buffering
      //   onLoad={this.onLoad} // Callback when remote video is buffering
      //   onError={this.videoError} // Callback when video cannot be loaded
      //   style={styles.backgroundVideo}
      //   controls={true}
      //   resizeMode="contain"
      //   hideShutterView={true}
      // />
      <WebView
        source={{
          uri:
            'https://www.zummo.com.br/_app/view_video.php?video=' +
            this.props.navigation.state.params.file +
            '&folder=informacoes_videos',
        }}
        allowsFullscreenVideo={true}
        cacheEnabled={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
      />
    );
  }
}

var styles = StyleSheet.create({
  backgroundVideo: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
});
