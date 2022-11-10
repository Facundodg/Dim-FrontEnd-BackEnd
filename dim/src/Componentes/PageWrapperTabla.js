import NavBarTabla from "./NavBarTabla";
import FiltrosTablas from "./FiltrosTabla";
import Tabla from "./Tabla";
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

    const [consultasTiempo, setConsultasTiempo] = useState([]);

    const [filasConsultasTiempo, setFilasConsultasTiempo] = useState([]);

    const [data, setData] = useState(datafixed);

    const [tributosPermisos, setTributosPermisos] = useState([]);

    const [horaActual, setHoraActual] = useState("");

    useEffect(() => {

        verificacion();
        cargarConsultasUsuarios();

        var today = new Date();

        var now = today.toLocaleString();
        
        setHoraActual(now);

    }, []);

    setInterval(() => {

        cargarConsultasUsuariosVerificarTiempo();

        var today = new Date();

        var now = today.toLocaleString();
        
        setHoraActual(now);

        console.log(now);
      
    }, 3600000);

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

    const cerrarSesion = () => {

        document.cookie.split(";").forEach(function (c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        window.location.href = '/';

    }

    function generarUnTicket(ticket) {

        if (ticket) {

            setTicket(false);

        } else {

            setTicket(true);

        }

    }

    //----------------------CONSULTAS-------------------------------------------

    const cargarConsultasUsuariosVerificarTiempo = async () => {

        let filasConsultasT;

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

                filasConsultasT = js[1];

            })
        }

        setFilasConsultasTiempo(filasConsultasT);

    }

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

        ConsultasTiempo(filasConsultas)
        setConsultas(filasConsultas);

    }

    function ConsultasTiempo(filas) {

        var today = new Date();

        // obtener la fecha y la hora
        var now = today.toLocaleString();

        console.log(filas);

        let filasTiempos = [];

        let i = 0;

        console.log("--pruebas--");

        filas.map(fila =>{

            //========================================================
            //REVISAR EN CASA-----------------------------------------
            //========================================================

            if(fila.fecha_mov == "1/11/2022, 8:45:34"){

                console.log("perro mono");

            }

            filasTiempos[i] = fila.fecha_mov;

            i++;

        })

        console.log(filasTiempos);

    }

    const cargarUsuario = async (id) => {

        verificacion();

        let url = 'http://localhost:4000/atencion-online/usuario/' + id + '';

        console.log(id);

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            }

        });

        let json = await consulta.json();

        console.log(json);
        
        refrescarToken();

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

    const tributosVista = {

        1: "T.E.M",
        2: "CICI",
        3: "PYP",
        4: "CISCA",
        5: "Todos"

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

                    console.log(data.user);

                    console.log("Bienvenido Interno!!!");
                    setTributosPermisos(data.user.tributos);
                    setInfoInterno(data.user);

                }

            })

        } catch (error) {

            console.log("NO AUTORIZADO PARA ESTAR AQUI");
            window.location.href = "/";

        }

    }

    
    //----------------------REFRESCA TOKEN-------------------------------------

    const refrescarToken = async () => {

        const token = document.cookie.replace("token=", "")

        try {

            const request = await fetch('http://localhost:4000/refreshtoken', {

                method: 'POST',
                headers: {
                    'authorization': token
                }
            }).then((res) => res.json()).then(data => {

                console.log("===================================================")
                console.log("REFRESQUE BIEN");
                console.log("===================================================")

                console.log(data.mensaje);
            })

        } catch (error) {

            console.log("NO SE PUDO REFRESCAR CORRECTAMENTE");

        }

    }

    //----------------------SOCKET-------------------------------------

    socket.on("mensaje", (msg) => {

        if (msg) {

            cargarConsultasUsuarios();

        }

    })

    socket.on("refresqueEstados", (msg) => {

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

                                    <option value="0">TRIBUTO</option>

                                    {
                                        tributosPermisos.map(numero => {

                                            return (

                                                <option value={numero}>{tributosVista[numero]}</option>

                                            )

                                        })
                                    }

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

                            {ticket ? <FormMensaje rol={InfoInterno}/> : ""}

                        </div>

                    </div>


                </div>

            </div>

            <section className="main-content">

                <div className="container">

                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item border" role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                                type="button" role="tab" aria-controls="pills-home" aria-selected="true">Tabla Principal</button>
                        </li>
                        <li className="nav-item border" role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
                                type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Mis Consultas atendidas</button>
                        </li>

                    </ul>

                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                            <Tabla>

                                {consultas.length === 0 ? <Loading /> : ""}

                                {consultas.map(con => {

                                    if (con.usuario != InfoInterno.nombre_usuario) {


                                        if (con.usuario == "") {

                                            return (

                                                <FilaTabla con={con} InfoInterno={InfoInterno} setData={setData} cargarUsuario={cargarUsuario} />

                                            )

                                        } else {

                                            return (

                                                <FilaTabla con={con} InfoInterno={InfoInterno} setData={setData} cargarUsuario={cargarUsuario} desactive="not-active text-secondary" />

                                            )

                                        }


                                    }

                                })

                                }

                            </Tabla>

                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                            <Tabla>

                                {consultas.length === 0 ? <Loading /> : ""}

                                {consultas.map(con => {

                                    // && con.fecha_mov < horaActual

                                    if (con.usuario == InfoInterno.nombre_usuario) {

                                        return (

                                            <FilaTabla con={con} InfoInterno={InfoInterno} setData={setData} cargarUsuario={cargarUsuario} />

                                        )

                                    }

                                })}

                            </Tabla>

                        </div>

                    </div>

                </div>

            </section>

            <div className="container">

                <Footer></Footer>

            </div>

        </div >

    )

}