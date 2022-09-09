import Footer from "./Footer"
import { useState } from "react";

export default function InicioSesion(props) {

    const [linea1, setUsuario] = useState();
    const [linea2, setContraseña] = useState();


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

                            <button href="inicio-sesion" className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={mostrar}>Ingresar</button>

                        </div>

                    </form>

                </div>

            </div>

            <Footer />

        </div>
    )

}