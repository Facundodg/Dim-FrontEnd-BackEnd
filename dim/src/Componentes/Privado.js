export default function Privado(props) {

    return (

        <li data-aos="fade-left">

            <a href="#">

                <div className="message-avatar-PRIVADO">

                    {/* <img src={props.img} alt="" /> */}

                </div>

                <div className="message-body-PRIVADO">

                    <div className="message-body-heading-PRIVADO">

                        <h5>{props.nombre}</h5>
                        
                        <span>{props.fecha}</span>    

                    </div>

                    <p>{props.mensaje}</p>
                    

                </div>

            </a>
        </li>

    )

}