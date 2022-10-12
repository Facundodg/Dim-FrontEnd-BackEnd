export default function InfoConsultaTabla({ data }) {

    console.log(data);
    console.log(data[0]);

    //VERIFICA SI DATA EN UNDEFINED Y SI LO ES LE INGRESA UNOS DATOS GENERICOS PARA QUE EL COMPONENTE NO TIRE ERROR

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

    console.log(data[0]);

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="container text-center modal-title" id="exampleModalLabel"> {data[0].cuit}-{data[0].nombre} -{data[0].tipo_solicitud} </h6>
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

                                <h6>DNI: <span>{data[0].documento}</span></h6>

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