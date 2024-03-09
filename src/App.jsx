import {useState, useEffect} from 'react'
import Header from "./components/Header"
import Button from "./components/Button"
import { formatearDinero, calcularTotalPagar} from './helpers'


function App() {
    const [cantidad, setCantidad] = useState(10000); //la funcion setCantidad modifica la cantidad
    const [meses, setMeses] = useState(6)
    const [total, setTotal] = useState(0);
    const [pago, setPago] = useState(0); 

    useEffect(() => {
        const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
        setTotal(resultadoTotalPagar)

        //calcular el pago mensual
        setPago(total / meses);
    },  [cantidad, meses])

    // es mejor dividir los useEffect(dependencias) para leer mejor el codigo

    useEffect(() => {
        setPago(total / meses);
    }, [total])

    // crea las constantes para tener un min de 0 y un max de 20mil y que salte de 100 en 100
    const MIN = 0;
    const MAX = 200000;
    const STEP = 100;

    function handleChange(e){
        setCantidad (+e.target.value);

    }
    function handleClickDecremento(){
        const valor = cantidad - STEP
        
        if(valor < MIN){
            alert('Cantidad no valida gil')
            return
        }
        setCantidad(valor);
    }
    function handleClickCrecimiento(){
        const valor = cantidad + STEP
        
        if(valor > MAX){
            alert('NO podes pasarte del limite')
            return
        }
        setCantidad(valor);
    }

    //afuera del return puedo escribir javascript pero dentro del return esta ilimitada
    return (
        <div className="my-20 max-w-lg mx-auto bg-white shadow p-10 rounded-lg">
            <Header />

            <div className="flex justify-between my-10">
                <Button 
                    operador= '-'
                    fn= {handleClickDecremento}
                />
                <Button 
                    operador= '+'
                    fn= {handleClickCrecimiento}
                />
            </div>

            <input 
                type="range" 
                className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-700"
                onChange={handleChange}
                //llama a las constantes creadas
                min={MIN}
                max={MAX}
                step={STEP}
                value={cantidad}
            />

            <p className= 'text-center my-10 text-5xl font-extrabold text-indigo-600'>
                {formatearDinero (cantidad)}
            </p>

            <h2 className="text-2xl font-extrabold text-gray-500 text-center">
                Elige un <span className='text-indigo-600'>Plazo</span> a pagar
            </h2>

            <select 
                className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center
                text-xl font-bold text-gray-500'
                value={meses}
                onChange={e =>setMeses(+e.target.value)}
            >
                <option value="6"> 6 Meses</option>
                <option value="12"> 12 Meses</option>
                <option value="24"> 24 Meses</option>
            </select>
            
            <div className='my-5 space-y-3 bg-gray-300 p-5 rounded-md'>
                <h2 className="text-2xl font-extrabold text-gray-800 text-center">
                    Resumen <span className='text-indigo-600'>de pagos</span> 
                </h2>

                <p className='text-xl text-gray-800 text-center font-bold'>Meses: {meses} </p>
                <p className='text-xl text-gray-800 text-center font-bold'>Total a pagar: {formatearDinero(total)} </p>
                <p className='text-xl text-gray-800 text-center font-bold'>Mensuales: {formatearDinero(pago)} </p>


            </div>
        </div>
    )
    

    
  
}

export default App
