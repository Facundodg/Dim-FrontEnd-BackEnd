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

      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse sticky-top opciones">

        <a className="salir" href="" data-toggle="modal" data-target="#exampleModal"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg></a>

        <a className="guardar" href="" data-toggle="modal" data-target="#exampleModal"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-save2-fill" viewBox="0 0 16 16">
          <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v6h-2a.5.5 0 0 0-.354.854l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5A.5.5 0 0 0 10.5 7.5h-2v-6z" />
        </svg></a>

        <a className="herramientas" href="" data-toggle="modal" data-target="#exampleModal"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-hammer" viewBox="0 0 16 16">
          <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
        </svg></a>

        <a className="info" href="" data-toggle="modal" data-target="#exampleModal"><img src=".../img/informacion.png" alt="" width="25px"
          height="25px" /></a>

      </nav>

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
                                consultaN="2312312312312312312"
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