import NavBarTabla from "./NavBarTabla"
import FiltrosTablas from "./FiltrosTabla"
import Tabla from "./tabla"
import FilaTabla from "./FilaTabla"
import consultasJson from "../consultas.json"

export default function PageWrapperTabla(props) {

    let filas = consultasJson;

    return (

        <div>

            <div>

                <NavBarTabla />

            </div>

            <div className="container d-flex justify-content-center align-items-center mt-3" id="filtros">

                <FiltrosTablas />

            </div>

            <section className="main-content">

                <div className="container">

                    <Tabla>

                        {filas.map(fila => {

                            return (
                                <FilaTabla
                                    apyNom={fila.apyNom}
                                    cuit={fila.cuit}
                                    razonConsulta={fila.razonConsulta}
                                    estado={fila.estado}
                                />
                            )

                        })

                        }

                    </Tabla>

                </div>

            </section>

        </div>

    )

}