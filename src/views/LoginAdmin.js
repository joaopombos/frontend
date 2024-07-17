import React, { useState } from 'react';
import axios from 'axios';  // Importar o axios corretamente
import { useNavigate } from 'react-router-dom';  // Importar o useNavigate para redirecionamento
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';


export default function EditComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Instanciar o useNavigate para redirecionamento

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/login/admin', { username, password }, {
        withCredentials: true // Se necessário
      });
      const { token } = response.data;
      console.log('Login successful', token);

      // Armazenar o token no localStorage
      localStorage.setItem('token', token);

      // Redirecionar para a página desejada após o login
      navigate('/list/admin');
    } catch (error) {
      console.error('Login error', error);
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'An unexpected error occurred');
      } else if (error.message === 'Network Error') {
        setError('Erro de rede. Verifique sua conexão ou tente novamente mais tarde.');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };


  return (
    <div className="loginpage">
      {/* MENU BAR */}
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
      {/* FIM MENU BAR */}

      {/* LOG IN FORM */}
      <div class="logform">
        <section className="d-flex align-items-center justify-content-center">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6 text-black">
                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <form class="actform" onSubmit={handleLogin}>
                    <h3 className="fw-normal mb-3 pb-3">Log in Admin</h3>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form2Example17"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2Example17">Nome do Utilizador</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example27"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2Example27">Password</label>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="pt-1 mb-4">
                      <button className="btn btn-info btn-lg btn-dark" type="submit" >Login</button>
                    </div>
                    <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Esqueceu-se do código?</a></p>
                  </form>
                </div>
              </div>
              <div class="col-sm-6 d-flex align-items-center justify-content-center">
                <img class="sideimg" src="images/fundos/fundo branco.jpg" alt="background" />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* FIM LOG IN FORM */}

      {/* FOOTER */}
      <footer className="footer bg-dark text-light fixed-bottom">
        <div className="container d-flex justify-content-center align-items-center">
          <span className="text-center">&copy; Ware 2024</span>
        </div>
      </footer>
      {/* FIM FOOTER */}
    </div>
  );
}
