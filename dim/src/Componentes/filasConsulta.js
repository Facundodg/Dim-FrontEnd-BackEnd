import { useNavigate } from "react-router-dom"

export default function FilasConsulta(props) {

    //T.A.C.I.S.
    //0
    //364427
    //Solicitud Moratoria
    //2022-04-05 12:10

    const navigate = useNavigate();

    //ACOMODA LA URL
    function irChat(nroConsulta) {

        let urlCambiada ="/consulta-online/" + props.usuario +"/"+ nroConsulta;

        //window.location.href = urlCambiada;
        console.log(urlCambiada);

        return urlCambiada;

    }

    return (

            <tr>
                <td>
                    <h6 className="mb-0">{props.tributo}</h6>
                </td>
                <td>
                    <h6 className="mb-0">{props.padron}</h6>
                </td>
                <td>
                    <h6 className="mb-0">{props.nroConsulta}</h6>
                </td>
                <td>
                    <h6 className="mb-0">{props.motivo}</h6>
                </td>
                <td>
                    <h6 className="mb-0">{props.fecha}</h6>
                </td>

                <td>
                    <div className="user-info__img">
                        <a href="#" className="btn btn-success" onClick={() =>navigate(irChat(props.nroConsulta))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                        </svg></a>
                    </div>
                </td>
            </tr>

    )

}

