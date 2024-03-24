import useCotizador from "../hooks/useCotizador"

const Error = () => {

    const {error} = useCotizador()              //se usa el hook personalizado que usa useContext(CotizadorContext)
    return (
        <div className="border text-center border-red-400 bg-red-100 py-3 text-red-700">
            <p className="font-medium">{error}</p>
        </div>
    )
}

export default Error
