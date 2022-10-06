import PageWrapperConsulta from "./PageWrapperConsulta";
import { useParams } from "react-router-dom"

export default function Consulta(props) {

    const params = useParams();

    return (

        <PageWrapperConsulta usuario = {params.usuario}>

            

        </PageWrapperConsulta>

    );

}
