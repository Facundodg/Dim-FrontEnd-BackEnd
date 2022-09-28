export default function TablaConsulta(props) {

    return (

        <table className="table">

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

    )

}