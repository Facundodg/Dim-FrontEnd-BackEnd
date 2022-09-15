import PageWrapperChat from "./PageWrapperChat"
import Interno from "./Interno"
import Usuario from "./Usuario"
import InfoContribuyenteResumida from "./InfoContribuyenteResumida";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"


export default function Solicitud(props) {

    const [chats, setChat] = useState([]);
    //const [info, setInfo] = useState([]);

    let filasChat;
    const params = useParams();

    useEffect(() => {

        console.log(params.id);
        ConsultaDeUnicoChat();
        //infoConsulta();

    }, []);

    const ConsultaDeUnicoChat = async () => {

        let url = 'http://localhost:4000/chat/' + params.id + '';

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

    /*
    const infoConsulta = async () => {

        let url = 'http://localhost:4000/solicitud/' + params.id + '';

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            }

        });

        let json = await consulta.json();
        setInfo(json);

    }

    */

    return (

        <PageWrapperChat>

            {Object.entries(chats).map(js => {


                filasChat = js[1];
                console.log(filasChat);

                if (filasChat.rol == "usuario") {

                    return (

                        <Usuario
                            img={filasChat.img}
                            nombre={filasChat.usuario}
                            rol={filasChat.rol}
                            fecha={filasChat.fecha_mov}
                            mensaje={filasChat.mensaje}
                        />

                    )

                } else if (filasChat.rol == "interno") {

                    return (

                        <Interno
                            img={filasChat.img}
                            nombre={filasChat.usuario}
                            rol={filasChat.rol}
                            fecha={filasChat.fecha_mov}
                            mensaje={filasChat.mensaje}
                        />

                    )

                }

            })}

        </PageWrapperChat>

    )

}