import Footer from "./Footer"
import { useState } from "react";
import axios from "axios";
import md5 from "md5";
import Cookies from 'universal-cookie';


export default function Login(props) {

    const [linea1, setUsuario] = useState();
    const [linea2, setContraseña] = useState();

    const usuario = function (evento) {

        setUsuario(evento.target.value)
        console.log(evento.target.value);

    }

    const contrasena = function (evento) {

        setContraseña(evento.target.value)
        console.log(evento.target.value);

    }

    const data = {

        name: linea1,
        password: linea2

    }

    //https://www.youtube.com/watch?v=wrR9PS4qQcs&t=340s

    const login = async () => {

        const request = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: data })
        }).then(res => res.json()).then((cred) => {
            document.cookie = `token=${cred.token}; max-age=${60 * 3}; path=/; samesite=strict`
            console.log(document.cookie);
            window.location.href = "./atencion-online";
        })

    }















    /*
    
    
        const login = async () => {
    
            console.log("entre");
    
            let url = 'http://localhost:4000/login';
    
            let consulta = await fetch(url, {
    
                " method ": ' POST ',
                " headers ": {
                    " Content-Type ": ' application/json ',
                },
                body: JSON.stringify({ user: data })
    
            }).then(res => res.json()).then((cred) => {
                document.cookie = `token=${cred.token}; max-age=${60 * 3}; path=/; samesite=strict`
                console.log(document.cookie);
            })
        }
    
        */

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

                            <button href="#" className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => login()}>Ingresar</button>

                        </div>

                    </form>

                </div>

            </div>

            <Footer />

        </div>
    )

}