import React from "react";
import { Link } from "react-router-dom";
import style from "./ErrorPage.module.css";

export default function ErrorPage(){
    return(
        <div>
            Error: Pagina no encontrada
            <Link to={"/home"}>Return home</Link>
        </div>
    );
};