import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';



const Success = () => {
    return (
        <div class="d-flex flex-column min-vh-100">
            <nav classe="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <img class="warelogo navbar-brand " src="/images/Logos/logo.png" alt="Ware Logo" />
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link text-white" href="/signup/comprador">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="/shop">Explorar</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-white" aria-current="page" href="/library">Gestão</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="navform form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button class="btn btn-outline-light mx-2" type="submit">Procurar</button>
                    </form>
                    <a href="/" class="btn btn-primary">Terminar Sessão</a>
                </div>
            </nav>

            <div class="main-content d-flex justify-content-center align-items-center flex-grow-1">
                <div class="success-container">
                    <i class="iconsucesso fas fa-check-circle fa-5x mb-4"></i>
                    <h1>Sucesso!</h1>
                    <p>Foi enviado um email para email@domain.com a confirmar a compra!</p>
                    <a href="/library" class="btn btn-light">Ir para Os Meus Softwares</a>
                </div>
            </div>


            <footer class="footer bg-dark text-light">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                </div>
            </footer>
        </div>

    );
};

export default Success;
