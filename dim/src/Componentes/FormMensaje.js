import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";


const socket = io("http://localhost:4001");

export default function FormMensaje(props) {

    console.log(props.rol.rol);

    
    const tributosVista = {

        1: "T.E.M",
        2: "CICI",
        3: "Publicidad y Propaganda",
        4: "CISCA",
        5: "Todos"

    }

    //----------------------------HOOKS----------------------------------------

    const [btnVisable, setbtnVisable] = useState(true);
    const [filtrosPorTributo, setfiltrosPorTributo] = useState(0);
    const [filtrosPorMotivo, setfiltrosPorMotivo] = useState(0);
    const [consultas, setConsultas] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [dia, setDia] = useState("");
    const [usuarioCuit, setCuitUsuario] = useState("");

    // console.log("BTN VISABLE:" + props.btnVisable);


    useEffect(() => {

        let date = new Date();
        let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        setDia(output);


    }, []);


    //----------------------------EVENTOS--------------------------------------


    const tributo = function (evento) {

        setfiltrosPorTributo(evento.target.value)
        console.log(evento.target.value);

    }

    const motivo = function (evento) {

        setfiltrosPorMotivo(evento.target.value)
        console.log(evento.target.value);

    }

    const cuit = function (evento) {

        setCuitUsuario(evento.target.value)
        console.log(evento.target.value);

    }

    //------------------------METODOS------------------------------

    const mensajeEvento = function (evento) {

        setMensaje(evento.target.value)

        if (mensaje.length >= 10 && filtrosPorTributo != 0 && filtrosPorMotivo != 0) {

            setbtnVisable(false);
            console.log(btnVisable);

        } else {

            setbtnVisable(true);
            console.log(btnVisable);

        }

    }


    //------------------------CONSULTAS------------------------------

    const enviarMensaje = async () => {

        if (props.rol.rol == "interno") {

            if (document.getElementById("campoMensaje").value.length != 0 && document.getElementById("campoCuit").value.length > 2
                && filtrosPorTributo != 0 && filtrosPorMotivo != 0) {

                let id = (Math.floor(Math.random() * (9999 - 1 + 1)) + 1);
                let idcabecera = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);

                let data = {

                    id: id,
                    idcabecera: idcabecera,
                    mensaje: document.getElementById("campoMensaje").value,
                    motivo: '1',
                    usuario: props.rol.nombre_usuario,
                    ip: '172.20.254.205',
                    fecha_mov: dia,
                    leido: true,
                    token_borrar: '6527',
                    tipoorigen: '6527',
                    fecha_leido: '2020-08-21 10:57:19.821493',
                    usuario_leido: 'false',
                    privado: false,
                    html: null,
                    adjunto: null,
                    interno: true,
                    tipo_adjunto: null,
                    idusuario: null,
                    rol: props.rol.rol,
                    img: "https://bootdey.com/img/Content/avatar/avatar7.png"

                }

                let dataSolicitud = {

                    id: id,
                    id_solicitud: idcabecera,
                    tipo_solicitud: filtrosPorMotivo,
                    caracter: '5',
                    tipo_doc: 9999999999,
                    documento: 9999999999,
                    apellido: 'SALES',
                    nombre: document.getElementById("campoCuit").value,
                    usuario: props.rol.nombre_usuario,
                    ip: '172.20.254.205',
                    fecha_mov: dia,
                    cuit: props.rol.cuit,
                    email: props.rol.email,
                    telefono: props.rol.telefono,
                    estado: "tr-bg-visto"

                }

                let datainfoSolicitud = {

                    id: id,
                    num_tramite: idcabecera,
                    nombre_contribuyente: "Fravega ",
                    dni: "aqui va cuit de contribuyente",
                    razon_social: "FEDERACION, PATRONAL SEGUROS S.A",
                    fecha: dia,
                    cuit_contribuyente: "llenar con cuit_contribuyente",
                    apynom: document.getElementById("campoCuit").value

                }

                let dataconsulta = {

                    id: id,
                    usuario: document.getElementById("campoCuit").value,
                    tributo: filtrosPorTributo,
                    padron: "llenar con usuario.cuit",
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

                // socket.emit("mensaje", true);

                // window.location.href = "./" + props.rol.user.nombre_usuario + "/" + idcabecera;

                window.location.href = "/atencion-online/chat/" + idcabecera;

                socket.emit("mensaje", true);


            } else {

                alert("Te estan Faltando datos para hacer esta operacion...");

            }

        } else if (props.rol.rol == "usuario") {

            if (document.getElementById("campoMensaje").value.length != 0 && filtrosPorTributo != 0 && filtrosPorMotivo != 0) {

                let id = (Math.floor(Math.random() * (9999 - 1 + 1)) + 1);
                let idcabecera = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);

                let data = {

                    id: id,
                    idcabecera: idcabecera,
                    mensaje: document.getElementById("campoMensaje").value,
                    motivo: '1',
                    usuario: props.rol.nombre_usuario,
                    ip: '172.20.254.205',
                    fecha_mov: dia,
                    leido: true,
                    token_borrar: '6527',
                    tipoorigen: '6527',
                    fecha_leido: '2020-08-21 10:57:19.821493',
                    usuario_leido: 'false',
                    privado: false,
                    html: null,
                    adjunto: null,
                    interno: true,
                    tipo_adjunto: null,
                    idusuario: null,
                    rol: props.rol.rol,
                    img: "https://bootdey.com/img/Content/avatar/avatar7.png"

                }

                let dataSolicitud = {

                    id: id,
                    id_solicitud: idcabecera,
                    tipo_solicitud: filtrosPorMotivo,
                    caracter: '5',
                    tipo_doc: 9999999999,
                    documento: 9999999999,
                    apellido: 'SALES',
                    nombre: props.rol.nombre_usuario,
                    usuario: props.rol.nombre_usuario,
                    ip: '172.20.254.205',
                    fecha_mov: dia,
                    cuit: props.rol.cuit,
                    email: "llenar con email",
                    telefono: "llenar con telefono",
                    estado: "tr-bg-visto"

                }

                let datainfoSolicitud = {

                    id: id,
                    num_tramite: idcabecera,
                    nombre_contribuyente: "Fravega ",
                    dni: "12312312313",
                    razon_social: "FEDERACION, PATRONAL SEGUROS S.A",
                    fecha: dia,
                    cuit_contribuyente: "llenar con cuit_contribuyente",
                    apynom: ""

                }

                let dataconsulta = {

                    id: id,
                    usuario: "",
                    tributo: "T.E.M",
                    padron: "usuario.cuit",
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

                // socket.emit("mensaje", true);

                // window.location.href = "./" + props.rol.user.nombre_usuario + "/" + idcabecera;

                window.location.href = "/consulta-online/chat/" + idcabecera;

                socket.emit("mensaje", true);


            } else {

                alert("Te estan Faltando datos para hacer esta operacion...");

            }

        }

    }


    //---------------------------------------------------------------

    console.log("PRUEBA DE ROL:")
    console.log(props.rol.rol)

    return (

        // data-aos="fade-up"

        <div className="container w-100 text-center mt-3 mb-3" data-aos="fade-up">

            <div className="container border">

                <div className="d-flex justify-content-center">

                    <div className="input-group mt-3 mb-3 ms-3">
                        <select onChange={tributo} className="form-select" id="inputGroupSelect03" aria-label="Example select with button addon">

                            <option value="0">TRIBUTO</option>
                            <option value="1">T.E.M</option>
                            <option value="2">CISI</option>
                            <option value="3">Publicidad y Propaganda</option>
                            <option value="4">CISCA</option>
                            <option value="5">Todos</option>

                        </select>
                    </div>

                    <div className="input-group mt-3 mb-3 ms-3 me-3">
                        <select onChange={motivo} className="form-select" id="inputGroupSelect03" aria-label="Example select with button addon" >
                            <option value="0">MOTIVO</option>
                            <option value="1">CONSULTA GENERAL</option>
                            <option value="2">SOLICITUD DE MORATORIA</option>

                        </select>
                    </div>

                    <button disabled={btnVisable} onClick={enviarMensaje} className="btn btn-primary ms-3 me-3 mt-3" type="button">Nueva Consulta</button>

                </div>

                {props.rol.rol == "interno" ?

                    <div className="input-group mt-3">

                        <label className="pt-3 pe-3">DNI/CUIT: </label>
                        <input onChage={cuit} id="campoCuit" type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    </div>

                    : ""}

                <div className="input-group mt-3">

                    <label className="pe-3">Mensaje: </label>
                    <textarea onChange={mensajeEvento} className="form-control mb-3" id="campoMensaje" aria-label="With textarea" ></textarea>

                </div>

            </div>

        </div>


    )

}