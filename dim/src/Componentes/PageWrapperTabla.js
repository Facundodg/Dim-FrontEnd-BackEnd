import NavBarTabla from "./NavBarTabla"
import FiltrosTablas from "./FiltrosTabla"
import Tabla from "./tabla"
import FilaTabla from "./FilaTabla"
import Footer from "./Footer"

import { useState,useEffect } from "react";


export default function PageWrapperTabla(props) {

    const [consultas, setConsultas] = useState([]);
    let filasConsultas;
    
    useEffect(() =>{

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

            <div>

                <NavBarTabla />

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

        </div>

    )

}