import * as  React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../screens/Home";

export default function Navigation() {
    return (
        <div>
            <Routes>
                <Route exact path={'/Home'} element={<Home />} />
            </Routes>

 
        </div> 
    )
}