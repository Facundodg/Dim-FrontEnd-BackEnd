export default function Consulta(props) {

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

                                <tr>
                                    <td>
                                        <h6 class="mb-0">T.A.C.I.S.</h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0">0</h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0">364427</h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0">Solicitud Moratoria</h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0">2022-04-05 12:10</h6>
                                    </td>

                                    <td>
                                        <div class="user-info__img">
                                            <a class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                            </svg></a>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h6 class="mb-0">T.A.C.I.S.</h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0">0</h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0">364427</h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0">Solicitud Moratoria</h6>
                                    </td>
                                    <td>
                                        <h6 class="mb-0">2022-04-05 12:10</h6>
                                    </td>

                                    <td>
                                        <div class="user-info__img">
                                            <a class="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-x-fill" viewBox="0 0 16 16">
                                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z" />
                                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-4.854-1.354a.5.5 0 0 0 0 .708l.647.646-.647.646a.5.5 0 0 0 .708.708l.646-.647.646.647a.5.5 0 0 0 .708-.708l-.647-.646.647-.646a.5.5 0 0 0-.708-.708l-.646.647-.646-.647a.5.5 0 0 0-.708 0Z" />
                                            </svg>
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </section>

            </div >

        </div >

    );


}
