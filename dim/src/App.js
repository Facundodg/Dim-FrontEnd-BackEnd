import logo from './logo.svg';
import './App.css';

import Chat from './Componentes/Chat';
import PageWrapperTabla from './Componentes/PageWrapperTabla';
import InicioSesion from './Componentes/InicioSesion';
import Solicitud from './Componentes/Solicitud';
import Login from './Componentes/Login';
import Consulta from './Componentes/Consulta';

import { BrowserRouter, Routes, Route} from "react-router-dom";
import io, {Socket} from "socket.io-client";


//<Route path="/chat" element={<Chat />} />
//<Route path="/" element={<InicioSesion />} />

//<Route path="/atencion-online/:usuario/:id" element={<Solicitud/>} />

function App() {

  const socket = io("http://localhost:4001");

  return (

    <BrowserRouter>

      <Routes>

        <Route path='/atencion-online/:usuario' element={<PageWrapperTabla />} />

        <Route path="/atencion-online/:usuario/:id" element={<Solicitud />} />
        <Route path="/consulta-online/:usuario/:id" element={<Solicitud />} />
        <Route path="/" element={<Login/>} />
        <Route path="/consulta-online/:usuario" element={<Consulta/>} />
        <Route path="/chat" element={<Chat />} />



      </Routes>

    </BrowserRouter>

  );
}

export default App;
