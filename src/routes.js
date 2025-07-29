import React from "react";
import { View, Linking } from "react-native";

import { createAppContainer  } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import {
  fromTop,
  fromBottom,
  fromRight,
  fromLeft,
  zoomIn,
  zoomOut
} from "react-navigation-transitions";

import Icon from "react-native-vector-icons/FontAwesome";

import Login from "./pages/Login";
import Principal from "./pages/Principal";
import PrincipalZ from "./pages/PrincipalZ";
import PrincipalR from "./pages/PrincipalR";
import PrincipalC from "./pages/PrincipalC";
import Noticias from "./pages/Noticias/Noticias";
import Noticia from "./pages/Noticias/Noticia";
import Produtos from "./pages/Produtos/Produtos";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import Cadastro from "./pages/Cadastro";
import Caracteristicas from "./pages/Caracteristicas/Caracteristicas";
import Locacao from "./pages/Locacao/Locacao";
import Produto from "./pages/Produtos/Produto";
import ProdutoNovo from "./pages/Produtos/ProdutoNovo";
import ProdutoVideo from "./pages/Produtos/ProdutoVideo";
import Pecas from "./pages/Pecas/Pecas";
import Manuais from "./pages/Manuais/Manuais";
import Manual from "./pages/Manuais/Manual";
import Propostas from "./pages/Propostas/Propostas";
import PropostasCadastro from "./pages/Propostas/Cadastro";
import PropostasEnviar from "./pages/Propostas/Envia";
import Atendimento from "./pages/Atendimento/Atendimento";
import InformacoesMenu from "./pages/Informacoes/InformacoesMenu";
import Informacoes from "./pages/Informacoes/Informacoes";
import Informacao from "./pages/Informacoes/Informacao";
import InformacaoVideo from "./pages/Informacoes/InformacaoVideo";
import InformacoesPDF from "./pages/Informacoes/InformacoesPDF";
import Assistencia from "./pages/Assistencia/Assistencia";
import Instrucoes from "./pages/Instrucoes/Instrucoes";
import Instrucao from "./pages/Instrucoes/Instrucao";
import InstrucaoVideo from "./pages/Instrucoes/InstrucaoVideo";
import RAT from "./pages/RAT/RAT";
import AnexoEnviar from "./pages/Atendimento/AnexoEnviar";
import Representantes from "./pages/Representantes/Representantes";
import RepresentantesFotos from "./pages/Representantes/RepresentantesFotos";
import RepresentantesVideos from "./pages/Representantes/RepresentantesVideos";
import RepresentantesVideo from "./pages/Representantes/RepresentantesVideo";
import RepresentantesPrecos from "./pages/Representantes/RepresentantesPrecos";
import RepresentantesDescontos from "./pages/Representantes/RepresentantesDescontos";
import RepresentantesPrecos2 from "./pages/Representantes/RepresentantesPrecos2";
import RepresentantesTamanhos from "./pages/Representantes/RepresentantesTamanhos";

const handleCustomTransition = ({ scenes }) => {
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (nextScene.route.routeName === "Produtos") {
    return fromRight();
  }

  if (nextScene.route.routeName === "Caracteristicas") {
    return fromBottom();
  }

  return fromRight();
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

//ff6b00 - Orange

const AppNavigator = createStackNavigator(
  {
    Principal,
    PrincipalZ,
    PrincipalR,
    PrincipalC,
    Login,
    Noticias,
    Noticia,
    Produtos,
    Produto,
    ProdutoNovo,
    ProdutoVideo,
    EsqueceuSenha,
    Cadastro,
    Caracteristicas,
    Locacao,
    Pecas,
    Manuais,
    Manual,
    Propostas,
    PropostasCadastro,
    PropostasEnviar,
    Atendimento: {
      screen: Atendimento,
      defaultNavigationOptions: {
        title: "Atendimento On-line"
        //header: null
      }
    },
    InformacoesMenu,
    Informacoes,
    Informacao,
    InformacaoVideo,
    InformacoesPDF,
    Assistencia,
    Instrucoes,
    Instrucao,
    InstrucaoVideo,
    RAT,
    AnexoEnviar,
    Representantes,
    RepresentantesFotos,
    RepresentantesVideos,
    RepresentantesVideo,
    RepresentantesPrecos,
    RepresentantesDescontos,
    RepresentantesPrecos2,
    RepresentantesTamanhos
  },
  {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#040608",
        elevation: 0,
        shadowOpacity: 0
      },
      headerRightContainerStyle: {
        margin: 10,
      },
      headerTintColor: "#FFF",
      headerRight: () => (
        <View>
          <Icon.Button
            name="envelope"
            backgroundColor="#040608"
            onPress={handleClick}
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              alignSelf: "center"
            }}
            iconStyle={{ marginRight: 0 }}
          />
        </View>
      )
    },
    transitionConfig: nav => handleCustomTransition(nav)
  }
);

export default createAppContainer(AppNavigator);