import Usuario from './Usuario';
import Interno from './Interno';
import Opciones from './Opciones';
import InfoContribuyente from './InfoContribuyente';
import InfoContribuyenteResumida from './InfoContribuyenteResumida';
import { useState, useEffect } from "react";

export default function PageWrapperChat(props) {

  const [chats, setChat] = useState([]);

  useEffect(() => {

    ConsultaDeUnicoChat();

  }, []);

  const ConsultaDeUnicoChat = async () => {

    let url = 'http://localhost:4000/chat/' + props.data + '';

    let consulta = await fetch(url, {

      " method ": ' GET ',
      " headers ": {
        " Accept ": ' application/json ',
        " Content-Type ": ' application/json ',
      }

    });

    let json = await consulta.json();
    console.log(json);
    setChat(json);

  }


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

                    {props.children}

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


                      {Object.entries(chats).map(js => {


                        let filasChat = js[1];
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