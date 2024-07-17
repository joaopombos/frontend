import React ,{useEffect, useState} from "react";
export default function Footer() {
    return (
        <footer className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src="images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                </div>
                <button className="btn btn-outline-light me-2" type="button">Português</button>
            </div>
        </footer>
    );
}
