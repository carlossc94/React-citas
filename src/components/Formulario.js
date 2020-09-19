//Fragmet para poder usar y dividir el HTML
//use State para el uso de estados
import React, {Fragment,useState}from 'react';
import uuid from 'uuid/dist/v4';
//se puede hacer en el parentesis agregar props o hacer destructioning llamando a la funcion
/*const Formulario = (props)=>{
    props.crearcita
*/
const Formulario = ({CrearCita})=>{
    //Crear state de Citas
    //El primero es el primer arreglo correspondiente con algunos valores por defecto o en su caso
    //vacios
    //El segundo es el que cambiara los estatus correspondientes, nunca se debe usar el mismo
    //state en este caso de cita para eso se usa setcita
    const[cita,setCita]=useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
    
    //Estate error
    const[error,setError]=useState(false)

    //funcion al escriibir enb el input
    /*Actualizar state nos servira como funcion para realizar el cambio de estado mediante el setcita
    donde e es el evento del DOM. setCita es la funcion para destructure de los nuevos valores
    que tendra hacia el nuevo estado 
    Es normal crear multiples states
    */
    const actualizarState = e =>{
        setCita({
            //Este parametro pasa la copia del array para que se llene de forma correcta
            ...cita,
            //target.name = trae el nombre del form input, e.target.value = el valor encontrado
            [e.target.name]:e.target.value
        })
        //console.log(e.target.value);
    };


    //extraer los valores
    //Siempre agregar el destructioning
    const {mascota,propietario,fecha,hora,sintomas}=cita;

    //cuando el usuario presiona agregar cita
    const submitCita = e=>{
        e.preventDefault();
        
        //Validar
        if(mascota.trim()==='' || propietario.trim()==='' || fecha.trim()==='' || hora.trim() ==='' 
        || sintomas.trim()===''){
            setError(true);
            return;
        }

        setError(false);

        //Asignar un ID
        cita.id=uuid();
        
        //Crear la cita
        CrearCita(cita);
        //Reiniciar el form
        setCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    return(
       <Fragment>
           <h2>Crear Cita</h2>
           {error ? <p className="alerta-error">Todos los campos son obligatorios</p>:null}
           <form
            onSubmit={
                submitCita
            }
            autoComplete="off"
           >
               <label>Nombre Mascota</label>
               <input type="text" name="mascota" className="u-full-width" placeholder="Nombre Mascota" 
               onChange={actualizarState}
               value={mascota}
               />

               <label>Nombre Dueño</label>
               <input type="text" name="propietario" className="u-full-width" placeholder="Nombre dueño de la mascota" 
               onChange={actualizarState}
               value={propietario}
               />
          
               <label>Fecha</label>
               <input type="date" name="fecha" className="u-full-width" 
               onChange={actualizarState}
               value={fecha}
               />

               <label>Hora</label>
               <input type="time" name="hora" className="u-full-width" 
               onChange={actualizarState}
               value={hora}
               />

               <label>Sintomas</label>
               <textarea name="sintomas" className="u-full-width" onChange={actualizarState} value={sintomas}
               ></textarea>

               <button type="submit" className="u-full-width button-primary">Enviar Cita</button>
           </form>
       </Fragment>
    );
}

export default Formulario;