import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button, Form } from 'react-bootstrap';
import '../CSS/ware.css';
import { useNavigate, Link } from 'react-router-dom';


const License = () => {
    const { chaveproduto } = useParams();
    const [software, setSoftware] = useState(null);
    const [licenses, setLicenses] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentLicense, setCurrentLicense] = useState(null);
    const [newNomepc, setNewNomepc] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSoftwareLicenses = async () => {
            try {
                const response = await axios.get(`https://backend-qbi5.onrender.com/license/${chaveproduto}`, {
                    withCredentials: true 
                });
                setSoftware(response.data.software);
                setLicenses(response.data.licenses);
            } catch (error) {
                console.error('Error fetching software licenses:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchSoftwareLicenses();
    }, [chaveproduto]);

    const handleUpdateModalOpen = (license) => {
        setCurrentLicense(license);
        setNewNomepc(license.nomepc);
        setShowUpdateModal(true);
    };

    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
        setCurrentLicense(null);
    };

    const handleUpdateSubmit = async () => {
        try {
            const response = await axios.put(`https://backend-qbi5.onrender.com/license/${chaveproduto}`,
                {
                    idatribuida: currentLicense.idatribuida,
                    nomepc: newNomepc
                }, {
                withCredentials: true 
            });
            setLicenses(licenses.map(license => license.idatribuida === response.data.idatribuida ? response.data : license));
            handleUpdateModalClose();
        } catch (error) {
            console.error('Error updating license:', error);
        }
    };

    const handleLicenseRemove = async (idatribuida) => {
        try {
            const response = await axios.put(`https://backend-qbi5.onrender.com/license/${chaveproduto}`,
                {
                    idatribuida,
                    nomepc: null
                }, {
                withCredentials: true 
            });
            setLicenses(licenses.map(license => license.idatribuida === idatribuida ? response.data : license));
        } catch (error) {
            console.error('Error removing license:', error);
        }
    };

    if (!software) {
        return <div>Loading...</div>;
    }


    const isLoggedIn = localStorage.getItem('token') !== null;

    if (!isLoggedIn) {
        return <div>Você precisa iniciar sessão para acessar esta página.</div>;
    }

    return (
        <div class="d-flex flex-column min-vh-100">
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

            <h1 class="titulo">Licenças para {software.nome}</h1>

            <div class="contlice container">
                <div class="row">
                    {licenses.map(license => (
                        <div class="licen col-sm-3 mb-4" key={license.idatribuida}>
                            <div class="cardlice card h-100">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <h5 class="card-title">PC: {license.nomepc}</h5>
                                    <p class="card-text">Data: {new Date(license.dataatri).toLocaleDateString()}</p>
                                    <button class="btn btn-primary mb-2" onClick={() => handleUpdateModalOpen(license)}>Atualizar</button>
                                    <button class="btn btn-danger mt-auto" onClick={() => handleLicenseRemove(license.idatribuida)}>Remover</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer class="footer bg-dark text-light fixed-bottom">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                </div>
            </footer>

            <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualizar Nome do PC</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNomepc">
                            <Form.Label>Nome do PC</Form.Label>
                            <Form.Control
                                type="text"
                                value={newNomepc}
                                onChange={(e) => setNewNomepc(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateModalClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleUpdateSubmit}>
                        Atualizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default License;
