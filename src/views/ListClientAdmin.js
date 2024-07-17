import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';

const ListClientAdmin = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/admin/clientes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        if (error.response && error.response.data) {
          setError(error.response.data.error || 'An unexpected error occurred');
        } else if (error.message === 'Network Error') {
          setError('Network error. Please check your connection or try again later.');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (nif) => {
    navigate(`/edit/admin/clientes/${nif}`);
  };

  const handleDelete = async (nif) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/admin/clientes/${nif}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setClients(clients.filter(client => client.nif !== nif));
    } catch (error) {
      console.error('Error deleting client:', error);
      setError('Error deleting client. Please try again later.');
    }
  };

  const isLoggedIn = localStorage.getItem('token') !== null;

  if (!isLoggedIn) {
    return <div>You need to be logged in to access this page.</div>;
  }

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
          <li class="active">
            <a href="/list/admin/clientes"><i class="fas fa-list"></i> Listar Clientes</a>
          </li>
          <li>
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

      <div id="content">
        <h2 class="tituloadmin">Lista de Clientes</h2>
        {error && <div class="alert alert-danger">{error}</div>}
        <table class="client-list-table">
          <thead>
            <tr>
              <th>NIF</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Contacto</th>
              <th>Gestão</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.nif}>
                <td>{client.nif}</td>
                <td>{client.nome}</td>
                <td>{client.email}</td>
                <td>{client.contacto}</td>
                <td class="actions">
                  <button class="btn btn-primary" onClick={() => handleEdit(client.nif)} style={{ width: '120px', marginRight: '10px' }}>Editar</button>
                  <button class="btn btn-danger btn-block" onClick={() => handleDelete(client.nif)} style={{ width: '120px' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListClientAdmin;
