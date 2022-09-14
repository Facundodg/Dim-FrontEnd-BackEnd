import logo from './logo.svg';
import './App.css';

import Chat from './Componentes/Chat';
import PageWrapperTabla from './Componentes/PageWrapperTabla';
import InicioSesion from './Componentes/InicioSesion';
import Solicitud from './Componentes/Solicitud';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



function App() {
  return (

    <BrowserRouter>

      <Routes>

        <Route path="/chat" element={<Chat />} />
        <Route path='/atencion-online' element={<PageWrapperTabla />} />
        <Route path="/" element={<InicioSesion />} />

        <Route path="/atencion-online/solicitud/:id" element={<Solicitud />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
