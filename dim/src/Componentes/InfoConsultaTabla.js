export default function InfoConsultaTabla({data}) {

    //cod de tramite : 32132
    //Nro Solicitud : AB392
    //dni : 23343232234
    //Atendido Por: ptejerizo
    //Solicitante: DIAZ, ARIEL GUSTAVO
    //tramite: T.E.M.
    //fecha: 23/08/2022

    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="container text-center modal-title" id="exampleModalLabel"> - - </h6>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <pre>

                            {JSON.stringify(data, null, 2)}

                        </pre>

                        <div class="container d-block">

                            <div class="d-flex justify-content-between">

                                <h6>Cod de Tramite: <span></span></h6>

                                <h6>Nro Solicitud: <span></span></h6>

                            </div>

                            <div class="d-flex justify-content-between w-100">

                                <h6>DNI: <span></span></h6>

                                <h6>Atendido Por: <span></span></h6>

                            </div>

                            <div>

                                <h6>Solicitante: <span></span></h6>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )

}