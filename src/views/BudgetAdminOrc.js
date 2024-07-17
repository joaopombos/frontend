import React from 'react';
import '../CSS/ware.css';

const Orcamentos = () => {
  return (
    <div class="body-container">
      <div class="sidebar">
        <div class="logo">
          <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
        </div>
        <ul class="components">
          <li>
            <a href="/add/admin"><i class="fas fa-plus"></i> Adicionar Software/Addon</a>
          </li>
          <li>
            <a href="/list/admin"><i class="fas fa-list"></i> Listar Softwares/Addons</a>
          </li>
          <li>
            <a href="/list/admin/clientes"><i class="fas fa-list"></i> Listar Clientes</a>
          </li>
          <li class="active">
            <a href="/budget/admin"><i class="fas fa-file-invoice-dollar"></i> Orçamentos</a>
          </li>
          <li>
            <a href="/metrics/admin"><i class="fas fa-chart-line"></i> Métricas de vendas</a>
          </li>
        </ul>
        <div class="logout-button">
          <a href="/" class="btn btn-primary">Terminar Sessão</a>
        </div>
      </div>

        <div id="content" class="col-md-9">
          <h2 class="tituloadmin">Orçamentos</h2>
          <div class="adminbudcont budget-container">
            <div class="adminbudit budget-item">
              <h4>Orçamento #345</h4>
              <div class="client-info">
                <p><strong>Nome Cliente:</strong> Nome do Cliente</p>
                <p><strong>Email do Cliente:</strong> email@cliente.com</p>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <table class="table">
                <thead>
                  <tr>
                    <th>Software</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Adobe Illustrator</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>Office 365</td>
                    <td>50</td>
                  </tr>
                </tbody>
              </table>
              <div class="response-container">
                <label htmlFor="response">Resposta</label>
                <textarea id="response" class="formadmin form-control response-textarea"></textarea>
              </div>
              <button class="btn btn-success respond-button mt-2">Responder</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Orcamentos;
