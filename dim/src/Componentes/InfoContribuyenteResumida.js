export default function InfoContribuyenteResumida(props) {

    return (

        <div className="container d-block text-center justify-content-center w-100">

            <div>

                <h2>TRAMITE Nº - {props.consultaN}</h2>

            </div>

            <div className="container border-bottom">

                <h5>{props.nombreContribuyente} - {props.cuitContribuyente} - {props.razonSocial}</h5>

            </div>

        </div>

    )

}