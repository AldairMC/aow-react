import React, { Component } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Error from './components/Error';
import Clima from './components/DatosClima';


class App extends Component{
  
  state = {
    error: '',
    consulta: {},
    datosConsulta: {}
  }

  componentDidUpdate(prevProps, prevState){
    //Para llamar a la funcion una sola vez
    if(prevState.consulta !== this.state.consulta){
      this.consultaApi();
    }
  }

  componentDidMount(){
    this.setState({
      error: false
    });
  }

  consultaApi = () => {
    const {city, country} = this.state.consulta
    if(!city || !country) return null

    //key del API
    const key = '72b9289423bfb9808b11578b03b5f221'

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${key}`

    //query con fetchApi
    fetch(url)
      .then(respuesta => {
        return respuesta.json()
        
      })
      .then(datos => {
        this.setState({
          datosConsulta: datos
        })
      })
      .catch(error => {
        console.log(error)
      })
   }


  obtenerWeather = (datos) => {
    const {city, country} = datos

    if(city === '' || country === ''){
      this.setState({
        error: true
      });
    }else{
      this.setState({
        consulta: datos, 
        error: false
      });
    }
  }
  
  render(){

    const obtenerError = this.state.error;

    let resultado;

    if(obtenerError){
      resultado = 
        <Error 
          mensaje= "Todos los campos son requeridos"
        />
    }else{
      resultado = 
      <Clima 
        datosClima={this.state.datosConsulta}
      />
    }

    return(
      <div>
        <Header 
          titulo = "App of weather"
        />
        <Form 
          obtenerWeather= {this.obtenerWeather}
        />
        {resultado}

      </div>
    );
  }
} 

export default App;
