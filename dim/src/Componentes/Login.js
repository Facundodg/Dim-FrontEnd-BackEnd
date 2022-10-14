import Footer from "./Footer"
import { useState } from "react";
import axios from "axios";
import md5 from "md5";
import Cookies from 'universal-cookie';

export default function Login(props) {

    const [linea1, setUsuario] = useState(""); //USESTATE DE USUARIO 
    const [linea2, setContraseña] = useState("");//USESTATE DE CONTRASEÑA
    const [registrate, setRegistrarte] = useState(true) //BOOLEANO QUE SE ENCARGA DE MOSTRAR EL FORMULARIO

    //FUNCION QUE SE ENGARGA DE TOMAR LOS EVENTOS DEL IMPUT Y GUARDARLOS EN LINEA1
    const usuario = function (evento) {

        setUsuario(evento.target.value)
        console.log(evento.target.value);

    }

    //FUNCION QUE SE ENGARGA DE TOMAR LOS EVENTOS DEL IMPUT Y GUARDARLOS EN LINEA2
    const contrasena = function (evento) {

        setContraseña(evento.target.value)
        console.log(evento.target.value);

    }

    function registrarte() {

        if (registrate) {

            setRegistrarte(false);
            console.log(registrate);
            limpiarErrores();

        } else {

            setRegistrarte(true);
            console.log(registrate);
            limpiarErrores();
        }

    }

    const data = {

        name: linea1,
        password: linea2

    }

    //------------------------------REGISTRARTE-----------------------------------

    const [nombreRegistro, setNombreRegistro] = useState(""); //
    const [apellidoRegistro, setApellidoRegistro] = useState("");//
    const [dniRegistro, setDniRegistro] = useState(""); //
    const [correoRegistro, setCorreoRegistro] = useState("");//
    const [telefonoRegistro, setTelefonoRegistro] = useState("");//
    const [contraseñaRegistro, setContraseñaRegistro] = useState("");//
    const [contraseñaRegistroConfirmar, setContraseñaRegistroConfirmar] = useState("");//

    //----------------------------------------------------------------------------

    const [correoValido, setCorreoValido] = useState(false);
    const [dniCuitValido, setdniCuitValido] = useState(false);
    const [telefonoValido, settelefonoValido] = useState(false);


    //-----------------------EVENTOS HOOKS REGISTRARTE----------------------------

    const nombre = function (evento) {

        setNombreRegistro(evento.target.value)
        console.log(evento.target.value);

    }

    const apellido = function (evento) {

        setApellidoRegistro(evento.target.value)
        console.log(evento.target.value);

    }
    const dni = function (evento) {

        setDniRegistro(evento.target.value)
        console.log(evento.target.value);

    }

    const correo = function (evento) {

        setCorreoRegistro(evento.target.value)
        console.log(evento.target.value);

    }

    const telefono = function (evento) {

        setTelefonoRegistro(evento.target.value)
        console.log(evento.target.value);

    }

    const contraseñaR = function (evento) {

        setContraseñaRegistro(evento.target.value)
        console.log(evento.target.value);

    }
    const contraseñaRConfirmar = function (evento) {

        setContraseñaRegistroConfirmar(evento.target.value)
        console.log(evento.target.value);

    }


    //registraUsuario
    const registraUsuario = async () => {

        let id = (Math.floor(Math.random() * (99 - 1 + 1)) + 1);

        if (contraseñaRegistro.length != 0 &&
            contraseñaRegistroConfirmar.length != 0 &&
            telefonoRegistro.length != 0 &&
            correoRegistro.length != 0 &&
            dniRegistro.length != 0 &&
            apellidoRegistro.length != 0 &&
            nombreRegistro.length != 0) {

            if (validrDniCut(dniRegistro) &&
                validarTelefono(telefonoRegistro) &&
                validarCorreo(correoRegistro)
            ) {

                if (contraseñaRegistro === contraseñaRegistroConfirmar) {

                    const datos = {

                        id: id,
                        rol: "usuario",
                        nombre_usuario: nombreRegistro + " " + apellidoRegistro,
                        password: contraseñaRegistroConfirmar,
                        email: correoRegistro,
                        cuit: dniRegistro,
                        telefono: telefonoRegistro

                    }

                    console.log(datos);
                    alert("Registrado con Exito");

                } else {

                    alert("Las contraseñas No son Iguales");

                }


            } else {

                console.log("salida:" + dniRegistro);

            }


            // const request = await fetch('/registrar', {

            //     method: 'POST',
            //     headers: {

            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'

            //     },

            //     body: JSON.stringify(datos)

            // });

        } else {

            alert("Falta un Completar Campos...");

        }

    }

    function validarCorreo(correo) {

        var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        var validar = expReg.test(correo);

        if (validar) {

            setCorreoValido(false);
            return validar;

        } else {

            setCorreoValido(true);
            return validar;

        }

    }

    function validrDniCut(dnioCuit) {

        if (dnioCuit.length === 8 || dnioCuit.length === 11) {

            setdniCuitValido(false);
            console.log("entre")
            return false;

        } else {

            setdniCuitValido(true);
            return true;

        }

    }

    function validarTelefono(telefono) {

        console.log("entro ql")

        if (telefono.length === 10) {

            settelefonoValido(false);
            return false;

        } else {

            settelefonoValido(true);
            return true;

        }

    }

    function limpiarErrores(){

        setCorreoValido(false);
        setdniCuitValido(false);
        settelefonoValido(false);
    }


    //https://www.youtube.com/watch?v=wrR9PS4qQcs&t=340s

    //GENERA EL TOKEN AL INICIAR SESION
    //OJO ESTE METODO FETCH ENVIA UN OBJETO CON USUARIO Y CONTRASEÑA

    const login = async () => {

        console.log(data);

        try {

            const request = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: data })
            }).then(res => res.json()).then((cred) => {
                document.cookie = `token=${cred.token}; max-age=${60 * 60}; path=/; samesite=strict`
                console.log(document.cookie);

                verificacion();

            })

        } catch (error) {

            alert("Usuario o Contraseña Incorrecta...");

        }

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

                    // window.location.href = "./consulta-online/" + data.user.nombre_usuario;
                    window.location.href = "./consulta-online";
                    console.log("Bienvenido Al Chat Usuario!!!");

                } else if (data.user.rol == "interno") {

                    // window.location.href = "./atencion-online/" + data.user.nombre_usuario;
                    window.location.href = "./atencion-online";
                    console.log("Bienvenido Al Chat Interno!!!");
                }

            })

        } catch (error) {

            console.log("NO AUTORIZADO PARA ESTAR AQUI");
            window.location.href = "/";

        }

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

            {registrate ?

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
                                <button href="#" className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => registrarte()}>Registrarte</button>

                            </div>

                        </form>

                    </div>

                </div>

                :

                <div className="container d-flex border justify-content-center align-items-center" id="contenedor-ingreso" data-aos="fade-up">

                    <div className="container border border-3" id="formulario-registro">

                        <div className="container w-100 text-center pt-3">

                            <h3>Registrate</h3>

                        </div>

                        <form action="/auth" method="POST">

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Nombre</span>
                                <input type="text" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="user" onChange={nombre} />

                            </div>

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Apellido</span>
                                <input type="text" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="text" onChange={apellido} />

                            </div>

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">DNI/CUIT</span>
                                <input type="number" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="text" onChange={dni} />

                            </div>
                            {dniCuitValido ? <p className="text-danger">DNI No valido</p> : ""}

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Correo</span>
                                <input type="text" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="text" onChange={correo} />

                            </div>
                            {correoValido ? <p className="text-danger">Correo No valido</p> : ""}

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Telefono</span>
                                <input type="number" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="text" onChange={telefono} />

                            </div>

                            {telefonoValido ? <p className="text-danger">Telefono no Valido</p> : ""}

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Contraseña</span>
                                <input type="password" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="text" onChange={contraseñaR} />

                            </div>

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Confirmar Contraseña</span>
                                <input type="password" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="text" onChange={contraseñaRConfirmar} />

                            </div>
                            <div className="input-group mb-3 d-flex justify-content-center">

                                <button href="#" className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => registraUsuario()}>Registrarte</button>
                                <button href="#" className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => registrarte()}>Atras</button>

                            </div>

                        </form>

                    </div>

                </div>

            }

            <Footer />

        </div>
    )

}