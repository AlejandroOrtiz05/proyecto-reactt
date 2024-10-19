import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Conversor from './conversor';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setLogueado] = useState(false);  // Cambio a setLogueado

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value);
  }

  
  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  async function ingresar() {
    try {
      const peticion = await fetch(`http://localhost:3000/login?usuario=${encodeURIComponent(usuario)}&clave=${encodeURIComponent(clave)}`, { credentials: 'include' });
      if (peticion.ok) {
        setLogueado(true);  // Cambio a setLogueado
      } else {
        alert('Usuario o clave incorrectos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al procesar la solicitud.');
    }
  }

  async function validar() {
    try {
      const peticion = await fetch(`http://localhost:3000/validar?usuario=${encodeURIComponent(usuario)}&clave=${encodeURIComponent(clave)}`, { credentials: 'include' });
      if (peticion.ok) {
        setLogueado(true);  // Cambio a setLogueado
      } else {
        alert('Usuario o clave incorrectos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al procesar la solicitud.');
    }
  }

  useEffect(() => {
    validar();
  }, []);  // El efecto se ejecutará una sola vez después del primer renderizado

  if (logueado) {
    return <Conversor />;
  }

  return (
    <>
      <h1>Inicio de sesión</h1>
      <input type="text" placeholder='Usuario' name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario} />
      <input type="password" placeholder='Clave' name="clave" id="clave" value={clave} onChange={cambiarClave} />
      <button onClick={ingresar}>Ingresar</button>
    </>
  );
}

export default App;
