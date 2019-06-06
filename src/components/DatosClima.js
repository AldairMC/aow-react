import React, { Component } from 'react';
import PropTypes from 'prop-types'

class DatosClima extends Component {
    
    mostrarClima = () => {
        const kelvin = 271.15

        const {name, weather, main} = this.props.datosClima
    
        if(!name || !weather || !main) return null

        const urlIcon = `http://openweathermap.org/img/w/${weather[0].icon}.png`
        const alter = `clima de ${name}`

        return(
            <div className="row">
                <div className="resultado s12 m8 l6 offset-l3">
                    <div className="card-panel light-blue align-center">
                        <span className="white-text">
                            <h2>Clima de: {name}</h2>
                            <p className="temperatura">
                                Actual: {(main.temp - kelvin).toFixed(2)} &deg;C 
                                <img src={urlIcon} alt={alter}/>
                            </p>
                            <p> 
                                Temp max: { (main.temp_max - kelvin).toFixed(2)} &deg;C
                            </p>
                            <p> 
                                Temp min: { (main.temp_min - kelvin).toFixed(2)} &deg;C
                            </p>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
    
    render(){        
        return (
            <div className="container">
                {this.mostrarClima()}
            </div>
        );
    }
}

DatosClima.propTypes = {
    datosClima: PropTypes.object.isRequired    
}
 
export default DatosClima;