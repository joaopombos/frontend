import React, { } from "react";
import '../CSS/ware.css';

export default function Sign_tipo() {
    return (
        <div class="fundopagtipo" style={{ backgroundImage: `url('/images/fundos/fundotipodeconta.svg')` }}>
            <nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <img class="warelogo navbar-brand " src="/images/Logos/logo.png" alt="Ware Logo" />
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link text-white" href="/">Home</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="cardstipos d-flex align-items-center justify-content-center">
                <div class="card text-center mb-3 align-middle">
                    <div class="tipocontacards card-body">
                        <h2 class="tipocardtit1 card-title">Gestor</h2>
                        <p class="tipocardtex card-text">
                            <ul class="ultipo">
                                <li><i class="fas fa-check"></i> Biblioteca de Softwares</li>
                                <li><i class="fas fa-check"></i> Gestão Empresarial</li>
                                <li><i class="fas fa-times"></i> Compra de Softwares</li>
                            </ul>
                        </p>
                        <a href="/signin/gestor" class="botaoselect btn btn-dark">Selecionar</a>
                    </div>
                </div>
                <div class="tipoconta card text-center mb-3 align-middle">
                    <div class="tipocontacards card-body">
                        <h2 class="tipocardtit card-title">Comprador/</h2>
                        <h2 class="card-title">Gestor</h2>
                        <p class="tipocardtex card-text">
                            <ul class="ultipo">
                                <li><i class="fas fa-check"></i> Biblioteca de Softwares</li>
                                <li><i class="fas fa-check"></i> Gestão Empresarial</li>
                                <li><i class="fas fa-check"></i> Compra de Softwares</li>
                            </ul>
                        </p>
                        <a href="/signin/c_gestor" class="botaoselect btn btn-dark">Selecionar</a>
                    </div>
                </div>
            </div>
            <footer class="footer bg-dark text-light fixed-bottom">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                </div>
            </footer>
        </div>
    );
}
