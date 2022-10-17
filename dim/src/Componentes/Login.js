import Footer from "./Footer"
import { useState, useEffect } from "react";
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
            // limpiarErrores();

        } else {

            setRegistrarte(true);
            console.log(registrate);
            // limpiarErrores();
        }

    }

    const data = {

        name: linea1,
        password: linea2

    }

    //------------------------------REGISTRARTE-----------------------------------

    //https://www.youtube.com/watch?v=EYpdEYK25Dc&t=12s

    const usuarioRegistrar = {

        nombre: "",
        apellido: "",
        dni: "",
        correo: "",
        telefono: "",
        contraseña: "",
        contraseñaConfirmar: ""

    };

    const [formValues, setFormValues] = useState(usuarioRegistrar);
    const [formErrors, setFormErrors] = useState({});
    // const [isSubmit, setIsSubmit] = useState();

    const ingresoValoresFormulario = (e) => {

        console.log(formErrors);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
        setFormErrors(validate(formValues));
        

    }

    const validate = (values) => {

        const errors = {};

        errors.nombre = validarNombre(values.nombre);
        errors.correo = validarCorreo(values.correo);
        errors.dni = validarDniCuit(values.dni);
        errors.telefono = validarTelefono(values.telefono);
        errors.contraseña = validarContraseña(values.contraseña);
        errors.contraseñaConfirmar = validarContraseña(values.contraseñaConfirmar);

        return errors;

        console.log(errors.nombre);
        console.log(errors.correo);
        console.log(errors.dni);
        console.log(errors.telefono);

    }

    function validarNombre(nombre) {

        if (nombre) {

            return false;

        } else {

            return true;

        }

    }

    function validarCorreo(correo) {

        var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        var validar = expReg.test(correo);

        if (validar) {

            return false;

        } else {

            return true;

        }

    }

    function validarDniCuit(dni){

        if(dni.length === 7 ){

            return false;

        }else{

            return true;

        }

    }
    
    function validarTelefono(telefono){

        if(telefono.length === 9){

            return false;

        }else{

            return true;

        }

    }

    function validarContraseña(contraseña){

        if(contraseña.length >=5){

            return false;

        }else{

            return true;

        }

    }

//------------------------------------------------------
//--              HACER CAMBIO EN CASA                --
//------------------------------------------------------

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

    const registra = async (errores,data) =>{

        if(errores.nombre == false &&
        errores.correo == false &&
        errores.dni === false && 
        errores.telefono == false &&
        errores.contraseña == false &&
        errores.contraseñaConfirmar == false){

            console.log(errores);
            console.log(data);
            alert("ME REGISTRE CON EXITO");

        }else{

            alert("FALTAN DATOS PARA REGISTRARTE");

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
                                    aria-describedby="inputGroup-sizing-sm" name="nombre" value={usuarioRegistrar.nombreR} onChange={ingresoValoresFormulario} />
                                {/* onChange={nombre} */}

                            </div>

                            {formErrors.nombre ? <p className="text-danger">Ingrese Nombre</p> : ""}

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Apellido</span>
                                <input type="text" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="apellido" value={usuarioRegistrar.apellidoR} onChange={ingresoValoresFormulario} />
                                {/* onChange={apellido} */}

                            </div>

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">DNI/CUIT</span>
                                <input type="number" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="dni" value={usuarioRegistrar.dniR} onChange={ingresoValoresFormulario} />
                                {/* onChange={dni} */}

                            </div>
                            {formErrors.dni ? <p className="text-danger">Ingrese CUIT/DNI</p> : ""}
                            {/* {dniCuitValido ? <p className="text-danger">DNI No valido</p> : ""} */}

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Correo</span>
                                <input type="text" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="correo" value={usuarioRegistrar.correoR} onChange={ingresoValoresFormulario} />

                                {/* onChange={correo}  */}

                            </div>

                            {formErrors.correo ? <p className="text-danger">Ingrese Correo</p> : ""}
                            {/* {correoValido ? <p className="text-danger">Correo No valido</p> : ""} */}

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Telefono</span>
                                <input type="number" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="telefono" value={usuarioRegistrar.telefonoR} onChange={ingresoValoresFormulario} />
                                {/* onChange={telefono} */}

                            </div>

                            {formErrors.telefono ? <p className="text-danger">Ingrese Telefono</p> : ""}

                            {/* {telefonoValido ? <p className="text-danger">Telefono no Valido</p> : ""} */}

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Contraseña</span>
                                <input type="password" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="contraseña" value={usuarioRegistrar.contraseñaR} onChange={ingresoValoresFormulario} />
                                {/* onChange={contraseñaR} */}

                            </div>

                            {formErrors.contraseña ? <p className="text-danger">Contraseña Muy Corta</p> : ""}

                            <div className="input-group input-group-sm mb-3">

                                <span className="input-group-text" id="inputGroup-sizing-sm">Confirmar Contraseña</span>
                                <input type="password" className="form-control" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm" name="contraseñaConfirmar" value={usuarioRegistrar.contraseñaConfirmarR} onChange={ingresoValoresFormulario} />
                                {/* onChange={contraseñaRConfirmar}  */}

                            </div>

                            {formErrors.contraseñaConfirmar ? <p className="text-danger">Contraseña Muy Corta</p> : ""}

                            <div className="input-group mb-3 d-flex justify-content-center">

                                {/* onClick={() => registraUsuario()} */}

                                <button href="#" className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => registra(formErrors,formValues)}>Registrarte</button>
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