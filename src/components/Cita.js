import React from 'react';
import PropTypes from 'prop-types';

//usando destructioning, estamos trayendo toda la cita
const Cita = ({cita, eliminarCita}) => (
    <div className="cita">
        <p>Mascota: <span>{cita.mascota}</span></p>
        <p>Dueño: <span>{cita.propietario}</span></p>
        <p>Fecha: <span>{cita.fecha}</span></p>
        <p>Hora: <span>{cita.hora}</span></p>
        <p>Sintomas: <span>{cita.sintomas}</span></p>
        <button
            className="button eliminar u-full-width"
            //Hay que ponerlo arrow function para que espere a hacer el click 
            //si se manda solo el nombre de la funcion la ejecuta aun sin hacer clic
            onClick={()=> eliminarCita(cita.id)}
        >Eliminar &times;</button>
    </div>
);

Cita.propTypes = {
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
}
export default Cita;