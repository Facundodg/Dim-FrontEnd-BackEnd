import PageWrapperChat from "./PageWrapperChat"
import Interno from "./Interno"
import Usuario from "./Usuario"
import InfoContribuyenteResumida from "./InfoContribuyenteResumida";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import InfoContribuyente from "./InfoContribuyente";
import Cookies from 'universal-cookie';


export default function Solicitud(props) {

    const cookies = new Cookies();

    //const [chats, setChat] = useState([]);
    const [info, setInfo] = useState([]);

    let filasChat;
    const params = useParams();

    useEffect(() => {

        verificacion();
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

        verificacion();

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


    //METODO QUE VERIFICA EL TOKEN 

    //aplication => storage

    const verificacion = async () => {

        const token = document.cookie.replace("token=", "")

        const request = await fetch('http://localhost:4000/pruebaToken', {
            //credentials: 'include',
            method: 'POST',
            headers: {
                'authorization': token
            }
        }).then((res) => res.json()).then(data => {
            console.log(data);
            console.log(data.msg);

            if (data.msg === "NO AUTORIZADO") {

                window.location.href = "/login";

            }


        })

    }

    return (

        <PageWrapperChat 
        data={params.id}
        consultaN={info.num_tramite}
        nombreContribuyente={info.nombre_contribuyente}
        cuitContribuyente={info.cuit_contribuyente}
        razonSocial={info.razon_social}
        fecha={info.fecha}
        razon_social={info.razon_social}
        dniUsuario={info.dni}>

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
