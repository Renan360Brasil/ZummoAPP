import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Mensagem from './Mensagem';
import Anexo from './Anexo';

export default createMaterialTopTabNavigator({
    Mensagem: { screen: Mensagem },
    Anexo: { screen: Anexo },
}, {
        tabBarOptions: {
            activeTintColor: '#fff',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#040608',
                borderBottom: 0
            },
            indicatorStyle: {
                backgroundColor: '#fff',
            },
        },
        navigationOptions: {
            header: null  //Need to set header as null.
        },
    });