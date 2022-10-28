import InfoConsultaTabla from "./InfoConsultaTabla";
import { useMemo, useState } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom"
import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:4001");

export default function FilaTabla(props) {

    const navigate = useNavigate();

    //ACOMODA LA URL
    function irChat(url) {

        let urlCambiada = "./chat/" + url;
        modificarInfoSolicitud();
        socket.emit("refresqueEstados", true);

        return urlCambiada;

    }

    const modificarInfoSolicitud = async () => {

        let dataSolicitud = {

            id: props.con.id,
            id_solicitud: props.con.id_solicitud,
            tipo_solicitud: props.con.tipo_solicitud, //MOTIVO ES EL TRIBUTO
            caracter: props.con.caracter,
            tipo_doc: 9999999999,
            documento: 9999999999,
            apellido: 'SALES',
            nombre: props.con.nombre,
            usuario: props.InfoInterno.nombre_usuario,
            ip: '172.20.254.205',
            fecha_mov: '2018-10-05 13:36:00.663964',
            cuit: props.con.cuit,
            email: props.con.email,
            telefono: props.con.telefono,
            estado: "tr-bg-visto",
            mensaje: 0

        }

        const request_dataSolicitud = await fetch('http://localhost:4000/modificarInfoSolicitud/' + props.con.id_solicitud, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSolicitud)
        });


    }

    const tributosVista = {

        1: "T.E.M",
        2: "CICI",
        3: "Publicidad y Propaganda",
        4: "CISCA",
        5: "Todos"

    }

    return (

        // data-aos="fade-up"

        <tr className={props.con.estado}>

            <td>
                <h6 className="mb-0">{props.con.nombre}</h6>
            </td>

            <td>
                <h6 className="mb-0">{props.con.cuit}</h6>
            </td>

            <td>

                {/* <h6 className="mb-0">{props.con.tipo_solicitud}</h6> */}
                <h6 className="mb-0">{tributosVista[props.con.tipo_solicitud]}</h6>
            </td>

            <td>
                <div className="container">

                    <div className="notify">

                        <a href="#" onClick={() => navigate(irChat(props.con.id_solicitud))}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                fill="currentColor" className="bi bi-chat-right-text-fill" viewBox="0 0 16 16">
                                <path
                                    d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h6a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
                            </svg>
                            <p>{props.con.mensaje}</p>
                        </a>

                    </div>

                </div>

            </td>

            <td>

                <a href="" onClick={() => props.cargarUsuario(props.con.cuit)} data-toggle="modal" data-target="#exampleModal"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg></a>

            </td>

            <td>
                <div className="dropdown open">
                    <a href="#!" className="px-2" id="triggerId1" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-ellipsis-v text-dark"></i>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="triggerId1">
                        <a className="dropdown-item" href="#"><i className="fa fa-pencil mr-1"></i> Editar</a>
                        <a className="dropdown-item text-danger" href="#"><i className="fa fa-trash mr-1"></i>
                            Borrar</a>
                    </div>
                </div>
            </td>

        </tr>

    )

}

