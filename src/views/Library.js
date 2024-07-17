import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import '../CSS/ware.css';

const MySoftwares = () => {
    const [softwares, setSoftwares] = useState([]);

    useEffect(() => {
        const fetchSoftwares = async () => {
            try {
                const response = await axios.get('postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/library', {
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
                    window.location.href = '/login';
                }
            }
        };

        fetchSoftwares();
    }, []);

    const handleButtonClick = (chaveproduto) => {
        window.location.href = `/license/${chaveproduto}`;
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
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/signup/comprador">
                        <img className="warelogo" src="/images/Logos/logo.png" alt="Ware Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link text-white" href="/shop">Explorar</a>
                            <a className="nav-link active text-white" aria-current="page" href="/library">Gestão</a>
                        </div>
                    </div>
                    <form className="d-flex me-3" role="search">
                        <input className="navform form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Procurar</button>
                    </form>
                    <a href="/" className="btn btn-primary">Terminar Sessão</a>
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


