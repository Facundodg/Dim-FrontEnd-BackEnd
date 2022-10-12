export default function UsuarioInvertido(props) {

    return (

        <li data-aos="fade-left">

            <a href="#">

                <div className="message-avatar-DIM">

                    <img src={props.img} alt="" />

                </div>

                <div className="message-body-DIM">

                    <div className="message-body-heading-DIM">

                        <h5>{props.nombre}</h5>

                        <span>{props.fecha}</span>
                        
                    </div>

                    <p>{props.mensaje}</p>

                </div>

            </a>
        </li>

    )

}