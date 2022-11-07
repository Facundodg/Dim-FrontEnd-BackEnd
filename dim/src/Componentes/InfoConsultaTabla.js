export default function InfoConsultaTabla({ data }) {

    const motivoVista = {

        1: "Consulta General",
        2: "Solicitud Moratoria"

    }

    //VERIFICA SI DATA EN UNDEFINED Y SI LO ES LE INGRESA UNOS DATOS GENERICOS PARA QUE EL COMPONENTE NO TIRE ERROR

    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------

    //tipo_solicitud = "MOTIVOS DE CONSULTA OSEA CONSULTA DE MORATORIA O CONSULTA GENERAL"

    if (data[0] === undefined) {

        console.log("esta undefined");

        data=[

                {
                    "id": 1,
                    "id_solicitud": 11111,
                    "tipo_solicitud": "#",
                    "caracter": "#",
                    "tipo_doc": 111111,
                    "documento": 111111,
                    "apellido": "#",
                    "nombre": "#",
                    "usuario": "#",
                    "ip": "#",
                    "fecha_mov": "#",
                    "cuit": "#",
                    "email": "#",
                    "telefono": 111111,
                    "estado": "#"
                }

            ]

        console.log(data);
    
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="container text-center modal-title" id="exampleModalLabel"> {data[0].cuit}-{data[0].nombre}-{motivoVista[data[0].caracter]} </h6>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="container d-block">

                            <div className="d-flex justify-content-between">

                                <h6>Cod de Tramite: <span>{data[0].tipo_doc}</span></h6>

                                <h6>Nro Solicitud: <span>{data[0].id_solicitud}</span></h6>

                            </div>

                            <div className="d-flex justify-content-between w-100">

                                <h6>Fecha de Enviado: <span>{data[0].fecha_mov}</span></h6>

                                <h6>Atendido Por: <span>{data[0].usuario}</span></h6>

                            </div>

                            <div>

                                <h6>Solicitante: <span>{data[0].nombre}</span></h6>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )

}