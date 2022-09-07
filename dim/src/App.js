import logo from './logo.svg';
import './App.css';

import Chat from './Componentes/Chat';
import PageWrapperTabla from './Componentes/PageWrapperTabla';
import InicioSesion from './Componentes/InicioSesion';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



function App() {
  return (

    <BrowserRouter>

      <Routes>

        <Route path="/chat" element={<Chat/>} />
        <Route path='/atencion-online' element={<PageWrapperTabla/>}/>
        <Route path="/" element={<InicioSesion/>} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
