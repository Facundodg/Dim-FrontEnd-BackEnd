export default function InicioSesion(props) {

    return (
        <div>

            <div className="container d-flex justify-content-center align-items-center border" id="contenedor-informacion">

                <h2>INFORMACION</h2>

            </div>


            <div className="container d-flex border justify-content-center align-items-center" id="contenedor-ingreso">

                <div className="container border border-3" id="formulario">

                    <div className="container w-100 text-center pt-3">

                        <h3>Formulario</h3>

                    </div>

                    <div className="input-group input-group-sm mb-3">

                        <span className="input-group-text" id="inputGroup-sizing-sm">Usuario</span>
                        <input type="text" className="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"/>

                    </div>

                    <div className="input-group input-group-sm mb-3">

                        <span className="input-group-text" id="inputGroup-sizing-sm">Contraseña</span>
                        <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>

                    </div>

                    <div className="input-group mb-3 d-flex justify-content-center">

                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Inicio Sesion</button>

                    </div>

                </div>

            </div>
        </div>
    )

}