import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';

export default function Sign_gestor() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [emp_nif, setEmpNif] = useState('');
    const [nif, setNif] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/signin/gestor', {
                nome,
                emp_nif,
                email,
                nif
            });
            alert('Conta criada com sucesso');
            navigate('/signup/comprador');
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
            <div class="row">
                <div class="col-sm-6">
                    <img src="/images/fundos/fundo preto.jpg" class="sideimg" alt="fundo preto" />
                </div>
                <div class="col-sm-6 text-black">
                    <div class=" align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                        <form onSubmit={handleSubmit} class="rightform form-signin">
                            <h3 class="fw-normal mb-3 pb-3">Criar conta</h3>
                            <p class="obrigatorio">Todos os campos são obrigatórios.</p>
                            <div class="form-outline mb-4">
                                <input type="text" id="name" value={nome} onChange={(e) => setNome(e.target.value)} class="form-control form-control-lg" />
                                <label class="form-label" for="name">Primeiro e Último nome</label>
                            </div>
                            <div class="form-outline mb-4">
                                <input type="text" id="nif" value={nif} onChange={(e) => setNif(e.target.value)} class="form-control form-control-lg" />
                                <label class="form-label" for="name">NIF pessoal</label>
                            </div>
                            <div class="form-outline mb-4">
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control form-control-lg" />
                                <label class="form-label" for="email">Endereço de email</label>
                            </div>
                            <div class="form-outline mb-4">
                                <input type="text" id="emp_nif" value={emp_nif} onChange={(e) => setEmpNif(e.target.value)} class="form-control form-control-lg" />
                                <label class="form-label" for="email">NIF empresa</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Aceitar os termos de uso.
                                </label>
                            </div>
                            <div class="botaoselect pt-1 mb-4">
                                <button class="btn btn-info btn-lg btn-dark" type='submit'>Enviar código</button>
                            </div>
                            <p>Já tem conta? <a href="/login" class="link-info">Clique aqui.</a></p>
                        </form>
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