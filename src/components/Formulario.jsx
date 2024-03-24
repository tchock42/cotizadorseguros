import React from 'react'
import { Fragment } from 'react'
import { MARCAS, YEARS, PLANES } from '../constants'
import useCotizador from '../hooks/useCotizador'
import Error from './Error'

const Formulario = () => {

    const {datos, handleChangeDatos, error, setError, cotizarSeguro} = useCotizador()  //extrae los datos del Context mediante el custom hook

    const handleSubmit = (e) => {
        e.preventDefault();

        if(Object.values(datos).includes('')){                  //si alguna propiedad tiene valor ''
            setError('Todos los Campos son Obligatorios')       //state de error
            return                                              //sale de la funcion handleSubmit si hay error
        }
        setError('')                                            //si había error lo borras

        //Cotizar Seguro
        cotizarSeguro();
    }
    
  return (
    <>
        { error && <Error/> }
        <form onSubmit={e => handleSubmit(e)}>
            {/* Marcas */}
            <div className="my-5">
                <label htmlFor="marca" className="block mb-3 font-bold">Marca</label>
                <select                                             
                    name="marca" 
                    id="marca" 
                    className='w-full p-3 bg-white border border-gray-200'
                    onChange={e => handleChangeDatos(e)}    // callback para cambiar el objeto de datos | marcas
                    value={datos.marca}
                >
                    <option value="">-- Selecciona Marca --</option>
                    {MARCAS.map(marca => (
                        <option 
                            key={marca.id}
                            value={marca.id}
                        >
                            {marca.nombre}
                        </option>
                    ))}
                </select>
            </div>
            {/* Años */}
            <div className="my-5">
                <label htmlFor="year" className="block mb-3 font-bold">Año</label>
                <select 
                    name="year" 
                    id="year" 
                    className='w-full p-3 bg-white border border-gray-200'
                    onChange={e => handleChangeDatos(e)}  // callback para cambiar el objeto de datos | años
                    value={datos.year}
                >
                    <option value="">-- Selecciona Año --</option>
                    {YEARS.map((year, index) => (
                        <option 
                            key={index}
                            value={year}
                        >
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            {/* PLanes */}
            <div className="my-5">
                <label className="block mb-3 font-bold">Elige un Plan</label>
                <div className="flex gap-3 items center">
                    {PLANES.map(plan => (   //Se itera sobre los planes para crear un radio | usa fragment para meter el key
                        <Fragment key={plan.id}>           
                            <label htmlFor={plan.id}>{plan.nombre}</label>                              
                            <input 
                            
                                type="radio" 
                                name='plan' 
                                id={plan.id}
                                value={plan.id} //este value se pasa al handlechangeDatos
                                onChange={e => handleChangeDatos(e)}  // callback para cambiar el objeto de datos | planes
                            />  
                        </Fragment> //se guarda la información en el name y el value va a ser diferente
                    ))}
                </div>
            </div>
            <input type="submit" className='w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold' />
        </form>
    </>
  )
}

export default Formulario
