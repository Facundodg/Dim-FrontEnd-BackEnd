export default function FilaPruebas(props) {

    return (

            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.mes}</td>
                <td>{props.data.apellido}</td>
                <td>{props.data.mail}</td>
                <td>{props.data.telefono}</td>
            </tr>
   
        )    

}