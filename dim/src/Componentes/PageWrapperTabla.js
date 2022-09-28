import NavBarTabla from "./NavBarTabla";
import FiltrosTablas from "./FiltrosTabla";
import Tabla from "./tabla";
import FilaTabla from "./FilaTabla";
import Footer from "./Footer";
import Cookies from 'universal-cookie';
import InfoConsultaTabla from "./InfoConsultaTabla";
import axios from "axios";
import Loading from "./Loading";


//<p>{consultas.length === 0 ? <Loading/> : }</p>

import { useState, useEffect } from "react";


export default function PageWrapperTabla(props) {

    const cookies = new Cookies();

    const [buscador, setBuscador] = useState();

    const [filtrosPorTipo, setfiltroPorTipoTributo] = useState();

    const [filtrosPorTipoSolicitu, setfiltroPorTipoSolicitud] = useState();

    const [loading, setLoading] = useState(false);


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

        //        cookies.remove('name', { path: "/" });
        //        cookies.remove('password', { path: "/" });

        window.location.href = './login';

    }

    /*

        const permiso = () => {

            if (!cookies.get('nombre_usuario')) {

                window.location.href = "./";

            }

        }

    */

    const [consultas, setConsultas] = useState([]);
    let filasConsultas;

    useEffect(() => {

        verificacion();
        //permiso();
        cargarConsultasUsuarios();

    }, []);

    const cargarConsultasUsuarios = async () => {

        setLoading(true);

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

        verificacion();

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


    //METODO QUE VERIFICA EL TOKEN 

    //aplication => storage

    const verificacion = async () => {

        const token = document.cookie.replace("token=", "")

        //pruebaTokenInternOusuario
        //const request = await fetch('http://localhost:4000/pruebaToken',

        const request = await fetch('http://localhost:4000/pruebaTokenInternOusuario', {
            //credentials: 'include',
            method: 'POST',
            headers: {
                'authorization': token
            }
        }).then((res) => res.json()).then(data => {
            console.log(data);
            console.log(data.msg);

            if (data.msg === "NO AUTORIZADO") {

                window.location.href = "./login";

            }else if(data.msg === "USUARIO"){

                window.location.href = "./consulta-online/" + data.user.nombre_usuario;
                console.log("sos usuario")

            }else if(data.msg === "INTERNO"){

                //window.location.href = "./login";
                console.log("sos interno")
                
            }else{

                window.location.href = "./login";
                console.log("desconozco tu rol")

            }
        
        })

    }

    //+'/'+filtrosPorTipo+'/'+filtrosPorTipoSolicitu+''


    const cargarConsultasUsuariosFiltrada = async (buscadorcuit) => {

        verificacion();

        let url = 'http://localhost:4000/atencion-online/consultas/' + buscadorcuit;

        console.log(buscadorcuit);

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            }

        });

        let json = await consulta.json();

        console.log(json);

        setConsultas(json);

    }





    const datafixed = {

        id: 1,
        id_solicitud: 11111,
        tipo_solicitud: "#",
        caracter: "#",
        tipo_doc: 111111,
        documento: 111111,
        apellido: "#",
        nombre: "#",
        usuario: "#",
        ip: "#",
        fecha_mov: "#",
        cuit: "#",
        email: "#",
        telefono: 111111,
        estado: "#"

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

                            <div className="input-group mb-3">
                                <label htmlFor="">Filtrar por Tributo </label>
                                <select className="form-select" onChange={filtro1} id="inputGroupSelect03" aria-label="Example select with button addon">
                                    <option selected value="0">CISCA</option>
                                    <option value="1">CISI</option>
                                    <option value="2">Publicidad y Propaganda</option>
                                    <option value="3">TEM</option>
                                    <option value="4">Todos</option>
                                </select>
                            </div>

                            <div className="input-group mb-3">
                                <label htmlFor="">Filtrar por tipo de Solicitud </label>
                                <select className="form-select" onChange={filtro2} id="inputGroupSelect03" aria-label="Example select with button addon">
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

                                        <button className="btn btn-primary border" onClick={() => cargarConsultasUsuariosFiltrada(buscador)}>Buscar</button>
                                        <button className="btn btn-primary border border-start" onClick={() => cargarConsultasUsuarios()}>Actualizar</button>

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