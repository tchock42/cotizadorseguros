import AppSeguro from "./components/AppSeguro"
import { CotizadorProvider } from "./context/CotizadorProvider"

function App() {
  
  return (  //El provider debe rodear la app porque es el que provee los datos del context
    <CotizadorProvider       
    >
      <AppSeguro/> 
      
    </CotizadorProvider>
  )
}

export default App
