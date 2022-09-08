export default function Footer() {

    return (

        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    <svg className="bi" width="30" height="24">
                        <use link="#" href="#bootstrap" />
                    </svg>
                </a>
                <span className="mb-3 mb-md-0 text-muted">(C) 2022 Subdireccion de Informatica | Direccion de Ingresos Municipales
                    Municipalidad de San Miguel de Tucuman</span>
            </div>

        </footer>

    )

}