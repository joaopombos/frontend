import axios from 'axios';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';

export default function Sign_cGestor() {
    const [email, setEmail] = useState('');
    const [nome, setName] = useState('');
    const [nomeempresa, setNameEmp] = useState('');
    const [localizacao, setAddress] = useState('');
    const [nif, setNIF] = useState('');
    const [emp_nif, setNIFEmp] = useState('');
    const [contacto_cliente, setContact] = useState('');
    const [contacto_empresa, setContactEmp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/signin/comprador', {

                email,
                nome,
                nomeempresa,
                localizacao,
                nif,
                emp_nif,
                contacto_cliente,
                contacto_empresa
            });
            alert('Conta criada com sucesso');
        } catch (error) {
            console.error(error);
            alert('Erro ao criar conta');
        }
    };

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <img class="warelogo navbar-brand " src="/images/Logos/logo.png" alt="Ware Logo" />
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link text-white" href="/">Home</a>
                        </li>
                    </ul>
                    <a href="/login" class="btn btn-primary">Iniciar Sessão</a>
                </div>
            </nav>
            <div className="row">
                <div className="col-sm-6">
                    <img class="sideimgrep" src="/images/fundos/fundo preto.jpg" alt="background" />
                </div>
                <div className="col-sm-6 text-black">
                    <br></br>
                    <div className="align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                        <form onSubmit={handleSubmit} className="rightform form-signin">
                            <h3 className="fw-normal mb-3 pb-3">Criar conta</h3>
                            <p style={{ color: '#B3B3B3' }}>Todos os campos são obrigatórios.</p>

                            <div className="form-outline mb-4">
                                <input type="text" id="nome" value={nome} onChange={(e) => setName(e.target.value)} className="form-control form-control-lg" required />
                                <label className="form-label" htmlFor="nome">Primeiro e Último nome</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="text" id="nomeempresa" value={nomeempresa} onChange={(e) => setNameEmp(e.target.value)} className="form-control form-control-lg" required />
                                <label className="form-label" htmlFor="nameEmp">Nome Empresa</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" required />
                                <label className="form-label" htmlFor="email">Endereço de email Pessoal</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="text" id="contacto_cliente" value={contacto_cliente} onChange={(e) => setContact(e.target.value)} className="form-control form-control-lg" required />
                                <label className="form-label" htmlFor="contacto_cliente">Contacto Pessoal</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="text" id="contacto_empresa" value={contacto_empresa} onChange={(e) => setContactEmp(e.target.value)} className="form-control form-control-lg" required />
                                <label className="form-label" htmlFor="contacto_empresa">Contacto Empresa</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="text" id="localizacao" value={localizacao} onChange={(e) => setAddress(e.target.value)} className="form-control form-control-lg" required />
                                <label className="form-label" htmlFor="address">Morada</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="text" id="nif" value={nif} onChange={(e) => setNIF(e.target.value)} className="form-control form-control-lg" required />
                                <label className="form-label" htmlFor="nif">NIF Pessoal</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="text" id="emp_nif" value={emp_nif} onChange={(e) => setNIFEmp(e.target.value)} className="form-control form-control-lg" required />
                                <label className="form-label" htmlFor="emp_nif">NIF Empresa</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Aceitar os termos de uso.
                                </label>
                            </div>
                            <div className="botaoselect pt-1 mb-4">
                                <button className="btn btn-info btn-lg btn-dark" type="submit">Enviar código</button>
                            </div>
                            <p>Já tem conta? <a href="/login" className="link-info">Clique aqui.</a></p>
                        </form>
                        <br></br><br></br>
                    </div>
                </div>
            </div>
            <footer className="footer bg-dark text-light fixed-bottom">
                <div className="container d-flex justify-content-center align-items-center">
                    <span className="text-center">&copy; Ware 2024</span>
                </div>
            </footer>
        </div>
    );
}

