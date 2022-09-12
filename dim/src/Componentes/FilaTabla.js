export default function FilaTabla(props) {

    //carga los usuarios cuando se apreta el ojo en la fila de la tabla

    const cargarUsuario = async (cuit) => {

        let url = 'http://localhost:4000/atencion-online/usuario/' + cuit + '';

        console.log(cuit);

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

    return (

        <tr className={props.estado} data-aos="fade-up">

                <td>
                    <h6 className="mb-0">{props.apyNom}</h6>
                </td>

                <td>
                    <h6 className="mb-0">{props.cuit}</h6>
                </td>

                <td>
                    <h6 className="mb-0">{props.razonConsulta}</h6>
                </td>

                <td>
                    <div className="container">

                        <div className="notify">

                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                fill="currentColor" className="bi bi-chat-right-text-fill" viewBox="0 0 16 16">
                                <path
                                    d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h6a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
                            </svg>

                        </div>

                    </div>

                </td>

                <td>

                    <a href="" onClick={()=>cargarUsuario(props.cuit)} data-toggle="modal" data-target="#exampleModal"><img src="img/ver.png" alt=""
                        width="25px" height="25px" /></a>
                </td>

                <td>
                    <div className="dropdown open">
                        <a href="#!" className="px-2" id="triggerId1" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-ellipsis-v text-dark"></i>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="triggerId1">
                            <a className="dropdown-item" href="#"><i className="fa fa-pencil mr-1"></i> Editar</a>
                            <a className="dropdown-item text-danger" href="#"><i className="fa fa-trash mr-1"></i>
                                Borrar</a>
                        </div>
                    </div>
                </td>

        </tr>

    )

}

