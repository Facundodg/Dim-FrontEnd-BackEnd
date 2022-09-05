export default function NavBarTabla(props) {

	return (

		<nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom" id="menu-var">

			<a className="navbar-brand m-1" href="index.html"><img src="./img/logo.png" width="100px" height="45px"
				alt="icono" /><span className="text-primary fs-5 fw-bold"></span></a>

			<button className="navbar-toggler m-1" type="button" data-bs-toggle="collapse" data-bs-target="#menu"
				aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse m-1" id="menu">

				<ul className="navbar-nav">

					<li className="nav-item">

						<a className="nav-link" href="#">Aplicaciones</a>

					</li>

					<li className="nav-item">

						<a className="nav-link" href="#">Cambio de Clave</a>

					</li>

					<li className="nav-item">

						<a className="nav-link" href="#">Gestion</a>

					</li>

					<li className="nav-item">

						<a className="nav-link" href="#">Online</a>

					</li>

					<li className="nav-item">

						<a className="nav-link" href="#">Salir</a>

					</li>

				</ul>

			</div>

		</nav>


	)

}