import Usuario from './Usuario';
import Interno from './Interno';
import Opciones from './Opciones';
import InfoContribuyente from './InfoContribuyente';
import InfoContribuyenteResumida from './InfoContribuyenteResumida';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:4001");

export default function PageWrapperChat(props) {

  const params = useParams(); //me permite sacar contenido de las url

  const [chats, setChat] = useState([]); //hook del chat

  const [usuario, setUsuario] = useState([]); //hook del usuario logueado en ese momento

  const [dia, setDia] = useState();

  // const [mensaje, setMensaje] = useState("·");

  // const [mensaje, setMensaje] = useState();

  // const enviar = function (evento) {

  //   setMensaje(evento.target.value)
  //   //console.log(evento.target.value);

  // }


  useEffect(() => {

    verificacion();
    ConsultaDeUnicoChat();
    ConsultaUsuarioActivo();
    // console.log("estoy aqui pelotudo " + params.usuario);
    // window.scroll(0, 100000000000000);

    // setInterval(() => {

    //   verificacion();

    // }, 10000);

    window.scroll(0, 100000000000000);

    let date = new Date();
    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    setDia(output);

  }, []);

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
    console.log("estoy entrando al refresque del chat perroooo");

  }


  const EnviarMensaje = async () => {

    verificacion();

    const imput = document.getElementById("campoMensaje").value

    if (imput.length != 0) {

      console.log("me estoy curtiendo");

      const data = {

        id: 29,
        idcabecera: params.id,
        mensaje: document.getElementById("campoMensaje").value,
        motivo: '1',
        usuario: params.usuario,
        ip: '172.20.254.205',
        fecha_mov: dia,
        leido: true,
        token_borrar: '6527',
        tipoorigen: '6527',
        fecha_leido: '2020-08-21 10:57:19.821493',
        usuario_leido: 'false',
        privado: null,
        html: null,
        adjunto: null,
        interno: true,
        tipo_adjunto: null,
        idusuario: null,
        rol: usuario.rol,
        img: "https://bootdey.com/img/Content/avatar/avatar7.png"

      }

      enviarMensaje(data);

      socket.emit("chat", document.getElementById("campoMensaje").value);
      document.getElementById("campoMensaje").value = "";

    } else {

      alert("Escribe un Mensaje Antes de Mandar...");

    }

  }

  socket.on("chat", (msg) => {

    ConsultaDeUnicoChat();

  })

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

        } else if (data.user.rol == "interno") {

          console.log("Bienvenido Al Chat Interno!!!");
        }

      })

    } catch (error) {

      console.log("NO AUTORIZADO PARA ESTAR AQUI");
      window.location.href = "/";

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