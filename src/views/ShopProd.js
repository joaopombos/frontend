import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';
import '../CSS/ware.css'; // Importe o arquivo CSS separado


const stripePromise = loadStripe('pk_test_51JbCVGJuN2xREvwF3DtK39P7YXbFYh5zsLeDs0q0KeDsIznQA7lEzniCBVAUswk0rzYYYr7s34AkNWavQTQY9mWc00fYGRbsv1');

const ShopProd = () => {
    const { idproduto } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [showhistModal, setShowhistModal] = useState(false);
    const [showorcModal, setShoworcModal] = useState(false);
    const [showCompraModal, setShowCompraModal] = useState(false);
    const [quantidadeLicencas, setQuantidadeLicencas] = useState(1);
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const endpoint = `postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/shop/${idproduto}`;
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true
                });
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item:', error);
                setError(error);
            }
        };

        fetchItem();
    }, [idproduto]);

    const handleModalhistOpen = async () => {
        setShowhistModal(true);
        try {
            const response = await axios.get(`postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/versions/${idproduto}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
            });
            setVersions(response.data);
        } catch (error) {
            console.error('Error fetching versions:', error);
        }
    };

    const handleModalhistClose = () => setShowhistModal(false);
    const handleModalorcOpen = () => setShoworcModal(true);
    const handleModalorcClose = () => setShoworcModal(false);
    const handleModalCompraOpen = () => setShowCompraModal(true);
    const handleModalCompraClose = () => setShowCompraModal(false);

    const handleCompra = async () => {
        try {
            const response = await axios.post('postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/shop/compra/', {
                quantidade: quantidadeLicencas,
                idproduto: item.idproduto,
                nome: item.nome,
                versao: item.versao,
                emp_nif: Cookies.get('emp_nif')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
            });

            const sessionId = response.data.sessionId;

            // Redirecionar para o checkout do Stripe
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({
                sessionId: sessionId
            });

        } catch (error) {
            console.error('Error during purchase:', error);
            alert(`Erro ao realizar compra: ${error.message}`);
        }
    };

    if (error) {
        return <div>Erro ao carregar dados: {error.message}</div>;
    }

    return (
        <>
            {item && (
                <>
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

                    {/* FIM NAVBAR */}

                    <div className="container mt-4">
                        <div className="row no-gutters align-items-center">
                            <div className="col-md-2">
                                {item.logotipo ? (
                                    <img src={`data:image/png;base64,${item.logotipo}`} className="card-img" alt="Item Logo" />
                                ) : (
                                    <img src="/placeholder-image.png" className="card-img" alt="Placeholder" />
                                )}
                            </div>
                            <div className="col-md-10 d-flex justify-content-between align-items-center">
                                <h2 className="shoptitle card-title">{item.nome}</h2>
                                <div className="card-body justify-content-end align-items-center">
                                    <div className="d-flex justify-content-end align-items-center">
                                        <p className="mb-0 me-3">€{item.precoproduto || item.preco}</p>
                                        <Button variant="outline-danger" onClick={handleModalCompraOpen}>
                                            Comprar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="custom-hr" />

                    <h1 className="ms-5 mt-5 mb-5">Descrição</h1>

                    <div className="container">
                        <p className="card-text">{item.descricao}</p>
                    </div>

                    <hr className="custom-hr" />



                    <div className="container-fluid mt-5">
                        <div className="d-flex justify-content-between ms-5 me-5">
                            <Button variant="secondary" onClick={handleModalhistOpen}>
                                Versões
                            </Button>
                            <Button variant="secondary" onClick={handleModalorcOpen}>
                                Pedir Orçamento
                            </Button>
                        </div>

                        <Modal show={showhistModal} onHide={handleModalhistClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Historial de Versões</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    {versions.length > 0 ? (
                                        versions.map((version) => (
                                            <Form.Group controlId={`formVersao${version.idversao}`} key={version.idversao}>
                                                <Form.Label>Versão: {version.versao}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={`Data: ${new Date(version.datamodifi).toLocaleDateString()}`}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        ))
                                    ) : (
                                        <p>No versions available.</p>
                                    )}
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleModalhistClose}>
                                    Fechar
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showorcModal} onHide={handleModalorcClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Pedir Orçamento</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="formQuantidade">
                                        <Form.Label>Quantidade</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={quantidadeLicencas}
                                            onChange={(e) => setQuantidadeLicencas(e.target.value)}
                                            min="1"
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleModalorcClose}>
                                    Fechar
                                </Button>
                                <Button variant="primary" onClick={() => alert('Orçamento pedido!')}>
                                    Pedir Orçamento
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showCompraModal} onHide={handleModalCompraClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar Compra</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Tem a certeza que quer comprar {quantidadeLicencas} licença(s) de {item.nome}?</p>
                                <Form.Group controlId="formQuantidadeLicencas">
                                    <Form.Label>Quantidade de Licenças</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={quantidadeLicencas}
                                        onChange={(e) => setQuantidadeLicencas(e.target.value)}
                                        min="1"
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleModalCompraClose}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" onClick={handleCompra}>
                                    Comprar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>


                    <hr class="custom-hr" />

                    <h1 class="titulo">Sugestões</h1>

                    <div id="carouselatualizacoes" class="carousel slide mx-auto" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="row justify-content-center">
                                    <div class="upscreen col-6 d-flex flex-column align-items-center">
                                        <div class="cardup card card-custom" >
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-md-3">
                                                    <img src="/images/newicons/excel.png" class="card-img" alt="..." />
                                                </div>
                                                <div class="col-md-8 d-flex justify-content-between align-items-center">
                                                    <div class="card-body">
                                                        <p class="card-text">Produtividade</p>
                                                        <h5 class="card-title">Microsoft Excel</h5>
                                                    </div>
                                                    <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cardup card card-custom mt-3">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-md-3">
                                                    <img src="/images/newicons/asana.png" class="card-img" alt="..." />
                                                </div>
                                                <div class="col-md-8 d-flex justify-content-between align-items-center">
                                                    <div class="card-body">
                                                        <p class="card-text">Comunicação</p>
                                                        <h5 class="card-title">Asana</h5>
                                                    </div>
                                                    <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6 d-flex flex-column align-items-center">
                                        <div class="cardup card card-custom">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-md-3">
                                                    <img src="/images/newicons/dropbox.png" class="card-img" alt="..." />
                                                </div>
                                                <div class="col-md-8 d-flex justify-content-between align-items-center">
                                                    <div class="card-body">
                                                        <p class="card-text">Produtivade</p>
                                                        <h5 class="card-title">DropBox</h5>
                                                    </div>
                                                    <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cardup card card-custom mt-3">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-md-3">
                                                    <img src="/images/newicons/miro.png" class="card-img" alt="..." />
                                                </div>
                                                <div class="col-md-8 d-flex justify-content-between align-items-center">
                                                    <div class="card-body">
                                                        <p class="card-text">Comunicação</p>
                                                        <h5 class="card-title">Miro</h5>
                                                    </div>
                                                    <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="row justify-content-center">
                                    <div class="upscreen col-6 d-flex flex-column align-items-center">
                                        <div class="cardup card card-custom">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-md-3">
                                                    <img src="/images/newicons/notion.png" class="card-img" alt="..." />
                                                </div>
                                                <div class="col-md-8 d-flex justify-content-between align-items-center">
                                                    <div class="card-body">
                                                        <p class="card-text">Produtivade</p>
                                                        <h5 class="card-title">Notion</h5>
                                                    </div>
                                                    <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cardup card card-custom mt-3">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-md-3">
                                                    <img src="/images/newicons/fcp.png" class="card-img" alt="..." />
                                                </div>
                                                <div class="col-md-8 d-flex justify-content-between align-items-center">
                                                    <div class="card-body">
                                                        <p class="card-text">Vídeo</p>
                                                        <h5 class="card-title">Final Cut Pro</h5>
                                                    </div>
                                                    <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6 d-flex flex-column align-items-center">
                                        <div class="cardup card card-custom">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-md-3">
                                                    <img src="/images/newicons/office.png" class="card-img" alt="..." />
                                                </div>
                                                <div class="col-md-8 d-flex justify-content-between align-items-center">
                                                    <div class="card-body">
                                                        <p class="card-text">Produtividade</p>
                                                        <h5 class="card-title">Office 365</h5>
                                                    </div>
                                                    <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cardup card card-custom mt-3">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-md-3">
                                                    <img src="/images/newicons/slack.png" class="card-img" alt="..." />
                                                </div>
                                                <div class="col-md-8 d-flex justify-content-between align-items-center">
                                                    <div class="card-body">
                                                        <p class="card-text">Produtividade</p>
                                                        <h5 class="card-title">Slack</h5>
                                                    </div>
                                                    <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselatualizacoes" data-bs-slide="prev" >
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselatualizacoes" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>



                    <hr class="custom-hr" />


                    <h1 class="titulo">Avaliações</h1>


                    <div class="avrow row">
                        <div class="col-md-3 mb-4">
                            <div class="cardvav card">
                                <img src="/images/icons/aspas.png" class="aspas card-img-top img-fluid mx-auto d-block" alt="..." />
                                <div class="card-body text-center">
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                        est id, tristique viverra mauris. </p>
                                    <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                    <p class="card-text mb-2">Categoria</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 mb-4">
                            <div class="cardvav card">
                                <img src="/images/icons/aspas.png" class="aspas card-img-top img-fluid mx-auto d-block" alt="..." />
                                <div class="card-body text-center">
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                        est id, tristique viverra mauris. </p>
                                    <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                    <p class="card-text mb-2">Categoria</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 mb-4">
                            <div class="cardvav card">
                                <img src="/images/icons/aspas.png" class="aspas card-img-top img-fluid mx-auto d-block" alt="..." />
                                <div class="card-body text-center">
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                        est id, tristique viverra mauris. </p>
                                    <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                    <p class="card-text mb-2">Categoria</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer class="footer bg-dark text-light">
                        <div class="container d-flex justify-content-center align-items-center">
                            <span class="text-center">&copy; Ware 2024</span>
                        </div>
                    </footer>

                </>
            )}
        </>
    );
};

export default ShopProd;

