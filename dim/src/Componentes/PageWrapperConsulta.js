import Footer from "./Footer";
import TablaConsulta from "./TablaConsulta";
import FilasConsulta from "./FilasConsulta";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"


export default function PageWrapperConsulta(props) {

    const params = useParams(); //me permite sacar contenido de las url

    const [filtrosPorTributo, setfiltrosPorTributo] = useState();
    const [filtrosPorMotivo, setfiltrosPorMotivo] = useState();
    const [consultas, setConsultas] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [dia, setDia] = useState();
    const [usuario, setUsuario] = useState([]); //hook del usuario logueado en ese momento



    const tributo = function (evento) {

        setfiltrosPorTributo(evento.target.value)
        console.log(evento.target.value);

    }

    const motivo = function (evento) {

        setfiltrosPorMotivo(evento.target.value)
        console.log(evento.target.value);

    }

    useEffect(() => {

        verificacion();
        ConsultasPorUsuario();

        ConsultaUsuarioActivo();

        let date = new Date();
        let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        setDia(output);


    }, []);

    //FUNCION QUE SE ENGARGA DE TOMAR LOS EVENTOS DEL IMPUT Y GUARDARLOS EN LINEA1
    const EscuchaMensaje = function (evento) {

        setMensaje(evento.target.value)
        console.log(evento.target.value);

    }

    const ConsultasPorUsuario = async () => {

        console.log(props.usuario);

        let filasConsultas;

        let url = 'http://localhost:4000/consultas/' + props.usuario + '';

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


    const verificacion = async () => {

        const token = document.cookie.replace("token=", "")

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

                window.location.href = "./";

            } else if (data.msg === "USUARIO") {

                //window.location.href = "./consulta-online/" + data.user.nombre_usuario;
                console.log("sos usuario")

            } else if (data.msg === "INTERNO") {

                window.location.href = "./";
                console.log("sos interno")

            } else {

                window.location.href = "./";
                console.log("desconozco tu rol")

            }

        })

    }

    const ConsultaUsuarioActivo = async () => {

        let url = 'http://localhost:4000/usuarios/' + params.usuario + '';

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
        setUsuario(json[0]);

    }

    //Math.random()

    const enviarMensaje = async () => {

        if(mensaje.length != 0){

        let id = (Math.floor(Math.random() * (9999 - 1 + 1)) + 1);
        let idcabecera = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);

        let data = {

            id: id,
            idcabecera: idcabecera,
            mensaje: document.getElementById("campoMensaje").value,
            motivo: '1',
            usuario: params.usuario,
            ip: '172.20.254.205',
            fecha_mov: dia,
            leido: true,
            token_borrar: '6527',
            tipoorigen: '6527',
            fecha_leido: '2020-08-21 10:57:19.821493',
            usuario_leido: 'false',
            privado: null,
            html: null,
            adjunto: null,
            interno: true,
            tipo_adjunto: null,
            idusuario: null,
            rol: usuario.rol,
            img: "https://bootdey.com/img/Content/avatar/avatar7.png"

        }

        let dataSolicitud = {

            id: id,
            id_solicitud: idcabecera,
            tipo_solicitud: "TEM",
            caracter: '5',
            tipo_doc: 9999999999,
            documento: 9999999999,
            apellido: 'SALES',
            nombre: usuario.nombre_usuario,
            usuario: usuario.nombre_usuario,
            ip: '172.20.254.205',
            fecha_mov: dia,
            cuit: usuario.cuit,
            email: usuario.email,
            telefono: usuario.telefono,
            estado: "tr-bg-Novisto"

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
                usuario:usuario.nombre_usuario,
                tributo:"T.E.M",
                padron: usuario.cuit,
                numConsulta: idcabecera,
                motivo: "Solicitud Moratoria",
                fecha:dia
                
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

        window.location.href = "./"+usuario.nombre_usuario+"/"+idcabecera;

    }else{

        alert("Falta Escribir un Mensaje...");

    }

    }


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

            <div className="container w-100 text-center mt-3 mb-3">

                <h1>Consulta Online</h1>

                <div className="container border">

                    <div className="d-flex justify-content-center">

                        <div className="input-group mt-3 mb-3 ms-3">
                            <select className="form-select" id="inputGroupSelect03" aria-label="Example select with button addon" onChange={tributo}>
                                <option value="0">TRIBUTO</option>
                                <option value="1">T.E.M</option>

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

                            <h1>Consultas Abiertas</h1>

                        </div>

                        <div className="container">

                            <TablaConsulta>

                                {consultas.map(con => {

                                    return (

                                        <FilasConsulta

                                            tributo={con.tributo}
                                            padron={con.padron}
                                            nroConsulta={con.numConsulta}
                                            motivo={con.motivo}
                                            fecha={con.fecha}
                                            usuario={props.usuario}

                                        />
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