import PageWrapperChat from "./PageWrapperChat"
import Interno from "./Interno"
import Usuario from "./Usuario"
import InfoContribuyenteResumida from "./InfoContribuyenteResumida";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import InfoContribuyente from "./InfoContribuyente";


export default function Solicitud(props) {

    //const [chats, setChat] = useState([]);
    const [info, setInfo] = useState([]);

    let filasChat;
    const params = useParams();

    useEffect(() => {

        console.log(params.id);
        infoConsulta();
        //ConsultaDeUnicoChat();

    }, []);

    console.log(info);

    /*

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

    */

    //-----------------------CAMBIAR ESTE FETCH--------------------------------------

    const infoConsulta = async () => {

        console.log(params.id);

        let url = 'http://localhost:4000/solicitud/' + params.id + '';

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            }

        });

        let json = await consulta.json();

        let filas = json[0];

        setInfo(filas);

    }

    //------------------------------------------------------------------------------

    return (

        <PageWrapperChat data={params.id}>

            <div>
                <InfoContribuyenteResumida

                    consultaN={info.num_tramite}
                    nombreContribuyente={info.nombre_contribuyente}
                    cuitContribuyente={info.cuit_contribuyente}
                    razonSocial={info.razon_social}

                />

            </div>

        </PageWrapperChat>

    )

}