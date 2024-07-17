import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="principalcomprador.html">
                    <img src="images/Logos/logo.png" style={{ width: "20%" }} alt="Ware Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ marginLeft: "-32%" }}>
                    <div className="navbar-nav">
                        <a className="nav-link active text-white" aria-current="page" href="principalcomprador.html">Explorar</a>
                        <a className="nav-link text-white" href="librarycompgestor.html">Gestão</a>
                    </div>
                </div>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                    <button className="btn btn-outline-light" type="submit">Procurar</button>
                </form>
                <button className="btn btn-outline-light me-2" style={{ marginLeft: "0.5%" }} type="button">
                    <i className="bi bi-cart4"></i>
                </button>
                <button className="btn btn-outline-light me-2" type="button">Terminar Sessão</button>
            </div>
        </nav>
    );
}