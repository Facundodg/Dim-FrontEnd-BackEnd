import React from "react";
import { Spinner } from "reactstrap";


function Loading() {

    return (

        <div className="container d-flex justify-content-center aline-item-center mt-3 w-100">

            <Spinner color="primary" />

        </div>

    );

}
export default Loading;