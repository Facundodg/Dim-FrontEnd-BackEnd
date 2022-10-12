import NavBarTabla from "./NavBarTabla";
import FiltrosTablas from "./FiltrosTabla";
import Tabla from "./tabla";
import FilaTabla from "./FilaTabla";
import Footer from "./Footer";
import Cookies from 'universal-cookie';
import InfoConsultaTabla from "./InfoConsultaTabla";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom"
import "../Componentes/estilos/style-tabla.css"
import io, { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import FormMensaje from "./FormMensaje";

const socket = io("http://localhost:4001");

//<p>{consultas.length === 0 ? <Loading/> : }</p>

export default function PageWrapperTabla(props) {

    //-----------------------OBJETOS------------------------------------------


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

    let filasConsultas;

    //-------------------HOOKS------------------------------------------
    const params = useParams();

    const cookies = new Cookies();

    const [buscador, setBuscador] = useState();

    const [filtrosPorTipo, setfiltroPorTipoTributo] = useState();

    const [filtrosPorTipoSolicitu, setfiltroPorTipoSolicitud] = useState();

    const [loading, setLoading] = useState(false);

    const [ticket, setTicket] = useState(false);

    const [InfoInterno, setInfoInterno] = useState([]);

    const [consultas, setConsultas] = useState([]);

    const [data, setData] = useState(datafixed)

    useEffect(() => {

        verificacion();
        //permiso();
        cargarConsultasUsuarios();

    }, []);


    //-------------------EVENTOS DE LOS HOOKS--------------------------

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

    //------------------------LOGICA APARTE---------------------------------------


    //aqui va la veririficacion de la cookie
    const cerrarSesion = () => {

        // document.cookies = ('name', { path: "/" });
        // document.cookies = ('password', { path: "/" });

        // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // // window.location.href = '/';

    }

    function generarUnTicket(ticket) {

        if (ticket) {

            setTicket(false);

        } else {

            setTicket(true);

        }

    }


    //----------------------CONSULTAS-------------------------------------------

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

    const cargarConsultasUsuariosFiltrada = async (buscadorcuit, filtrosPorTipo, filtrosPorTipoSolicitu) => {

        verificacion();

        let url = 'http://localhost:4000/atencion-online/consultas/' + buscadorcuit + '/' + filtrosPorTipo + '/' + filtrosPorTipoSolicitu;

        console.log(buscadorcuit);

        try {

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

        } catch (error) {

            alert("No se Encontro consulta con ese Cuit");

        }

    }


    //----------------------VERIFICA TOKEN-------------------------------------

    const verificacion = async () => {

        const token = document.cookie.replace("token=", "")

        try {

            const request = await fetch('http://localhost:4000/pruebaTokenInternOusuario', {

                method: 'POST',
                headers: {
                    'authorization': token
                }
            }).then((res) => res.json()).then(data => {
                console.log(data.user.rol);

                if (data.user.rol == "usuario") {

                    window.location.href = "/";

                } else if (data.user.rol == "interno") {

                    console.log("Bienvenido Interno!!!");
                    setInfoInterno(data);

                }

            })

        } catch (error) {

            console.log("NO AUTORIZADO PARA ESTAR AQUI");
            window.location.href = "/";

        }

    }

    //----------------------SOCKET-------------------------------------

    socket.on("mensaje", (msg) => {

        if (msg) {

            cargarConsultasUsuarios();

        }

    })

    return (

        <div>

            <InfoConsultaTabla data={data} />

            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom" id="menu-var">

                    <a className="navbar-brand m-1" href="#">
                        <img src={require('./img/logo.png')} width="100px" height="45px" alt="icono" /><span className="text-primary fs-5 fw-bold"></span></a>

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

                                <a onClick={() => cerrarSesion()} className="nav-link" href="#">Salir</a>

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
                                <label className="pe-3 pt-2" htmlFor="">Filtrar por Tributo</label>
                                <select className="form-select" onChange={filtro1} id="inputGroupSelect03" >
                                    <option selected value="0">CISCA</option>
                                    <option value="1">CISI</option>
                                    <option value="2">Publicidad y Propaganda</option>
                                    <option value="3">TEM</option>
                                    <option value="4">Todos</option>
                                </select>
                            </div>

                            <div className="input-group mb-3">
                                <label className="pe-3 pt-2" htmlFor="">Filtrar por tipo de Solicitud </label>
                                <select className="form-select" onChange={filtro2} id="inputGroupSelect03">
                                    <option selected value="0">Consultas Generales</option>
                                    <option value="1">DIM - Comu nicacion</option>
                                    <option value="2">Seguimiento de Carpetas PFP</option>
                                    <option value="3">Solicitud de Empadronamiento</option>
                                    <option value="4">Todos</option>
                                    <option value="5">Turno General</option>
                                    <option value="6">Turno por Expediente</option>

                                </select>
                            </div>

                            <div className="container mb-3">

                                <div className="input-group">
                                    <div className="input-group-prepend">

                                        <button className="btn btn-primary border" onClick={() => cargarConsultasUsuariosFiltrada(buscador, filtrosPorTipo, filtrosPorTipoSolicitu)}>Buscar</button>
                                        <button className="btn btn-primary border border-start" onClick={() => cargarConsultasUsuarios()}>Actualizar</button>
                                        <button className="btn btn-primary border border-start" onClick={() => generarUnTicket(ticket)}>Generar Ticket</button>
                                    </div>
                                    <input type="text" className="form-control" placeholder="CUIT/DNI" aria-label=""
                                        aria-describedby="basic-addon1" onChange={busca} />
                                </div>

                            </div>
                            {/* 
                            <div className="container d-flex justify-content-center w-100 border">
                            </div> */}

                            {ticket ? <FormMensaje rol={InfoInterno} /> : ""}

                        </div>

                    </div>


                </div>

            </div>

            <section className="main-content">

                <div className="container">

                    <Tabla>


                        {consultas.length === 0 ? <Loading /> : ""}

                        {consultas.map(con => {

                            return (

                                // usuario={params.usuario}

                                <FilaTabla con={con} setData={setData} cargarUsuario={cargarUsuario}

                                // id={con.id}
                                // apyNom={con.nombre}
                                // cuit={con.cuit}
                                // razonConsulta={con.tipo_solicitud}
                                // estado={con.estado}
                                // id_solicitud={con.id_solicitud}
                                // setData={setData}
                                // cargarUsuario={cargarUsuario}
                                // usuario={params.usuario}

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