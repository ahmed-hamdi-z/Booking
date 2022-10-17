import * as  React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../screens/Home";
import Booking from "../screens/Booking"
import Login from "../screens/Login";
import Register from "../screens/Register";
import UserProfile from "../screens/UserProfile";
import Admin from "../screens/Admin";
import Landing from "../screens/Landing";

export default function Navigation() {
    return (
        <div>
            <Routes>
                <Route exact path={'/Home'} element={<Home />} />
                <Route exact path={'/booking/:roomid/:fromdate/:todate'} element={<Booking />} />
                <Route exact path={'/Login'} element={<Login />} />
                <Route exact path={'/Register'} element={<Register />} />
                <Route exact path={'/profile'} element={<UserProfile />} />
                <Route exact path={'/Admin'} element={<Admin />} />
                <Route exact path={'/'} element={<Landing />} />

                

            </Routes>

 
        </div> 
    )
}