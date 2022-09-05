export default function InfoContribuyente(props){

    return(
 
        <div className="col-md-12 col-sm-6 d-block w-100">

        <div className="container titulo">

          <h2 className="">CONSULTA-N SOLICITUD {props.consultaN}</h2>

        </div>

        <div className="container w-100 d-flex justify-content-center">

          <h5 className="w-50">Operador Anterior: <br /><span>{props.ultimoUsuario}</span></h5>
          <h5 className="w-50">Fecha: <br /><span>{props.fechaInicio}</span></h5>

        </div>

        <div className="container w-100 d-flex justify-content-between border-bottom">


          <div className="input-group mt-3 mb-3 w-50">
            <button type="button" className="btn btn-primary dropdown-toggle w-75"
              data-bs-toggle="dropdown">
              Tipo de Solicitud
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">TEM</a></li>
              <li><a className="dropdown-item" href="#">CICI</a></li>
              <li><a className="dropdown-item" href="#">CISCA</a></li>
            </ul>
          </div>

          <div className="input-group mt-3 mb-3 w-50">
            <button type="button" className="btn btn-primary dropdown-toggle w-75"
              data-bs-toggle="dropdown">
              Tributo
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">TEM</a></li>
              <li><a className="dropdown-item" href="#">CICI</a></li>
              <li><a className="dropdown-item" href="#">CISCA</a></li>
            </ul>
          </div>
        </div>

        <div className="container border-bottom">

          <h5>Contribuyente:</h5>
          <h5>CUIT/CUIL: <span>{props.cuitContribuyente}</span></h5>
          <h5>Razon Social: <span>{props.razonSocial}</span></h5>

        </div>

        <div className="container border-bottom">

          <h5>Solicitante:</h5>
          <h5>DNI: <span>{props.dniSolicitante}</span></h5>
          <h5>Apellido y Nombre: <span>{props.apinomSolicitante}</span></h5>

        </div>

        <div className="container w-100 d-flex justify-content-between mt-3">

          <a className="btn btn-primary" href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hammer" viewBox="0 0 16 16">
            <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
          </svg> Herramienta</a>

          <a className="btn btn-success" href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save2-fill" viewBox="0 0 16 16">
            <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v6h-2a.5.5 0 0 0-.354.854l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5A.5.5 0 0 0 10.5 7.5h-2v-6z" />
          </svg> Guardar</a>

          <a className="btn btn-danger" href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg> Cerrar</a>1

        </div>

      </div>

    )

}