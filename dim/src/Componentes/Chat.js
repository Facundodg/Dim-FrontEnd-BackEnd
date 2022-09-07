import PageWrapperChat from "./PageWrapperChat"
import Interno from "./Interno"
import Usuario from "./Usuario"
import { useState,useEffect } from "react";

export default function Chat(props) {

    const [chats, setChat] = useState([]);
    let filasChat;

    useEffect(() =>{

        buscarChat();

    }, []);

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


        {
            Object.entries(json).map(js => {

                filasChat = js[1];

            })
        }


        setChat(filasChat);

    }

    return (

        <PageWrapperChat>

            {chats.map(chat => {

                if (chat.rol == "usuario") {

                    return (

                        <Usuario
                            img={chat.img}
                            nombre={chat.usuario}
                            rol={chat.rol}
                            fecha={chat.fecha_mov}
                            mensaje={chat.mensaje}
                        />

                    )

                } else if (chat.rol == "interno") {

                    return (

                        <Interno
                            img={chat.img}
                            nombre={chat.usuario}
                            rol={chat.rol}
                            fecha={chat.fecha_mov}
                            mensaje={chat.mensaje}
                        />

                    )

                }
            })}

        </PageWrapperChat>

    )

}