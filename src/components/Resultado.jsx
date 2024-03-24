import useCotizador from "../hooks/useCotizador"
import {MARCAS, PLANES} from '../constants'
import { useCallback, useRef, useMemo } from "react"

const Resultado = () => {
    
    const {resultado, datos} = useCotizador()   //se extrae resultado y datos del Provider
    const {marca, plan, year} = datos;          //destructiring

    const yearRef = useRef(year)                //congela year para que no se renderice al cambiar datos
    
    const [nombreMarca] = useMemo( () =>          //aplica el usacallback, reserva MARCAS.filter hasta que resultado cambie y no datos
        MARCAS.filter(m => m.id === Number(marca)), 
        [resultado]
    )    //filtra la marca que coincida la marca de datos con el id del diccionario
    // console.log(nombreMarca)

    const [nombrePlan] = useCallback(           //aplica useCallBack, reservar la funcion PLANES.filter hasta que resultado cambien y no datos
        PLANES.filter(P => P.id === Number(plan)),
        [resultado]    
    )      //lo mismo pero para plan. Lo extrae del array obtenerlo como objeto
    // console.log(nombrePlan)

    if(resultado === 0) return null;
    
    return (
        <div className="bg-gray-100 text-center mt-5 p-5 shadow">
            <h2 className="text-gray-600 font-black text-3xl">Resumen</h2>
            <p className="my-2">
                <span className="font-bold">Marca: </span>
                {nombreMarca.nombre}
            </p>

            <p className="my-2">
                <span className="font-bold">Plan: </span>
                {nombrePlan.nombre}
            </p>

            <p className="my-2">
                <span className="font-bold">Año del Auto: </span>
                {yearRef.current}
            </p>

            <p className="my-2 text-2xl">
                <span className="font-bold">Total Cotización: </span>
                {
                new Intl.NumberFormat('en-EN', { 
                    style: 'currency', 
                    currency: 'USD' 
                }).format(resultado,)
                }
            </p>
        </div>
    )
}

export default Resultado
