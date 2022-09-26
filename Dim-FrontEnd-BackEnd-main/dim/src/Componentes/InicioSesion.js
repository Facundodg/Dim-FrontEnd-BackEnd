import Footer from "./Footer"
import { useState } from "react";
import axios from "axios";
import md5 from "md5";
import Cookies from 'universal-cookie';


const baseUrl = "http://localhost:4000/usuarios/";
const cookies = new Cookies();

export default function InicioSesion(props) {

    const [linea1, setUsuario] = useState();
    const [linea2, setContraseña] = useState();

    let datos ={}


    const usuario = function (evento) {

        setUsuario(evento.target.value)

    }

    const contrasena = function (evento) {

        setContraseña(evento.target.value)

    }

    function mostrar() {

        console.log(linea1);
        console.log(linea2);

    }

    const buscarUsuario = async () => {

        let url = 'http://localhost:4000/usuarios/' + linea1 + '/' + md5(linea2) + '';

        let consulta = await fetch(url, {

            " method ": ' GET ',
            " headers ": {
                " Accept ": ' application/json ',
                " Content-Type ": ' application/json ',
            },
        
        });

        try {

            let json = await consulta.json();
            console.log(json);
            console.log(md5(linea2));
            return json;
            
        } catch (error) {

            alert("Usuario o Contraseña no Validos...")
            
        }
    }

    async function InicioSesionUsuario() {

        let usuario = await buscarUsuario()

            .then(usuario => {

                if (usuario.length > 0) {

                    var usu = usuario[0];
                    console.log(usu.nombre_usuario);
                    console.log(usu.password);
                    
                    if (usu.nombre_usuario == linea1 && usu.password == md5(linea2)) {

                        console.log(usu);
                        cookies.set('id', usu.id, { path: "/" });
                        cookies.set('rol', usu.rol, { path: "/" });
                        cookies.set('nombre_usuario', usu.nombre_usuario, { path: "/" });
                        alert(`Bienvenido ${usu.nombre_usuario}`);
                        window.location.href = "./atencion-online";

                    }else{

                        alert("Usuario o Contraseña erroneas...")

                    }

                } else {

                    alert("No se encontro usuario");

                }
            })


    }

    async function cargar() {

        //lo cambiabos por un metodo fetch luego
        await axios.get(baseUrl, { params: { nombre_usuario: linea1, contraseña_usuario: md5(linea2) } })
            .then(response => {
                console.log(response.data);
                return (response.data);
            })
            .then(response => {
                if (response.length > 0) {

                    var respuesta = response[0];
                    cookies.set('id', respuesta.id, { path: "/" });
                    cookies.set('rol', respuesta.rol, { path: "/" });
                    cookies.set('nombre_usuario', respuesta.nombre_usuario, { path: "/" });
                    alert(`Bienvenido ${respuesta.nombre_usuario}`);
                    //window.location.href="./atencion-online";

                } else {

                    alert("No se encontro usuario");

                }
            })
            .catch(error => {
                console.log(error);
            })


    }




    return (
        <div>

            <div className="container d-flex justify-content-center align-items-center border" id="contenedor-informacion">

                <img src="img/logo.jpg" width="120" height="120"></img>

                <div className="container text-center titulo-dim">

                    <h2>Dirección de Ingresos Municipales</h2>
                    <h5>Municipalidad de San Miguel de Tucumán</h5>

                </div>

            </div>


            <div className="container d-flex border justify-content-center align-items-center" id="contenedor-ingreso" data-aos="fade-up">

                <div className="container border border-3" id="formulario">

                    <div className="container w-100 text-center pt-3">

                        <h3>Inicio de Sesión</h3>

                    </div>

                    <form action="/auth" method="POST">

                        <div className="input-group input-group-sm mb-3">

                            <span className="input-group-text" id="inputGroup-sizing-sm">Usuario</span>
                            <input type="text" className="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm" name="user" onChange={usuario} />

                        </div>

                        <div className="input-group input-group-sm mb-3">

                            <span className="input-group-text" id="inputGroup-sizing-sm">Contraseña</span>
                            <input type="password" className="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm" name="password" onChange={contrasena} />

                        </div>

                        <div className="input-group mb-3 d-flex justify-content-center">

                            <button href="#" className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={InicioSesionUsuario}>Ingresar</button>

                        </div>

                    </form>

                </div>

            </div>

            <Footer />

        </div>
    )

}