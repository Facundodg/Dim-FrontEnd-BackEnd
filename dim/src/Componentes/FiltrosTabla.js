export default function FiltrosTablas(props) {


	return (


		<div className="container text-center">

			<h2 className="border-bottom border-primary">Ventanilla Electronica</h2>

			<div className="container">

				<div className="container d-flex filtros">

					<div className="input-group mb-3 d-block w-100">
						<label htmlFor="">Filtrar por Tributo</label>
						<button className="btn btn-outline-secondary dropdown-toggle" type="button"
							data-bs-toggle="dropdown" aria-expanded="false">Todos</button>
						<ul className="dropdown-menu">
							<li><a className="dropdown-item" href="#">CISCA</a></li>
							<li><a className="dropdown-item" href="#">CISI</a></li>
							<li><a className="dropdown-item" href="#">Publicidad y Propaganda</a></li>
							<li><a className="dropdown-item" href="#">TEM</a></li>
							<li><a className="dropdown-item" href="#">Todos</a></li>
						</ul>
					</div>

					<div className="input-group mb-3 d-block d-block w-100">
						<label htmlFor="">Filtrar por tipo de Solicitud</label>
						<button className="btn btn-outline-secondary dropdown-toggle" type="button"
							data-bs-toggle="dropdown" aria-expanded="false">Todos</button>
						<ul className="dropdown-menu">
							<li><a className="dropdown-item" href="#">Consultas Generales</a></li>
							<li><a className="dropdown-item" href="#">DIM - Comunicacion</a></li>
							<li><a className="dropdown-item" href="#">Seguimiento de Carpetas PFP</a></li>
							<li><a className="dropdown-item" href="#">Solicitud de Empadronamiento</a></li>
							<li><a className="dropdown-item" href="#">Todos</a></li>
							<li><a className="dropdown-item" href="#">Turno General</a></li>
							<li><a className="dropdown-item" href="#">Turno por Expediente</a></li>
						</ul>
					</div>

					<div className="container">

						<div className="input-group">
							<div className="input-group-prepend">

								<button className="btn btn-primary border">Buscar</button>
								<button className="btn btn-primary border border-start">Actualizar</button>

							</div>
							<input type="text" className="form-control" placeholder="CUIT/DNI" aria-label=""
								aria-describedby="basic-addon1" />
						</div>

					</div>

				</div>

			</div>


		</div>


	)


}