import React from "react";
import { Link } from "react-router-dom";
import Search from "../search/Search";

export default function Header(){
    return(
        <div>
            <ul>
                <li>
                    <Link to={"/home"}>Home</Link>
                </li>
                <li>
                    <Link to={"/create"}>Create Recipe</Link>
                </li>
            </ul>
            <Search />
        </div>
    )
}