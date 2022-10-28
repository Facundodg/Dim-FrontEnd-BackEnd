export default function TablaPrueba(props) {

    return (

        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
              
                {props.children}

            </tbody>
        </table>

    )

}