import Usuario from './Usuario';
import Interno from './Interno';
import Opciones from './Opciones';
import InfoContribuyente from './InfoContribuyente';
import InfoContribuyenteResumida from './InfoContribuyenteResumida';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import io, { Socket } from "socket.io-client";

export default function PageWrapperChat(props) {

  const socket = io("http://localhost:4001");

  const params = useParams();

  const [chats, setChat] = useState([]);

  const [usuario, setUsuario] = useState([]);

  const [mensaje, setMensaje] = useState();

  const enviar = function (evento) {

    setMensaje(evento.target.value)
    console.log(evento.target.value);

  }


  useEffect(() => {


    ConsultaDeUnicoChat();
    ConsultaUsuarioActivo();
    console.log("estoy aqui pelotudo " + params.usuario);

  }, []);

  ///consultas/:usuario

  const ConsultaUsuarioActivo = async () => {

    let url = 'http://localhost:4000/usuarios/' + params.usuario + '';

    let consulta = await fetch(url, {

      " method ": ' GET ',
      " headers ": {
        " Accept ": ' application/json ',
        " Content-Type ": ' application/json ',
      }

    });

    let json = await consulta.json();
    console.log("----------------");
    console.log(json);
    setUsuario(json[0]);

  }

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

  function EnviarMensaje() {

    socket.emit("chat", mensaje);

    return true;

  }

  socket.on("chat", (msg) => {

    console.log(msg);

  })

  return (

    <div>

      {usuario.rol == "interno" ? <Opciones /> : ""}

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
                                consultaN={props.consultaN}
                                ultimoUsuario="facundo"
                                fechaInicio={props.fecha}
                                cuitContribuyente={props.cuitContribuyente}
                                razonSocial={props.razon_social}
                                dniSolicitante={props.dniUsuario}
                                apinomSolicitante={props.razonSocial}
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

                      { EnviarMensaje()===true ? <Usuario mensaje="hola perro"/>:  ""}

                    </ul>

                    <div className="container fixedElement pl-1 pr-5 ">

                      <div className="input-group">
                        <div className="input-group-prepend">

                          <a className="btn btn-outline-secondary" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive-fill" viewBox="0 0 16 16">
                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                          </svg></a>
                          <a onClick={EnviarMensaje} className="btn btn-outline-secondary" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                          </svg></a>

                        </div>
                        <input type="text" className="form-control" placeholder="Escribe Mensaje...."
                          aria-label="" aria-describedby="basic-addon1" onChange={enviar} />
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