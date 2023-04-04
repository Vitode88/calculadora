import { useState } from "react";
import "../stylesheets/style.css";
import { evaluate } from "mathjs";

const Calculadora = () => {
  //COMPONENTE BOTON -------------------------------------------
  function Boton({ manejarClick, children }) {
    const esOperador = (valor) => {
      return isNaN(valor) && valor !== "." && valor !== "=";
      //si se cumplen estas condiciones el valor de  esOperador será true
    };

    let claseBotonContenedor;
    if (esOperador(children)) {
      claseBotonContenedor = "operador";
    } else {
      claseBotonContenedor = null;
    }

    const esIgual = (signo) => {
      if (signo === "=") {
        return true;
      }
    };

    if (esIgual(children)) {
      claseBotonContenedor = "boton-igual";
    }

    return (
      <div
        className={`boton-contenedor ${claseBotonContenedor}`.trimEnd()}
        onClick={() => {
          //esta funcion flecha es anonima
          manejarClick(children);
        }}
      >
        {children}
      </div>
    );
  }

  // -----------------------------------------------------------

  //COMPONENTE PANTALLA -------------------------------------------
  const Pantalla = ({ inputPantalla }) => <div>{inputPantalla}</div>;
  // -----------------------------------------------------------

  //COMPONENTE BOTON CLEAR -------------------------------------------
  const BotonClear = ({ manejarClear, children }) => (
    <div className="boton-clear" onClick={manejarClear}>
      {children}
    </div>
  );
  // -----------------------------------------------------------

  //LOGICA CALCULADORA -------------------------------------------
  const [input, setInput] = useState("");

  const agregarInput = (val) => {
    setInput(input + val);
  };

  const calcularResultado = () => {
    if (input) {
      //si input no tiene ningun valor -->
      setInput(evaluate(input));
    } else {
      alert("Por favor, introduce numeros para calcular");
    }
  };
  // -----------------------------------------------------------

  //ESTRUCTURA -------------------------------------------
  return (
    <div className="contenedor-calculadora">
      <div className="input">
        <Pantalla inputPantalla={input} />
        {/* el valor de la prop input de Pantalla será igual al valor del Estat input */}
      </div>
      <div className="fila">
        <Boton manejarClick={agregarInput}>1</Boton>
        <Boton manejarClick={agregarInput}>2</Boton>
        <Boton manejarClick={agregarInput}>3</Boton>
        <Boton manejarClick={agregarInput}>+</Boton>
      </div>
      <div className="fila">
        <Boton manejarClick={agregarInput}>4</Boton>
        <Boton manejarClick={agregarInput}>5</Boton>
        <Boton manejarClick={agregarInput}>6</Boton>
        <Boton manejarClick={agregarInput}>-</Boton>
      </div>
      <div className="fila">
        <Boton manejarClick={agregarInput}>7</Boton>
        <Boton manejarClick={agregarInput}>8</Boton>
        <Boton manejarClick={agregarInput}>9</Boton>
        <Boton manejarClick={agregarInput}>*</Boton>
      </div>
      <div className="fila">
        <Boton className="boton-igual" manejarClick={calcularResultado}>
          =
        </Boton>
        <Boton manejarClick={agregarInput}>0</Boton>
        <Boton manejarClick={agregarInput}>.</Boton>
        <Boton manejarClick={agregarInput}>/</Boton>
      </div>
      <div>
        <BotonClear manejarClear={() => setInput("")}>CLEAR</BotonClear>
      </div>
    </div>
  );
  // -----------------------------------------------------------
};

export default Calculadora;
