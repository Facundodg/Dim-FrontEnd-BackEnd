export default function Tabla(props) {

    return (

        <table className="table">

            <thead>
                <tr>
                    <th>Apellido y Nombre</th>
                    <th>Cuit</th>
                    <th>Tipo de Tramite</th>
                    <th>Mensajes</th>
                    <th>Vista</th>
                    <th>Opciones</th>

                </tr>
            </thead>

            <tbody>

                {props.children}

            </tbody>

        </table>

    )

}