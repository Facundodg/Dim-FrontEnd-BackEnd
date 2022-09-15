import Usuario from './Usuario';
import Interno from './Interno';
import Opciones from './Opciones';
import InfoContribuyente from './InfoContribuyente';
import InfoContribuyenteResumida from './InfoContribuyenteResumida';

export default function PageWrapperChat(props) {

  return (

    <div>

      <Opciones />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="chat_container">
              <div className="job-box">
                <div className="job-box-filter">
                  <div className="row">

                    <InfoContribuyenteResumida

                      consultaN="43422"
                      nombreContribuyente="Garbarino"
                      cuitContribuyente="231232243"
                      razonSocial="FEDERACION, PATRONAL SEGUROS S.A"

                    />

                  </div>

                  <div className="inbox-message">

                    <ul>

                      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Informacion de
                                Contribuyente</h5>
                              <button type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">

                              <InfoContribuyente
                                consultaN="23421"
                                ultimoUsuario="erubio"
                                fechaInicio="21-08-2022"
                                cuitContribuyente="32549242421"
                                razonSocial="FEDERACION, PATRONAL SEGUROS S.A"
                                dniSolicitante="32549242421"
                                apinomSolicitante="TORRES, FERNANDO JAVIER"
                              />

                            </div>
                          </div>
                        </div>
                      </div>


                      {props.children}


                    </ul>

                    <div className="container fixedElement pl-1 pr-5 ">

                      <div className="input-group">
                        <div className="input-group-prepend">

                          <a href="" className="btn btn-outline-secondary" type="button"><img
                            src="img/enviar.png" width="25" height="25" alt="" /></a>
                          <a href="" className="btn btn-outline-secondary" type="button"><img
                            src="img/abrir-documento.png" width="25" height="25" alt="" /></a>

                        </div>
                        <input type="text" className="form-control" placeholder="Escribe Mensaje...."
                          aria-label="" aria-describedby="basic-addon1" />
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )


}