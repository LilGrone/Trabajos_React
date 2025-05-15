import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');

  function Mybtn({ numeros }) {
    return (
      <div className="fila-botones">
        {numeros.map((numero, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(numero)}
            className="boton"
           >
            {numero}
    
          </button>
        ))}
      </div>
    );
  }

  function handleButtonClick(value) {
    if (value === '=') {
      try {
        setInputValue(eval(inputValue).toString()); 
      } catch {
        setInputValue('Error');
      }
    } else if (value === 'C') {
      setInputValue(''); 
    } else {
      setInputValue(inputValue + value); 
    }
  }

  return (
    <>
      <div className="Calculadora">
        <div className="Pantalla">
          <input type="text" value={inputValue} readOnly />
        </div>
        <div className="Botones">
          <Mybtn numeros={[7, 8, 9, '/']} />
          <Mybtn numeros={[4, 5, 6, '*']} />
          <Mybtn numeros={[1, 2, 3, '-']} />
          <Mybtn numeros={['C', 0, '=', '+']} />
        </div>
      </div>
      <p>Hecho Por Luis Villarreal  </p>
    </>
  );
}


export default App
