import PageWrapperChat from "./PageWrapperChat"
import Interno from "./Interno"
import Usuario from "./Usuario"
import MensajeJson from "../mensajes.json"
import { useState } from "react";

export default function Chat(props) {

    const [chats, setChat] = useState([]);

    //let personas = MensajeJson;

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
        setChat(json);

    }

    return (

        <PageWrapperChat>

            <button onClick={buscarChat}>apreto</button>

            {Object.entries(chats).map(chat => {

                chat[1].map(ch => {

                    console.log(ch);

                    if (ch.rol == "usuario") {

                        return (

                            <Usuario
                                img={ch.img}
                                nombre={ch.usuario}
                                rol={ch.rol}
                                fecha={ch.fecha_mov}
                                mensaje={ch.mensaje}
                            />

                        )

                    } else if (ch.rol == "interno") {

                        return (

                            <Interno
                                img={ch.img}
                                nombre={ch.usuario}
                                rol={ch.rol}
                                fecha={ch.fecha_mov}
                                mensaje={ch.mensaje}
                            />

                        )

                    }

                })

            })}

        </PageWrapperChat>

    )

}