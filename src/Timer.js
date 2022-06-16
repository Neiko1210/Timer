import React from 'react';
import './Timer.css';
import { useState, useEffect, useRef } from 'react';

const Timer = () => {

  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState('Contador');
  const myRef = useRef(null);

  function toggle() {
    setActivo(!activo);
  };

  function reset() {
    setSegundos(0);
    setActivo(false);
  };

  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'Contador') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    }
    if (activo && tipo === 'Cuenta Regresiva') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos - 1);
      }, 1000);
    }
    if (!activo && segundos !== 0 && tipo === 'Contador') {
      clearInterval(intervalo);
    }
    if (segundos === 0 && tipo === 'Cuenta Regresiva') {
      reset();
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);

  function cambioTipo() {
    if(tipo === 'Contador') setTipo('Cuenta Regresiva')
    if(tipo === 'Cuenta Regresiva') setTipo('Contador')
  }; 

  function agregaSegundos() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value
    setSegundos(ref)
  }



  return (
    <div className="app">
      <div className='Title'>
        Timer
      </div>
      <div className="time">
        {segundos}S
      </div>
      <div className="row">
        <button onClick={toggle} className={`button button-primary button-primary-${activo ? 'active' : 'inactive'}`}>
          {activo ? 'Pausa' : 'Inicio'}
        </button>
        <button className="button-reset" onClick={reset}>
          Reset
        </button>
      </div>
      <button className="button-change" onClick={cambioTipo}>
          {tipo}
      </button>
      {tipo === 'Cuenta Regresiva' && <input className={"first-input"} ref={myRef} onChange={agregaSegundos} type="number" placeholder="Ingresa Segundos" autoComplete="off"/>}
    </div>
  );
};

export default Timer;
