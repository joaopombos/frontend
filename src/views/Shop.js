import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';


const Shop = () => {
    const [items, setItems] = useState([]);
    const [type, setType] = useState('softwares');

    useEffect(() => {
        const fetchItems = async () => {
            try {

                const endpoint = `postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/shop/softwares?type=${type}`;
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true
                });

                const convertedItems = response.data.map(item => ({
                    ...item,
                    logotipo: item.logotipo ? `data:image/png;base64,${item.logotipo}` : null,
                    imagenssoftware: item.imagenssoftware ? `data:image/png;base64,${item.imagenssoftware}` : null
                }));
                setItems(convertedItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [type]);

    const handleTypeChange = (newType) => {
        setType(newType);
    };


    const handleButtonClick = (id, itemType) => {
        const route = `/shop/${id}?type=${itemType}`;
        window.location.href = route;
    };

    const renderCard = (item) => (
        <div className="col-sm-2 mb-4" key={item.idproduto} style={{ margin: '15px' }}>
            <div className="card h-100" style={{ textAlign: 'center' }}>
                <button className="btn-img" onClick={() => handleButtonClick(item.idproduto, type)} style={{ padding: '0', border: 'none', background: 'none' }}>
                    <img src={item.logotipo} alt={item.nome} style={{ width: '100%', height: 'auto' }} />
                </button>
                <div className="card-body">
                    <h5 className="card-title">{item.nome}</h5>
                    <p>{item.descricao}</p>
                </div>
            </div>
        </div>
    );

    const isLoggedIn = localStorage.getItem('token') !== null;

    if (!isLoggedIn) {
        return <div>Você precisa iniciar sessão para acessar esta página.</div>;
    }

    return (
        <div>
            {/* NAVBAR */}
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
            {/* END NAVBAR */}

            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className={`btn btn-outline-primary ${type === 'softwares' ? 'active' : ''}`}
                            onClick={() => handleTypeChange('softwares')}>
                            Softwares
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className={`btn btn-outline-primary ${type === 'addons' ? 'active' : ''}`}
                            onClick={() => handleTypeChange('addons')}>
                            Addons
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    {items.map(renderCard)}
                </div>
            </div>

            {/* RECOMMENDATIONS */}
            <hr className="custom-hr" />
            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Recommended for You</h1>

            <div id="carouselrecomendado" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row justify-content-center">
                            {/* Example recommendation cards */}
                            <div className="col-6 d-flex flex-column align-items-center">
                                <div className="card card-custom mt-3" style={{ width: '70%', boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-md-3">
                                            <img src="/images/newicons/asana.png" className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                            <div className="card-body">
                                                <p className="card-text">Communication</p>
                                                <h5 className="card-title">Asana</h5>
                                            </div>
                                            <a href="/shop" className="btn btn-dark btn-sm" style={{ marginRight: '-15px' }}>Learn More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* More examples can be added here */}
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselrecomendado" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselrecomendado" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* END RECOMMENDATIONS */}

            {/* FOOTER */}
            <footer className="footer bg-dark text-light">
                <div className="container d-flex justify-content-center align-items-center">
                    <span className="text-center">&copy; Ware 2024</span>
                </div>
            </footer>
            {/* END FOOTER */}
        </div>
    );
};

export default Shop;

