import { useContext } from "react";
import CotizadorContext from "../context/CotizadorProvider";
//custom hook que accede a los states alojados en Provider del Provider
const useCotizador = () => {
    return useContext(CotizadorContext) //inicializa el hook de Cotizador context
}

export default useCotizador;