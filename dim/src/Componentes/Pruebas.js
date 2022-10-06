import FilaPruebas from "./FilaPruebas"
import TablaPrueba from "./TablaPrueba"

export default function Pruebas(props) {

    const data = {

        id:"2",
        mes:"1",
        apellido:"diaz",
        mail:"facundo_dg",
        telefono:"asefasd"

    }
    // const elementos = {
    // }
        
    // const elementos = {
    //     mes:[(id, value)],
    // }

    return(

        <TablaPrueba>

            <FilaPruebas data = {data}/>

        </TablaPrueba>

    )


}