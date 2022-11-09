import Footer from "./Footer"
import { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import Cookies from 'universal-cookie';

export default function Login(props) {

    const [linea1, setUsuario] = useState(""); //USESTATE DE USUARIO 
    const [linea2, setContraseña] = useState("");//USESTATE DE CONTRASEÑA
    const [registrate, setRegistrarte] = useState(true) //BOOLEANO QUE SE ENCARGA DE MOSTRAR EL FORMULARIO

    useEffect(() => {

        setUsuario(document.getElementById("user"));
        setContraseña(document.getElementById("password"));

    }, []);

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
            setFormValues(usuarioRegistrar);
            limpiarErrores();

        } else {

            setRegistrarte(true);
            console.log(registrate);
            setFormValues(usuarioRegistrar);
            limpiarErrores();
        }

    }

    function limpiarErrores() {

        const limpiadoErrores = {

            nombre: false,
            apellido: false,
            dni: false,
            correo: false,
            telefono: false,
            contraseña: false,
            contraseñaConfirmar: false

        };

        setFormErrors(limpiadoErrores);

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
    const [formErrors, setFormErrors] = useState([]);
    // const [isSubmit, setIsSubmit] = useState();

    const ingresoValoresFormulario = (e) => {

        console.log(formErrors);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
        // setFormErrors(validate(formValues));

    }

    const validate = (valores) => {

        console.log("------------valores--------------")
        console.log(valores);
        console.log("----------------------------------")
        const errors = [];

        errors.nombre = validarNombre(valores.nombre);
        errors.apellido = validarApellido(valores.apellido);
        errors.dni = validarDniCuit(valores.dni);
        errors.telefono = validarTelefono(valores.telefono);
        errors.correo = validarCorreo(valores.correo);
        errors.contraseña = validarContraseña(valores.contraseña);
        errors.contraseñaConfirmar = validarContraseñaRepetida(valores.contraseñaConfirmar);

        console.log("-------------errors--------------")
        console.log(errors);
        setFormErrors(errors);
        console.log("----------------------------------")

        return errors;

    }

    function validarNombre(nombre) {

        if (nombre.length > 3) {

            return false;

        } else {

            console.log("enter");
            return true;

        }

    }
    function validarApellido(apellido) {

        if (apellido.length > 3) {

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
    function validarDniCuit(dni) {

        if (dni.length === 8) {

            return false;

        } else {

            return true;

        }

    }
    function validarTelefono(telefono) {

        if (telefono.length === 10) {

            return false;

        } else {

            return true;

        }

    }
    function validarContraseña(contraseña) {

        if (contraseña.length > 4) {

            return false;

        } else {

            return true;

        }

    }
    function validarContraseñaRepetida(contraseña) {

        if (contraseña.length > 4) {

            return false;

        } else {

            return true;

        }

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

    const registra = async (data) => {

        console.log("------------------data------------------");
        console.log(data);
        console.log("------------------------------------------");
        
        console.log("------------------validate------------------");
        console.log(validate(data));
        console.log("------------------------------------------");
        
        console.log("------------------formErrors------------------");
        console.log(formErrors);
        console.log("------------------------------------------");
        
        console.log(data.contraseña)
        console.log(data.contraseñaConfirmar)

        if (formErrors.nombre == false && formErrors.apellido == false && formErrors.dni == false
            && formErrors.correo == false && formErrors.telefono == false && formErrors.contraseña == false && formErrors.contraseñaConfirmar == false) {

            if (data.contraseña === data.contraseñaConfirmar && data.contraseña.length > 3 && data.contraseñaConfirmar.length > 3) {

                let id = (Math.floor(Math.random() * (9999 - 1 + 1)) + 1);

                const dataSubir = {

                    id: id,
                    rol: "usuario",
                    nombre_usuario: data.nombre + " " + data.apellido,
                    password: data.contraseña,
                    email: data.correo,
                    cuit: data.dni,
                    telefono: data.telefono,
                    tributos: [1, 2, 3, 4, 5]

                }

                try {

                    const request = await fetch('http://localhost:4000/registrar', {

                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataSubir)

                    });

                    console.log(dataSubir);
                    alert("ME REGISTRESTE CON EXITO!!!");
                    setFormValues(usuarioRegistrar);
                    setRegistrarte(true);

                } catch (error) {

                    alert("Problemas a la hora de Registrarte...");

                }

            } else {

                console.log(data.contraseña.length);
                console.log(data.contraseñaConfirmar.length);

                alert("No son Iguales las Constraseñas o Es muy corta.");

            }

        }else{

            alert("Te estan Faltandos datos...");

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

                // data-aos="fade-up"

                <div className="container d-flex border justify-content-center align-items-center" id="contenedor-ingreso">

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

                <div className="container d-flex border justify-content-center align-items-center" id="contenedor-ingreso">

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

                            {formErrors.apellido ? <p className="text-danger">Ingrese Apellido</p> : ""}

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

                                <button href="#" className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => registra(formValues)}>Registrarte</button>
                                <button href="#" className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => registrarte()}>Atras</button>

                            </div>

                        </form>

                    </div>

                </div>

            }

            {/* <pre>

                {JSON.stringify(formValues, null, 2)}

            </pre> */}

            <Footer />

        </div>
    )

}