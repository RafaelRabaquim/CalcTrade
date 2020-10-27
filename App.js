import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker, 
  TextInput,
  Slider } from 'react-native';

  class App extends Component{

    constructor(props){
      super(props);
      this.state={
          ativo:0, 
          ativos:[
            {key:1, nome:'Mini Indice', valor:0.2},
            {key:2, nome:'Mini Dólar',  valor:10}, 
            {key:3, nome:'Milho',       valor:450},
            {key:4, nome:'Boi',         valor:330},
            {key:5, nome:'Café',        valor:100}
          ],
          valorRisco:0,
          inputCapital:0,
          inputEntrada:0,
          inputLoss:0,
          riscosPorContratos:0, 
          valorAtivo:0.2,
          percentualCapital:0
      };

      //funções tem que ter bind.
      //e ficar aqui antes das chaves {}
      this.pegaCapital  = this.pegaCapital.bind(this);
      this.pegaEntrada  = this.pegaEntrada.bind(this);
      this.pegaStopLoss = this.pegaStopLoss.bind(this);
    };

    pegaCapital(texto){
      this.setState({inputCapital:texto})
    }
    pegaEntrada(texto){
      this.setState({
          inputEntrada:texto, 
          riscosPorContratos:(texto - this.state.inputLoss) * this.state.valorAtivo
        })
    }
    pegaStopLoss(texto){
      this.setState({
          inputLoss:texto, 
          riscosPorContratos: (this.state.inputEntrada - texto) * this.state.valorAtivo
        })
    }

    render(){

      let ativosItens = this.state.ativos.map((v, k) =>{
          return <Picker.Item key={k} value={k} label={v.nome}/>
      })

      let teste = (
          this.state.percentualCapital / this.state.riscosPorContratos
      )

      return(
        <View style={styles.container}>
          
          <View style={styles.views}>
            <Text style={styles.texto}>Capital</Text>

            <TextInput 
              style={styles.input}
              placeholder="Digite seu Capital"
              onChangeText={this.pegaCapital}
              keyboardType={"numeric"}
            />

            <Text style={styles.texto}>Ativo</Text>

            <Picker style={styles.picker}
              selectedValue={this.state.ativo}
              onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                      ativo: itemValue,
                      valorAtivo:this.state.ativos[itemIndex].valor})}
              mode={"dropdown"}
            >
               {ativosItens}
            </Picker>

            <Text style={styles.texto}>{this.state.valorAtivo}</Text>
            <Text style={styles.texto}>Risco por Trade</Text>

            <Slider style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              onValueChange={(valorSelecionado) => this.setState({
                          valorRisco: valorSelecionado, 
                          percentualCapital:this.state.inputCapital*valorSelecionado
                                                              })}
            value={this.state.valorRisco}
            />
            <Text style={{textAlign:'center',
                      fontSize:20,
                      backgroundColor:'#FFFFFF',
                      marginTop:-15}}>{this.state.valorRisco.toFixed(0)+'%'} </Text>
          </View>

          <View style={styles.views}>
            <Text style={{fontSize:23, color:'#FFF'}}>Compra</Text>
            <Text style={styles.texto}>Ponto de Entrada</Text>
            
            <TextInput 
              style={styles.input}
              placeholder="Digite seu ponto de entrada"
              keyboardType={"numeric"}
              onChangeText={this.pegaEntrada}
            />
            <Text style={styles.texto}>Stop Loss</Text>
            <TextInput 
              style={styles.input}
              placeholder="Digite seu STOP LOSS"
              keyboardType={"numeric"}
              onChangeText={this.pegaStopLoss}
            />
          </View>
          <View style={styles.views}>
            <Text style={styles.texto}>Risco por contrato</Text>
            <Text style={styles.texto}>
              {'R$ ' + this.state.riscosPorContratos.toFixed(2)}
            </Text>
            <Text style={styles.texto}>Número Máximo de Contratos</Text>
            <Text style={styles.texto}>
                {(this.state.percentualCapital / this.state.riscosPorContratos) > 0.99 ?
                teste.toFixed(0):
                'Você não pode operar'
                }
             </Text>
          </View>
        </View>
      );
    }  
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272d47',
    marginTop:20
  },
  views:{
    justifyContent:'space-evenly',
    padding:7
  },
  input:{
    height:43,
    fontSize:20, 
    padding:10,
    backgroundColor:'#FFF',
  },
  texto:{
    fontSize:20,
    color:'#FFF',
    marginTop:5
  },
  picker:{
    fontSize:20, 
    backgroundColor:'#d9d9d9'
  }, 
  slider:{
    backgroundColor:'#FFf', 
    marginTop:5, 
    height:45
  }
});

export default App;