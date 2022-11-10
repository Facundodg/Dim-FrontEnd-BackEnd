//------------------COMPONENTES--------------------------------------
import Usuario from './Usuario';
import Interno from './Interno';
import InternoInvertido from "./InternoInvertido";
import UsuarioInvertido from "./UsuarioInvertido";
import Opciones from './Opciones';
import InfoContribuyente from './InfoContribuyente';
import InfoContribuyenteResumida from './InfoContribuyenteResumida';
import Herramientas from "./Herramientas";
import Privado from "./Privado";

//-------------------HOOKS------------------------------------------

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import io, { Socket } from "socket.io-client";

//---------------PARTES DEL SOCKET---------------------------------

const socket = io("http://localhost:4001");

//----------------------------------------------------------------- (NO SEGURO / SE TIENE QUE CAMBIAR / SACAR PARAMS)

export default function PageWrapperChat(props) {

  //-------------------------HOOKS EN USO----------------------------------

  const params = useParams(); //me permite sacar contenido de las url

  const [chats, setChat] = useState([]); //hook del chat

  const [usuario, setUsuario] = useState([]); //hook del usuario logueado en ese momento

  const [dia, setDia] = useState();

  const [mensajePrivado, setMensajePrivado] = useState(false);

  useEffect(() => {

    verificacion();
    ConsultaDeUnicoChat();
    // ConsultaUsuarioActivo();

    // setInterval(() => {

    //   verificacion();

    // }, 10000);

    // window.scroll(0, 100000000000000);

    let date = new Date();
    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    setDia(output);

  }, []);


  //----------------------EVENTO------------------------------

  const mensajePrivadoEvento = function (evento) {

    if (evento.target.value === "false") {

      setMensajePrivado(true);

    } else {

      setMensajePrivado(false);

    }

    console.log(mensajePrivado);

  }

  //---------------------------------------------------------------

  //CAMBIAR YA QUE TRABAJA CON PARAMS (NO SEGURO / SE TIENE QUE CAMBIAR / SACAR PARAMS)
  const ConsultaUsuarioActivo = async (nombreUsuario) => {

    let url = 'http://localhost:4000/usuarios/' + nombreUsuario + '';

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

  //CONSULTA QUE TRAE UNA UNICA CHARLA
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
    window.scrollTo( 0, 969);
  }

  //METODO QUE SE ENCARGA DE ENVIAR EL MENSAJE (NO SEGURO / SE TIENE QUE CAMBIAR / SACAR PARAMS)
  const EnviarMensaje = async () => {

    // verificacion();

    const imput = document.getElementById("campoMensaje").value

    if (imput.length != 0) {

      const data = {

        id: 29,
        idcabecera: params.id,
        mensaje: document.getElementById("campoMensaje").value,
        motivo: '1',
        usuario: usuario.nombre_usuario,
        ip: '172.20.254.205',
        fecha_mov: dia,
        leido: true,
        token_borrar: '6527',
        tipoorigen: '6527',
        fecha_leido: '2020-08-21',
        usuario_leido: 'false',
        privado: mensajePrivado,
        html: null,
        adjunto: null,
        interno: true,
        tipo_adjunto: null,
        idusuario: null,
        rol: usuario.rol,
        img: "https://bootdey.com/img/Content/avatar/avatar7.png"

      }


      console.log("------------------------------------")
      console.log(data)
      console.log("------------------------------------")


      enviarMensaje(data);

      //EMISOR DEL SOCKET 
      socket.emit("chat", document.getElementById("campoMensaje").value);
      document.getElementById("campoMensaje").value = "";
      refrescarToken();

    } else {

      alert("Se Produjo un Problema a la Hora de Enviar el Mensaje....");

    }

  }

  //RECEPTOR DE EL SOCKET (REVISAR SI ES QUE ES NECESARIO EL CAMBIO)
  socket.on("chat", (msg) => {

    ConsultaDeUnicoChat();

  })

  //METODO QUE SE ENCARGA DE ENVIAR MENSAJE A LA BD
  const enviarMensaje = async (data) => {

    const request = await fetch('http://localhost:4000/agregarMensaje', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

  }

  //METODO QUE VERIFICA EL TOCKEN Y EL TIPO DE USUARIO
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

          console.log("Bienvenido Al Chat Usuario!!!");
          console.log(data.user.nombre_usuario);
          ConsultaUsuarioActivo(data.user.nombre_usuario);

        } else if (data.user.rol == "interno") {

          console.log("Bienvenido Al Chat Interno!!!");
          ConsultaUsuarioActivo(data.user.nombre_usuario);
          console.log(data.user.nombre_usuario);
        }

      })

    } catch (error) {

      console.log("NO AUTORIZADO PARA ESTAR AQUI");
      window.location.href = "/";

    }

  }

  //METODO PARA REFRESCAR EL TOKEN
  const refrescarToken = async () => {

    const token = document.cookie.replace("token=", "")

    try {

        const request = await fetch('http://localhost:4000/refreshtoken', {

            method: 'POST',
            headers: {
                'authorization': token
            }
        }).then((res) => res.json()).then(data => {

            console.log("===================================================")
            console.log("REFRESQUE BIEN");
            console.log("===================================================")

            console.log(data.mensaje);
        })

    } catch (error) {

        console.log("NO SE PUDO REFRESCAR CORRECTAMENTE");

    }

}

  //{EnviarMensaje() === true ? <Usuario mensaje="hola perro" /> : ""}

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

                      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
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

                      <div className="modal fade" id="herramientas" tabIndex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Herramientas</h5>
                              <button type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">

                              <Herramientas
                                consultaN={props.consultaN}
                                ultimoUsuario="pedro"
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

                      <div className="modal fade" id="infoPlanDePago" tabIndex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Informacion Plan de Pago</h5>
                              <button type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">

                              <div className="row">

                                <div className="form-group col-md-6">

                                  <div className="form-group mt-0" align="left"><label className="control-label mb-0"> Capital: </label><input className="form-control ng-pristine ng-valid ng-not-empty ng-touched" type="number" float-todos="" string-to-number="" ng-model="datos.infoPFPCapital" ng-blur="" /><span className="help-block ng-binding ng-hide" ng-hide="!errores.infoPFPCapital"></span></div>

                                </div>
                                <div className="form-group col-md-6">

                                  <div className="form-group mt-0" align="left"><label className="control-label mb-0"> Intereses: </label><input className="form-control ng-pristine ng-untouched ng-valid ng-not-empty" type="number" float-todos="" string-to-number="" ng-model="datos.infoPFPIntereses" ng-blur="" /><span className="help-block ng-binding ng-hide" ng-hide="!errores.infoPFPIntereses"></span></div>

                                </div>

                              </div>

                              <div className="row pt-3">

                                <div className="col-md-12">

                                  <button className="btn btn-primary btn-block">Enviar</button>

                                </div>

                              </div>

                            </div>
                          </div>
                        </div>
                      </div>

                      {chats.length === 0 ?

                        // <div className="alert alert-danger" id="NoConsulta" role="alert">
                        //   Nose Encontraron Mensajes...
                        // </div>

                        <Privado
                        mensaje={"No se Encontraron Mensajes..."}
                      />

                        : ""}

                      {Object.entries(chats).map(js => {


                        let filasChat = js[1];
                        console.log(filasChat);

                        if (filasChat.rol == "usuario" && usuario.rol == "interno") {

                          return (

                            <Usuario
                              img={filasChat.img}
                              nombre={filasChat.usuario}
                              rol={filasChat.rol}
                              fecha={filasChat.fecha_mov}
                              mensaje={filasChat.mensaje}
                            />

                          )

                        } else if (filasChat.rol == "interno" && usuario.rol == "interno" && filasChat.privado) {

                          return (

                            <Privado
                              img={filasChat.img}
                              nombre={filasChat.usuario + "(PRIVADO)"}
                              rol={filasChat.rol}
                              fecha={filasChat.fecha_mov}
                              mensaje={filasChat.mensaje}
                            />

                          )

                        } else if (filasChat.rol == "interno" && usuario.rol == "interno") {

                          return (

                            <Interno
                              img={filasChat.img}
                              nombre={filasChat.usuario}
                              rol={filasChat.rol}
                              fecha={filasChat.fecha_mov}
                              mensaje={filasChat.mensaje}
                            />

                          )

                        } else if (filasChat.rol == "usuario" && usuario.rol == "usuario" && filasChat.privado == false) {


                          return (

                            <UsuarioInvertido
                              img={filasChat.img}
                              nombre={filasChat.usuario}
                              rol={filasChat.rol}
                              fecha={filasChat.fecha_mov}
                              mensaje={filasChat.mensaje}
                            />

                          )

                        } else if (filasChat.rol == "interno" && usuario.rol == "usuario" && filasChat.privado == false) {

                          return (

                            <InternoInvertido
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

                          <a className="btn btn-outline-secondary" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive-fill" viewBox="0 0 16 16">
                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                          </svg></a>
                          <a onClick={EnviarMensaje} className="btn btn-outline-secondary" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                          </svg></a>

                          {usuario.rol == "interno" ?

                            <input className="form-check-input" type="checkbox" value={mensajePrivado} id="defaultCheck1" onChange={mensajePrivadoEvento} />

                            : ""}

                        </div>
                        <input type="text" id="campoMensaje" className="form-control" placeholder="Escribe Mensaje...."
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