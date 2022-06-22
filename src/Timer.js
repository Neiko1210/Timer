import React from 'react';
import './Timer.css';
import { useState, useEffect, useRef } from 'react';

const Timer = () => {
  /*  The states */
  const [segundos, setSegundos] = useState(0);
  const [minutos,setMinutos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState('Contador');
  const myRef = useRef(null);
  const otherRef = useRef(null);

  /*  Toogle for change the active*/  
  function toggle() {
    setActivo(!activo)
  };

  /*  Seconds reset */
  function reseteamoSeg(){
    setSegundos(0)
  }

  /*  General reset */
  function reset() {
    setSegundos(0);
    setActivo(false);
    setMinutos(0);
  };

  /*  Hooks */
  useEffect(() => {
    let intervalo = null;
    let minit = null;
    if (activo && tipo === 'Contador' && segundos !== 59) {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000)
    }
    else if (activo && tipo === 'Contador'){
      setMinutos(minutos => minutos + 1)
      reseteamoSeg()
    }
     if(activo && tipo === 'Cuenta Regresiva'&& segundos === 0){
      setSegundos(59)
      setMinutos(minutos => minutos - 1)
    }
    if (activo && tipo === 'Cuenta Regresiva') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos - 1);
      }, 1000);
    }
    if (!activo && segundos !== 0 && tipo === 'Contador') {
      clearInterval(intervalo)
      clearInterval(minit)
    }
    if (segundos === 0 && minutos === 0 && activo && tipo === "Cuenta Regresiva") {
      reset();
      clearInterval(intervalo);
      clearInterval(minit);
      cambioTipo()
    }

    return () =>{
      clearInterval(intervalo);
      clearInterval(minit)
    };
  }, [activo, segundos, tipo, minutos]);

  function cambioTipo() {
    if(tipo === 'Contador') setTipo('Cuenta Regresiva')
    if(tipo === 'Cuenta Regresiva') setTipo('Contador')
  }; 

  function agregaSegundos() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value
    if(ref<0||ref>59){return}
    setSegundos(ref)
  }

  function agregaMinutos(){
    let ref = otherRef.current.value
    if(ref<0){return}
    setMinutos(ref)
  }



  return (
    <div className="app">
      <div className='Title'>
        Timer
      </div>
      <div className="time">
        {minutos}:{segundos}
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
      {tipo === 'Cuenta Regresiva' && <input className={"first-input"} ref={otherRef} onChange={agregaMinutos} type="number" placeholder="Ingresa Minutos" autoComplete="off"/>}
      {tipo === 'Cuenta Regresiva' && <input className={"first-input"} ref={myRef} onChange={agregaSegundos} type="number" placeholder="Ingresa Segundos" autoComplete="off"/>}
    </div>
  );
};

export default Timer;
