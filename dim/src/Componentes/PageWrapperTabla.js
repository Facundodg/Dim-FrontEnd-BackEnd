import NavBarTabla from "./NavBarTabla";
import FiltrosTablas from "./FiltrosTabla";
import Tabla from "./tabla";
import FilaTabla from "./FilaTabla";
import Footer from "./Footer";
import Cookies from 'universal-cookie';
import InfoConsultaTabla from "./InfoConsultaTabla";
import axios from "axios";

import { useState, useEffect } from "react";


export default function PageWrapperTabla(props) {

    const cookies = new Cookies();

    const [buscador, setBuscador] = useState();

    const [filtrosPorTipo, setfiltroPorTipoTributo] = useState();

    const [filtrosPorTipoSolicitu, setfiltroPorTipoSolicitud] = useState();

    


    const filtro1 = function (evento) {

        setfiltroPorTipoTributo(evento.target.value)
        console.log(evento.target.value);

    }

    const filtro2 = function (evento) {

        setfiltroPorTipoSolicitud(evento.target.value)
        console.log(evento.target.value);

    }

    const busca = function (evento) {

        setBuscador(evento.target.value)
        console.log(evento.target.value);

    }

    //aqui va la veririficacion de la cookie

    const cerrarSesion = () => {

        cookies.remove('id', { path: "/" });
        cookies.remove('rol', { path: "/" });
        cookies.remove('nombre_usuario', { path: "/" });
        window.location.href = './';

    }

    const permiso = () => {

        if (!cookies.get('nombre_usuario')) {

            window.location.href = "./";

        }

    }

    const [consultas, setConsultas] = useState([]);
    let filasConsultas;

    useEffect(() => {

        permiso();
        cargarConsultasUsuarios();

    }, []);

    const cargarConsultasUsuarios = async () => {

        let url = "http://localhost:4000/atencion-online";

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            }

        });

        let json = await consulta.json();


        {
            Object.entries(json).map(js => {

                filasConsultas = js[1];

            })
        }

        setConsultas(filasConsultas);

    }

    const cargarUsuario = async (cuit) => {

        let url = 'http://localhost:4000/atencion-online/usuario/' + cuit + '';

        console.log(cuit);

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            }

        });

        let json = await consulta.json();

        console.log(json);

        setData(json);

    }


















    //+'/'+filtrosPorTipo+'/'+filtrosPorTipoSolicitu+''

  
    const cargarConsultasUsuariosFiltrada = async () => {

        let url = 'http://localhost:4000/atencion-online/usuario/'+buscador;

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            }

        });

        let json = await consulta.json();

        console.log(json);

        return json;

    }























    const datafixed = {

        id: 5,
        id_solicitud: 28516,
        tipo_solicitud: "CISI",
        caracter: '3',
        tipo_doc: 9999999999,
        documento: 9999999999,
        apellido: 'SALES',
        nombre: 'JULIETA ROJAS',
        usuario: 'pruebasmt',
        ip: '172.20.254.205',
        fecha_mov: '2018-10-05 13:36:00.663964',
        cuit: '8678678676',
        email: 'kjfsf@adas.com',
        telefono: 1563673657,
        estado: "tr-bg-vistoNoContestado"

    }

    const [data, setData] = useState(datafixed)
    


    return (

        <div>

            <InfoConsultaTabla data={data} />

            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom" id="menu-var">

                    <a className="navbar-brand m-1" href="index.html"><img src="./img/logo.png" width="100px" height="45px"
                        alt="icono" /><span className="text-primary fs-5 fw-bold"></span></a>

                    <button className="navbar-toggler m-1" type="button" data-bs-toggle="collapse" data-bs-target="#menu"
                        aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse m-1" id="menu">

                        <ul className="navbar-nav">


                            <li className="nav-item">

                                <a className="nav-link" href="#">Aplicaciones</a>

                            </li>

                            <li className="nav-item">

                                <a className="nav-link" href="#">Cambio de Clave</a>

                            </li>

                            <li className="nav-item">

                                <a className="nav-link" href="#">Gestion</a>

                            </li>

                            <li className="nav-item">

                                <a className="nav-link" href="#">Online</a>

                            </li>

                            <li className="nav-item">

                                <a onClick={cerrarSesion} className="nav-link" href="#">Salir</a>

                            </li>

                        </ul>

                    </div>

                </nav>

            </div>

            <div className="container d-flex justify-content-center align-items-center mt-3" id="filtros">

                <div className="container text-center">

                    <h2 className="border-bottom border-primary">Ventanilla Electronica</h2>

                    <div className="container">

                        <div className="container d-flex filtros">

                            <div class="input-group mb-3">
                                <label htmlFor="">Filtrar por Tributo </label>
                                <select class="form-select" onChange={filtro1} id="inputGroupSelect03" aria-label="Example select with button addon">
                                    <option selected value="0">CISCA</option>
                                    <option value="1">CISI</option>
                                    <option value="2">Publicidad y Propaganda</option>
                                    <option value="3">TEM</option>
                                    <option value="4">Todos</option>
                                </select>
                            </div>

                            <div class="input-group mb-3">
                                <label htmlFor="">Filtrar por tipo de Solicitud </label>
                                <select class="form-select" onChange={filtro2} id="inputGroupSelect03" aria-label="Example select with button addon">
                                    <option selected value="0">Consultas Generales</option>
                                    <option value="1">DIM - Comunicacion</option>
                                    <option value="2">Seguimiento de Carpetas PFP</option>
                                    <option value="3">Solicitud de Empadronamiento</option>
                                    <option value="4">Todos</option>
                                    <option value="5">Turno General</option>
                                    <option value="6">Turno por Expediente</option>

                                </select>
                            </div>
                            

                            <div className="container">

                                <div className="input-group">
                                    <div className="input-group-prepend">

                                        <button className="btn btn-primary border" onClick={() => cargarConsultasUsuariosFiltrada()}>Buscar</button>
                                        <button className="btn btn-primary border border-start">Actualizar</button>

                                    </div>
                                    <input type="text" className="form-control" placeholder="CUIT/DNI" aria-label=""
                                        aria-describedby="basic-addon1" onChange={busca} />
                                </div>

                            </div>

                        </div>

                    </div>


                </div>

            </div>

            <section className="main-content">

                <div className="container">

                    <Tabla>

                        {consultas.map(con => {

                            return (

                                <FilaTabla

                                    id={con.id}
                                    apyNom={con.nombre}
                                    cuit={con.cuit}
                                    razonConsulta={con.tipo_solicitud}
                                    estado={con.estado}
                                    id_solicitud={con.id_solicitud}
                                    setData={setData}
                                    cargarUsuario={cargarUsuario}

                                />

                            )

                        })

                        }

                    </Tabla>

                </div>

            </section>

            <div className="container">

                <Footer></Footer>

            </div>

        </div >

    )

}