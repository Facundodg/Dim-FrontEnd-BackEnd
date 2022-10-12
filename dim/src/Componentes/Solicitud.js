import PageWrapperChat from "./PageWrapperChat"
import Interno from "./Interno"
import Usuario from "./Usuario"
import InfoContribuyenteResumida from "./InfoContribuyenteResumida";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import InfoContribuyente from "./InfoContribuyente";
import Cookies from 'universal-cookie';
import "../Componentes/estilos/style-chat.css"


export default function Solicitud(props) {

    //-----------------------VARIABLES--------------------------------------

    let filasChat;

    //-----------------------HOOKS--------------------------------------

    const [info, setInfo] = useState([]);
    
    const params = useParams();

    useEffect(() => {

        verificacion();
        console.log("params:" + params.id);
        infoConsulta();
        //ConsultaDeUnicoChat();

    }, []);

    console.log(info);

    //-----------------------CONSULTAS--------------------------------------

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

    
    //-------------------------TOKEN-------------------------------------------

    const verificacion = async () => {

        const token = document.cookie.replace("token=", "")

        try {

            const request = await fetch('http://localhost:4000/pruebaTokenInternOusuario', {

                method: 'POST',
                headers: {
                    'authorization': token
                }
            }).then((res) => res.json()).then(data => {
                console.log(data.user.rol);

                if (data.user.rol == "usuario") {

                    console.log("Bienvenido Usuario!!!");

                } else if (data.user.rol == "interno") {

                    console.log("Bienvenido Interno!!!");

                }

            })

        } catch (error) {

            console.log("NO AUTORIZADO PARA ESTAR AQUI");
            window.location.href = "/";

        }

    }
    
    //------------------------------------------------------------------------------

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
