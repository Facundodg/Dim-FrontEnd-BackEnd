import Footer from "./Footer";
import TablaConsulta from "./TablaConsulta";
import FilasConsulta from "./FilasConsulta";
import { useState, useEffect } from "react";
import { renderMatches, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import io, { Socket } from "socket.io-client";
import Loading from "./Loading";
import FormMensaje from "./FormMensaje";

const socket = io("http://localhost:4001");

export default function PageWrapperConsulta(props) {

    const tributosVista = {

        1: "T.E.M",
        2: "CICI",
        3: "Publicidad y Propaganda",
        4: "CISCA",
        5: "Todos"

    }

    //-------------------HOOKS------------------------------------------

    const params = useParams(); //me permite sacar contenido de las url
    const [usuario, setUsuario] = useState([]); //hook del usuario logueado en ese momento
    const [filtrosPorTributo, setfiltrosPorTributo] = useState("0");
    const [filtrosPorMotivo, setfiltrosPorMotivo] = useState("0");
    const [consultas, setConsultas] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [dia, setDia] = useState();
    const [tributosPermisos, setTributosPermisos] = useState([]);

    useEffect(() => {

        verificacion();
        // ConsultasPorUsuario();
        // ConsultaUsuarioActivo();

        let date = new Date();
        let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        setDia(output);

        setInterval(() => {

            ConsultasPorUsuario();

        }, 60000);

    }, []);

    //---------------------EVENTOS DE HOOKS------------------------------

    const tributo = function (evento) {

        setfiltrosPorTributo(evento.target.value)
        console.log(evento.target.value);

    }

    const motivo = function (evento) {

        setfiltrosPorMotivo(evento.target.value)
        console.log(evento.target.value);

    }

    //FUNCION QUE SE ENGARGA DE TOMAR LOS EVENTOS DEL IMPUT Y GUARDARLOS EN LINEA1
    const EscuchaMensaje = function (evento) {

        setMensaje(evento.target.value)
        console.log(evento.target.value);

    }

    //---------------------CONSULTAS------------------------------

    const ConsultasPorUsuario = async (nombreUsuario) => {

        // console.log(props.usuario);

        let filasConsultas;

        let url = 'http://localhost:4000/consultas/' + nombreUsuario + '';

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            }

        });

        let json = await consulta.json();


        // Object.entries(json).map(js => {

        //     filasConsultas = js[1];

        // })

        console.log(json);
        setConsultas(json);

    }

    const ConsultaUsuarioActivo = async (nombreUsuario) => {

        let url = 'http://localhost:4000/usuarios/' + nombreUsuario + '';

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            }

        });

        let json = await consulta.json();
        console.log("----------------");
        console.log(json);
        setTributosPermisos(json[0].tributos);
        setUsuario(json[0]);


    }

    const enviarMensaje = async () => {

        if(filtrosPorTributo != "0" && filtrosPorMotivo != "0"){

            if (mensaje.length != 0) {

                let id = (Math.floor(Math.random() * (9999 - 1 + 1)) + 1);
                let idcabecera = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);

                let data = {

                    id: id,
                    idcabecera: idcabecera,
                    mensaje: document.getElementById("campoMensaje").value,
                    motivo: filtrosPorTributo,
                    usuario: usuario.nombre_usuario,
                    ip: '172.20.254.205',
                    fecha_mov: dia,
                    leido: false,
                    token_borrar: '6527',
                    tipoorigen: '6527',
                    fecha_leido: '2020-08-21 10:57:19.821493',
                    usuario_leido: false,
                    privado: false,
                    html: "<p></p>",
                    adjunto: null,
                    interno: false,
                    tipo_adjunto: null,
                    idusuario: null,
                    rol: usuario.rol,
                    img: "https://bootdey.com/img/Content/avatar/avatar7.png"

                }

                let dataSolicitud = {

                    id: id,
                    id_solicitud: idcabecera,
                    tipo_solicitud: filtrosPorTributo,
                    caracter: filtrosPorMotivo,
                    tipo_doc: 9999999999,
                    documento: 9999999999,
                    apellido: 'SALES',
                    nombre: usuario.nombre_usuario,
                    usuario: "",
                    ip: '172.20.254.205',
                    fecha_mov: dia,
                    cuit: usuario.cuit,
                    email: usuario.email,
                    telefono: usuario.telefono,
                    estado: "tr-bg-Novisto",
                    mensaje: 1

                }

                let datainfoSolicitud = {

                    id: id,
                    num_tramite: idcabecera,
                    nombre_contribuyente: "Fravega ",
                    dni: usuario.cuit,
                    razon_social: "FEDERACION, PATRONAL SEGUROS S.A",
                    fecha: dia,
                    cuit_contribuyente: usuario.cuit,
                    apynom: usuario.nombre_usuario

                }

                let dataconsulta = {

                    id: id,
                    usuario: usuario.nombre_usuario,
                    tributo: tributosVista[filtrosPorTributo],
                    padron: usuario.cuit,
                    numConsulta: idcabecera,
                    motivo: filtrosPorMotivo,
                    fecha: dia

                }

                const request_mensaje = await fetch('http://localhost:4000/agregarMensaje', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                console.log("Mensaje Enviado");

                const request_dataSolicitud = await fetch('http://localhost:4000/agregarInfoSolicitud', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataSolicitud)
                });

                console.log("Agregadad InfoSolicitud");

                const request_dataSolicitudParaModal = await fetch('http://localhost:4000/agregarInfoSolicitudParaModal', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datainfoSolicitud)
                });

                console.log("Agregadad InfoSolicitud Para ventana Modal");

                const request_consultas = await fetch('http://localhost:4000/agregarConsulta', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataconsulta)
                });

                console.log("Mostrada Consulta");

                socket.emit("mensaje", true);

                window.location.href = "/consulta-online/chat/" + idcabecera;


            } else {

                alert("Falta Escribir un Mensaje...");

            }

    }else{

        alert("Motivo o Tributo estan faltando...");

    }

    }

    //---------------------VERIFICA TOKEN------------------------------

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

                    console.log("Bienvenido Usuario!!!");
                    ConsultasPorUsuario(data.user.nombre_usuario);
                    ConsultaUsuarioActivo(data.user.nombre_usuario);

                } else if (data.user.rol == "interno") {

                    window.location.href = "/";

                }

            })

        } catch (error) {

            console.log("NO AUTORIZADO PARA ESTAR AQUI");
            window.location.href = "/";

        }

    }

    //ver de que cuente los mensajes NO leidos y que los represente de manera contada en la tabla de solicitudes.
    //hacer de manera contraria de interno a usuario 

    //----------------------------------------------------------------


    return (

        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom" id="menu-var">

                <a className="navbar-brand m-1" href="index.html"><img src="..\img\logo-municipalidad.jpg" width="100px"
                    height="110px" alt="icono" /><span className="text-primary fs-5 fw-bold">Municipalidad San Miguel De
                        Tucuman</span></a>

                <button className="navbar-toggler m-1" type="button" data-bs-toggle="collapse" data-bs-target="#menu"
                    aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse m-1" id="menu">

                    <ul className="navbar-nav">

                        <li key="uniqueId1" className="nav-item">

                            <a className="nav-link" href="#">Sobre Nosotros</a>

                        </li>

                        <li key="uniqueId2" className="nav-item">

                            <a className="nav-link" href="#">Servicios</a>

                        </li>

                        <li key="uniqueId3" className="nav-item">

                            <a className="nav-link" href="#">Direccion</a>

                        </li>

                        <li key="uniqueId4" className="nav-item">

                            <a className="nav-link" href="#">Contacto</a>

                        </li>

                        <li key="uniqueId5" className="nav-item">

                            <a className="nav-link" href="#">Agendar Cita</a>

                        </li>

                    </ul>

                </div>

            </nav>

            {/* <FormMensaje></FormMensaje> */}

            <div className="container w-100 text-center mt-3 mb-3">

                <h1>Consulta Online</h1>

                <div className="container border">

                    <div className="d-flex justify-content-center">

                        {/* https://www.youtube.com/watch?v=3lpVqgLh7vw */}

                        <div className="input-group mt-3 mb-3 ms-3">
                            <select className="form-select" id="inputGroupSelect03" aria-label="Example select with button addon" onChange={tributo}>

                                <option value="0">TRIBUTO</option>

                                {
                                    tributosPermisos.map(numero => {

                                        if (tributosPermisos.length <= Object.values(tributosVista).length) {

                                            return (

                                                <option value={numero}>{tributosVista[numero]}</option>

                                            )

                                        } else {

                                            return (

                                                <option value="-1" className="text-danger">ERROR AL CARGAR LISTADO</option>

                                            )
                                        }

                                    })
                                }

                                {/* ------------------------------------------------ */}

                            </select>
                        </div>

                        <div className="input-group mt-3 mb-3 ms-3 me-3">
                            <select className="form-select" id="inputGroupSelect03" aria-label="Example select with button addon" onChange={motivo}>

                                <option value="0">MOTIVO</option>
                                <option value="1">CONSULTA GENERAL</option>
                                <option value="2">SOLICITUD DE MORATORIA</option>

                            </select>
                        </div>

                        <button onClick={enviarMensaje} className="btn btn-primary ms-3 me-3 mt-3" type="button">Nueva Consulta</button>

                    </div>

                    <div className="input-group mt-3">

                        <label>Mensaje:</label>
                        <textarea className="form-control mb-3" id="campoMensaje" aria-label="With textarea" onChange={EscuchaMensaje}></textarea>

                    </div>

                </div>

            </div>

            <div>

                <section className="main-content">

                    <div className="container">

                        <div className="container text-center">

                            <h1>Consultas Abiertas De {usuario.nombre_usuario}</h1>

                        </div>

                        <div className="container">

                            <TablaConsulta>

                                {consultas.length === 0 ?

                                    <div className="alert alert-primary" id="NoConsulta" role="alert">
                                        Aun No Tienes Consultas Pendientes...
                                    </div>

                                    : ""}

                                {consultas.map(con => {

                                    return (

                                        <FilasConsulta con={con}/>
                                    )

                                })}

                            </TablaConsulta>

                        </div>

                    </div>

                </section>

            </div >

            <Footer></Footer>

        </div >

    )


}