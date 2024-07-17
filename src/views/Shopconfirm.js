import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/ware.css';

const Shopconfirm = () => {
    let { idvenda } = useParams();
    const navigate = useNavigate();

    // Função para redirecionar para /shop
    const handleRedirect = () => {
        navigate('/shop');
    };

    return (
        <div class="d-flex flex-column min-vh-100">
            <nav class="navbar navbar-expand-lg bg-dark">
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
                    <i class="iconsucesso fas fa-times fa-5x mb-4"></i>
                    <h2>Compra Cancelada {idvenda}</h2>
                    {/* Botão para redirecionar para /shop */}
                    <button onClick={handleRedirect}>Voltar para a Loja</button>
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

export default Shopconfirm;


