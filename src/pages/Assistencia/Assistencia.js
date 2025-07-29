import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const window = Dimensions.get('window');
const logo = require('../../images/logo-branco.png');

const imgAssistencia = require('../../images/assistencia-info.png');
const imgAssist = require('../../images/imgAssist.png');

export default class Locacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }

  static navigationOptions = {
    title: 'Assistência Técnica',
    //header: null,
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* <ScrollView style={styles.container}>
          <View style={{ flex: 1, padding: 20 }}>
            <Image
              source={logo}
              style={{ width: 150, height: 30, marginTop: 20 }}
            />
          </View>

          <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.text}>
              Para saber mais sobre a Assistência Técnica ZUMMO, entre em
              contato conosco:
            </Text>
            <Text style={styles.text}>Telefone: (11) 4613-1500</Text>
            <Text style={styles.text}>Telefone: (11) 4612-8926</Text>
            <Text style={styles.text}>Telefone: (11) 4612-8857</Text>
            <Text style={styles.text}>E-mail: zummo@zummo.com.br</Text>
          </View>
        </ScrollView> */}

        <View
          style={{
            flex: 1,
            backgroundColor: '#040608',
            justifyContent: 'center',
          }}>
          <Image
            source={logo}
            style={{
              width: 250,
              height: 50,
              marginTop: 20,
              marginBottom: 30,
              alignSelf: 'center',
            }}
          />

          <Text style={{fontSize: 20, color: '#fff', paddingLeft: 20}}>
            Para saber mais sobre a Assistência Técnica ou compra de peças
            <Text style={{fontWeight: 'bold'}}> ZUMMO </Text>, entre em contato
            conosco:
            {'\n'}
          </Text>
          <Text style={{fontSize: 20, color: '#fff', paddingLeft: 20}}>
            Telefone: <Text style={{fontWeight: 'bold'}}> (11) 4613-1500 </Text>
            {'\n'}
            Telefone: <Text style={{fontWeight: 'bold'}}> (11) 4612-8926 </Text>
          </Text>

          <Text style={{fontSize: 20, color: '#fff', paddingLeft: 20}}>
            {'\n'}
            Email:{' '}
            <Text style={{fontWeight: 'bold'}}>oficina@zummo.com.br</Text>
            {'\n'}
            Email:{' '}
            <Text style={{fontWeight: 'bold'}}>tecnico@zummo.com.br</Text>
            {'\n'}
            Email:{' '}
            <Text style={{fontWeight: 'bold'}}>estoque@zummo.com.br</Text>
          </Text>

          <Text style={{fontSize: 20, color: '#fff', paddingLeft: 20}}>
            {'\n'}
            Demais informações:
            {'\n'}
            <Text style={{fontWeight: 'bold'}}>zummo@zummo.com.br</Text>
            {'\n'}
          </Text>

          {/* <Image
            source={imgAssist}
            style={{flex: 1, width: 90, height: null, alignSelf: 'flex-end'}}
          /> */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040608',
  },

  text: {
    marginBottom: 10,
  },
});
