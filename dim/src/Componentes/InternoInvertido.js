export default function InternoInvertido(props){

    return(

        <li data-aos="fade-right">
        <a href="#">
          <div className="message-avatar">
            <img src={props.img} alt="" />
          </div>
          <div className="message-body">
            <div className="message-body-heading">
              <h5>{props.nombre}</h5>
              <span>{props.fecha}</span>
            </div>
            <p>{props.mensaje}</p>
          </div>
        </a>
      </li>

    )

}