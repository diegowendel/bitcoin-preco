import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import Moment from 'moment';

import Button from './components/Button';
import Header from './components/Header';
import Loader from './components/Loader';

class App extends Component {

    state = {
        data: {},
        loading: false
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.getBitcoinValuesFromAPI();
    }

    handleClick(e) {
        e.preventDefault();
        this.getBitcoinValuesFromAPI();
    }

    getBitcoinValuesFromAPI = () => {
        this.setState({loading: true});
        axios.get('https://www.mercadobitcoin.net/api/btc/ticker')
            .then((response) => {
                this.setState({data: response.data.ticker, loading: false});
            })
            .catch((error) => {
                this.setState({loading: false});
                console.log(error);
            });
    }

    render() {
        let last = Number(this.state.data.last).toFixed(2);
        let high = Number(this.state.data.high).toFixed(2);
        let low = Number(this.state.data.low).toFixed(2);
        let vol = Number(this.state.data.vol).toFixed(2);

        return (
            <View style={{flex: 1}}>
                <Header headerText={'Bitcoin Agora'}/>

                <View style={styles.container}>
                    <View style={styles.containerText}>
                        <Text style={styles.btcNow}>1 Bitcoin vale: R$ {last}</Text>
                        <Text style={styles.otherInfo}>Maior preço (24hrs): R$ {high}</Text>
                        <Text style={styles.otherInfo}>Menor preço (24hrs): R$ {low}</Text>
                        <Text style={styles.otherInfo}>Quantidade negociada (24hrs): {vol} BTC</Text>
                        <Text>Última atualização: {Moment().format('DD/MM/YYYY HH:mm')}</Text>
                    </View>

                    <View style={styles.containerText}>
                        <View style={styles.button}>
                          <Button onPress={this.handleClick}>
                              Atualizar
                          </Button>
                        </View>
                        <Text style={styles.apiInfo}>API Utilizada - MercadoBitcoin</Text>
                    </View>
                </View>

                <Loader loading={this.state.loading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    containerText: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    btcNow: {
        fontSize: 20,
        textAlign: 'center',
        color: '#333333',
        margin: 6,
        marginTop: 10
    },
    otherInfo: {
        fontSize: 15,
        textAlign: 'center',
        color: '#333333',
        margin: 3
    },
    button: {
        alignSelf: 'center',
        width: 100,
        marginBottom: 10
    },
    apiInfo: {
        textAlign: 'center',
        width: 300
    }
});

export default App;
