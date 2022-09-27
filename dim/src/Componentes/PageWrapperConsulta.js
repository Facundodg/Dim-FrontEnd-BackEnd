import Footer from "./Footer";

export default function PageWrapperConsulta(props) {

    return (

        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom" id="menu-var">

                <a className="navbar-brand m-1" href="index.html"><img src=".\img\logo-municipalidad.jpg" width="100px"
                    height="110px" alt="icono" /><span className="text-primary fs-5 fw-bold">Municipalidad San Miguel De
                        Tucuman</span></a>

                <button className="navbar-toggler m-1" type="button" data-bs-toggle="collapse" data-bs-target="#menu"
                    aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse m-1" id="menu">

                    <ul className="navbar-nav">

                        <li className="nav-item">

                            <a className="nav-link" href="#">Sobre Nosotros</a>

                        </li>

                        <li className="nav-item">

                            <a className="nav-link" href="#">Servicios</a>

                        </li>

                        <li className="nav-item">

                            <a className="nav-link" href="#">Direccion</a>

                        </li>

                        <li className="nav-item">

                            <a className="nav-link" href="#">Contacto</a>

                        </li>

                        <li className="nav-item">

                            <a className="nav-link" href="#">Agendar Cita</a>

                        </li>

                    </ul>

                </div>

            </nav>

            <div className="container w-100 text-center mt-3 mb-3">

                <h1>Consulta Online</h1>

                <div className="container border">

                    <div className="d-flex justify-content-center">

                        <div className="input-group mt-3 mb-3 ms-3">
                            <select className="form-select" id="inputGroupSelect03" aria-label="Example select with button addon">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                        <div className="input-group mt-3 mb-3 ms-3 me-3">
                            <select className="form-select" id="inputGroupSelect03" aria-label="Example select with button addon">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                        <button className="btn btn-primary ms-3 me-3 mt-3" type="button">Nueva Consulta</button>

                    </div>

                    <div className="input-group mt-3">

                        <label>Mensaje:</label>
                        <textarea className="form-control mb-3" aria-label="With textarea"></textarea>

                    </div>

                </div>

            </div>

            <div>

                <section class="main-content">

                    <div class="container">

                        <div class="container text-center">

                            <h1>Consultas Abiertas</h1>

                        </div>

                        <table class="table">

                            <thead>

                                <tr>
                                    <th>Tributo</th>
                                    <th>Padron</th>
                                    <th>Nro de Consulta</th>
                                    <th>Motivo</th>
                                    <th>Fecha</th>
                                </tr>

                            </thead>

                            <tbody>

                        
                                {props.children}

                            

                            </tbody>

                        </table>

                    </div>

                </section>

            </div >

            <Footer></Footer>

        </div >

    )


}