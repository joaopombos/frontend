import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import '../CSS/ware.css';
import { useNavigate, Link } from 'react-router-dom';


const MySoftwares = () => {
    const [softwares, setSoftwares] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSoftwares = async () => {
            try {
                const response = await axios.get('https://backend-qbi5.onrender.com/library', {
                    withCredentials: true
                });

                const convertedSoftwares = response.data.map(software => ({
                    ...software,
                    logotipo: software.logotipo ? `data:image/png;base64,${software.logotipo}` : '/images/Logos/placeholder.png'
                }));

                setSoftwares(convertedSoftwares);
            } catch (error) {
                console.error('Erro ao buscar softwares:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchSoftwares();
    }, []);

    const handleButtonClick = (chaveproduto) => {
        navigate(`/license/${chaveproduto}`);
    };

    const renderCard = (software) => (
        <div className="col-sm-2 mb-4" key={software.chaveproduto} style={{ margin: '15px' }}>
            <div className="card h-100" style={{ textAlign: 'center' }}>
                <button className="btn-img" onClick={() => handleButtonClick(software.chaveproduto)} style={{ padding: '0', border: 'none', background: 'none' }}>
                    <img src={software.logotipo} className="card-img-top" alt={software.nome} style={{ width: '100%', height: 'auto' }} />
                </button>
                <div className="card-body">
                    <h5 className="card-title">{software.nome}</h5>
                    <p className="card-text">Licenças: {software.licenses ? software.licenses.length : 0}</p>
                </div>
            </div>
        </div>
    );

    const isLoggedIn = localStorage.getItem('token') !== null;

    if (!isLoggedIn) {
        return <div>Você precisa iniciar sessão para acessar esta página.</div>;
    }


    return (
        <div className="d-flex flex-column min-vh-100">
            {/* NAVBAR */}
            <nav class="navbar navbar-expand-lg bg-dark">
                        <div class="container-fluid">
                            <img class="warelogo navbar-brand " src="/images/Logos/logo.png" alt="Ware Logo" />
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                    <Link class="nav-link text-white" to="/signup/comprador">Home</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link text-white" to="/shop">Explorar</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link active text-white" aria-current="page" to="/library">Gestão</Link>
                                </li>
                            </ul>
                            <form class="d-flex" role="search">
                                <input class="navform form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                                <button class="btn btn-outline-light mx-2" type="submit">Procurar</button>
                            </form>
                            <Link to="/" class="btn btn-primary">Terminar Sessão</Link>
                        </div>
                    </nav>
            {/* FIM NAVBAR */}

            <h1 className="titulo">Os meus softwares</h1>

            <div className="librarycont container">
                <div className="row">
                    {softwares.map(renderCard)}
                </div>
            </div>

            <footer className="footer bg-dark text-light fixed-bottom">
                <div className="container d-flex justify-content-center align-items-center">
                    <span className="text-center">&copy; Ware 2024</span>
                </div>
            </footer>
        </div>
    );
};

export default MySoftwares;


