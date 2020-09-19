import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'
import PropTypes from 'prop-types';
///Proptypes para documentar los componentes
function App() {

  //Citas en local Storage
  //Local storage solo permite Strings, entonces hacemos el parse
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  //si citasIniciales esta vacio, ponemos un arreglo
  if(!citasIniciales){
    citasIniciales = [];
  }

  //citas que se visualizara en el lado derecho, sera un arreglo vacio
  //const[citas,setCitas]= useState([]]);
  //inicia con los valores de localstorage
  const[citas,setCitas]= useState(citasIniciales);

  //usar Effect para ciertas operaciones cuando el state cambie
  //Se ejcuta cuando el componente esta lista y cuando se tiene que recargar
  //Para usarlo hay que iniciarlo con un array vacio, en un caso si consultaramos a una API se ciclaria
  //el arreglo es una dependencia
  useEffect(()=>{
    //si citasIniciales no esta vacio, lo que haya en el state lo ponemos en el storage
    localStorage.setItem('citas',JSON.stringify(citas))
    
  },[citas]);

  //Funcion que tome las citas actuales y agregue la nueva
  const CrearCita=cita=>{
    setCitas([
      ...citas,cita
    ]);
  }

  //Funcion que eliminar una cita por su id 
  const eliminarCita= id=>{
    //console.log(id);
    const nuevasCitas=citas.filter(cita=>cita.id !== id);
    setCitas(nuevasCitas);
  }

  ///Mensaje condicional
  const titulo = citas.length === 0 ?'No hay citas': 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              CrearCita={CrearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

//documentar proptypes
Formulario.propTypes={
  CrearCita:PropTypes.func.isRequired
}
export default App;
