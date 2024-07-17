import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/ware.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';


const Orcamentos = ({ token }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [budgetItems, setBudgetItems] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get('https://backend-qbi5.onrender.com/budget/admin', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });

        console.log("Dados de orçamento recuperados com sucesso:", response.data);
        setBudgetItems(response.data);

      } catch (error) {
        console.error('Erro ao buscar os orçamentos:', error);
        if (error.response) {
          console.error('Detalhes do erro de resposta:', error.response.data);
        } else if (error.request) {
          console.error('Erro de requisição:', error.request);
        } else {
          console.error('Erro inesperado:', error.message);
        }
      }
    };

    fetchBudgets();
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleRespond = async (id) => {
    const resposta = prompt("Digite sua resposta:");
    if (resposta) {
      try {
        await axios.post(`https://backend-qbi5.onrender.com/budget/respond/${id}`, { resposta }, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });

        alert('Resposta enviada com sucesso!');
        const updatedBudgetItems = budgetItems.map(item =>
          item.id === id ? { ...item, resposta } : item
        );
        setBudgetItems(updatedBudgetItems);

      } catch (error) {
        console.error('Erro ao enviar a resposta:', error);
        if (error.response) {
          console.error('Detalhes do erro:', error.response.data);
        } else {
          console.error('Erro de rede:', error.message);
        }
      }
    }
  };

  const isLoggedIn = localStorage.getItem('token') !== null;

  if (!isLoggedIn) {
    return <div>Você precisa iniciar sessão para acessar esta página.</div>;
  }

  return (
    <div class="body-container">
      <div class="sidebar">
        <div class="logo">
          <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
        </div>
        <ul class="components">
          <li>
            <Link to="/add/admin"><i class="fas fa-plus"></i> Adicionar Software/Addon</Link>
          </li>
          <li>
            <Link to="/list/admin"><i class="fas fa-list"></i> Listar Softwares/Addons</Link>
          </li>
          <li>
            <Link to="/list/admin/clientes"><i class="fas fa-list"></i> Listar Clientes</Link>
          </li>
          <li class="active">
            <Link to="/budget/admin"><i class="fas fa-file-invoice-dollar"></i> Orçamentos</Link>
          </li>
          <li>
            <Link to="/metrics/admin"><i class="fas fa-chart-line"></i> Métricas de vendas</Link>
          </li>
        </ul>
        <div class="logout-button">
          <Link to="/" class="btn btn-primary">Terminar Sessão</Link>
        </div>
      </div>

      <div id="content" class="col-md-9">
        <h2 class="tituloadmin">Orçamentos</h2>
        <div class="budget-container">
          {budgetItems.length === 0 ? (
            <p>Não há orçamentos disponíveis.</p>
          ) : (
            budgetItems.map(item => (
              <div
                key={item.id}
                class={`budget-item ${expandedItems[item.id] ? 'expanded' : ''}`}
                onClick={() => toggleExpand(item.id)}
              >
                <div class="details">
                  <strong>Orçamento #{item.id}</strong>
                  {expandedItems[item.id] && (
                    <div class="extra-details">
                      <p>{item.text}</p>
                      <h5>Detalhes do Orçamento:</h5>
                      <ul>
                        <li>NIF: {item.nif}</li>
                        <li>ID Produto: {item.idproduto}</li>
                        <li>Estado: {item.estado}</li>
                        <li>Quantidade: {item.quantidade}</li>
                        <li>Preço do Orçamento: ${item.precoorcamento}</li>
                      </ul>
                      <button class="btn btn-success respond-button" onClick={() => handleRespond(item.id)}>
                        Responder
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orcamentos;


