import NavBarTabla from "./NavBarTabla"
import FiltrosTablas from "./FiltrosTabla"
import Tabla from "./tabla"
import FilaTabla from "./FilaTabla"
import Footer from "./Footer"
import Cookies from 'universal-cookie';
import InfoConsultaTabla from "./InfoConsultaTabla"


import { useState, useEffect } from "react";
const cookies = new Cookies();

export default function PageWrapperTabla(props) {

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

    return (

        <div>

            <InfoConsultaTabla />

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

                            <div className="input-group mb-3 d-block w-100">
                                <label htmlFor="">Filtrar por Tributo </label>
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">Todos</button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">CISCA</a></li>
                                    <li><a className="dropdown-item" href="#">CISI</a></li>
                                    <li><a className="dropdown-item" href="#">Publicidad y Propaganda</a></li>
                                    <li><a className="dropdown-item" href="#">TEM</a></li>
                                    <li><a className="dropdown-item" href="#">Todos</a></li>
                                </ul>
                            </div>

                            <div className="input-group mb-3 d-block d-block w-100">
                                <label htmlFor="">Filtrar por tipo de Solicitud </label>
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">Todos</button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Consultas Generales</a></li>
                                    <li><a className="dropdown-item" href="#">DIM - Comunicacion</a></li>
                                    <li><a className="dropdown-item" href="#">Seguimiento de Carpetas PFP</a></li>
                                    <li><a className="dropdown-item" href="#">Solicitud de Empadronamiento</a></li>
                                    <li><a className="dropdown-item" href="#">Todos</a></li>
                                    <li><a className="dropdown-item" href="#">Turno General</a></li>
                                    <li><a className="dropdown-item" href="#">Turno por Expediente</a></li>
                                </ul>
                            </div>

                            <div className="container">

                                <div className="input-group">
                                    <div className="input-group-prepend">

                                        <button className="btn btn-primary border">Buscar</button>
                                        <button className="btn btn-primary border border-start">Actualizar</button>

                                    </div>
                                    <input type="text" className="form-control" placeholder="CUIT/DNI" aria-label=""
                                        aria-describedby="basic-addon1" />
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