import PageWrapperChat from "./PageWrapperChat"
import Interno from "./Interno"
import Usuario from "./Usuario"
import MensajeJson from "../mensajes.json"
import {useState} from "react";

export default function Chat(props) {

    let personas = MensajeJson;

    const buscarChat = async () => {

        let url = "http://localhost:4000/chat";

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            }

        });

        let json = await consulta.json();

        return json;

    }

    buscarChat();

    

    return (

        <PageWrapperChat>

            {personas.map(persona => {

                if (persona.rol == "Usuario") {

                    return (

                        <Usuario
                            img={persona.img}
                            nombre={persona.nombre}
                            rol={persona.rol}
                            fecha={persona.fecha}
                            mensaje={persona.mensaje}
                        />

                    )

                } else if (persona.rol == "Interno") {

                    return (

                        <Interno
                            img={persona.img}
                            nombre={persona.nombre}
                            rol={persona.rol}
                            fecha={persona.fecha}
                            mensaje={persona.mensaje}
                        />

                    )

                }


            })}

        </PageWrapperChat>


    )

}