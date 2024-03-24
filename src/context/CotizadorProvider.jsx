import { createContext, useState } from "react";  
import { obtenerDiferenciaYear, calcularMarca , calcularPlan, formatearDinero } from "../helpers";

const CotizadorContext = createContext();       //definición del Context


 //definición del Provider, aqui se alojan hooks y funciones
const CotizadorProvider = ({children}) => {                 //similar a un Componente con un child
    /**Esto estará fuera de la aplicación hasta que se pase al value del CotizadorProvider*/
    const [datos, setDatos] = useState({    //state que guarda en un objeto el formulario completo
        marca: '',
        year: '',
        plan: ''
    })
    const [error, setError] = useState('')          //state que guarda el error

    const [resultado, setResultado] = useState(0)  //state que guarda el resultado

    const [cargando, setCargando] = useState(false) //state que activa/desacttiva el spinner

    const handleChangeDatos = (e) => {      //funcion que setea datos cuando se interactua con el formulario
        setDatos({
            ...datos,
            [e.target.name]: e.target.value //corchetes para que reconozca la notacion del e
        })
        // console.log(datos)
    }

    const cotizarSeguro = () => {
        //Una base
        let resultado = 2000;                          //se toma como base 2000
        //Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
        
     
        //Restar el 3% por cada año de antigüedad
        resultado -= ((diferencia * 3) * resultado) / 100; 
        
        //Americano 15% | Europeo 30% | Asiatico 5%
        resultado *= calcularMarca(datos.marca)
      
        //Básico 20% //Completo 50%
        resultado *= calcularPlan(datos.plan)
        resultado = resultado.toFixed(2)
        
        resultado = formatearDinero(resultado)
        setCargando(true)           //cambia el state del spinner a true
        
        setTimeout(() => {
            setResultado(resultado) //actualiza el state de resultado 
            setCargando(false)      //y actualiza cargando cuando pasan 3segundos
        }, 3000);
      
    }   


    /**Lo anterior estará fuera de la aplicación hasta que se pase al value del CotizadorProvider */
    return(                                                 //retorna CotizadorContext.PRovider como componente
        <CotizadorContext.Provider
            value={{          //una llave para indicar que es javascript, la otra es por un objeto vacío
                datos,
                handleChangeDatos,
                error, 
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

//exportar para usarlos en otros lugares
export {
    CotizadorProvider
}
export default CotizadorContext