import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import login from "./components/login";

export default function AppRoute() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={login}/>
            </Routes>
        </Router>
    );
}