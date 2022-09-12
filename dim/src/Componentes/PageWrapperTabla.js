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

                <NavBarTabla />
                <button onClick={cerrarSesion}>Cerrar Sesión</button>

            </div>

            <div className="container d-flex justify-content-center align-items-center mt-3" id="filtros">

                <FiltrosTablas />

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