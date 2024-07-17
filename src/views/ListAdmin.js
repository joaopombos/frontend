import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';

const ListAdmin = () => {
  const [softwares, setSoftwares] = useState([]);
  const [error, setError] = useState('');
  const [tipoListagem, setTipoListagem] = useState('softwares'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/list/admin?tipo=${tipoListagem}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setSoftwares(response.data);
      } catch (error) {
        console.error('Error fetching softwares:', error);
        if (error.response && error.response.data) {
          setError(error.response.data.error || 'An unexpected error occurred');
        } else if (error.message === 'Network Error') {
          setError('Erro de rede. Verifique sua conexão ou tente novamente mais tarde.');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchSoftwares();
  }, [tipoListagem]);

  const handleEdit = (idproduto) => {
    navigate(`/edit/admin/${idproduto}`);
  };

  const handleDelete = async (idproduto) => {
    try {
        const token = localStorage.getItem('token');
        console.log(`Attempting to delete software with id: ${idproduto}`);
        await axios.delete(`postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/edit/admin/${idproduto}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        
        console.log('Before filtering:', softwares);
        const updatedSoftwares = softwares.filter(software => software.idproduto !== idproduto);
        console.log('After filtering:', updatedSoftwares);

        setSoftwares(updatedSoftwares);
    } catch (error) {
        console.error('Error deleting software:', error);
        setError('Erro ao deletar software. Por favor, tente novamente mais tarde.');
    }
};


  const handleTipoChange = (e) => {
    setTipoListagem(e.target.value);
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
            <a href="/add/admin"><i class="fas fa-plus"></i> Adicionar Software/Addon</a>
          </li>
          <li class="active">
            <a href="/list/admin"><i class="fas fa-list"></i> Listar Softwares/Addons</a>
          </li>
          <li>
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
        <div class="list-header d-flex align-items-center justify-content-between">
          <h2 style={{ marginBottom: '3%', flex: '1' }}>Listar {tipoListagem === 'softwares' ? 'Softwares' : 'Addons'}</h2>
          <select id="tipoListagem" class="dropdown" value={tipoListagem} onChange={handleTipoChange}>
            <option value="softwares">Softwares</option>
            <option value="addons">Addons</option>
          </select>
        </div>
        {error && <div class="alert alert-danger">{error}</div>}
        <table class="software-list-table">
          <thead>
            <tr>
              <th>Logotipo</th>
              <th>Foto</th>
              <th>Softwares</th>
              <th>Versão</th>
              <th>Avaliação</th>
              <th>Gestão</th>
            </tr>
          </thead>
          <tbody>
            {softwares.map(software => (
              <tr key={software.idproduto}>
                <td>
                  {software.logotipo && <img src={`data:image/png;base64,${software.logotipo}`} alt={software.nome} class="software-image" />}
                </td>
                <td>
                  {software.imagenssoftware && <img src={`data:image/png;base64,${software.imagenssoftware}`} alt={software.nome} class="software-image" />}
                </td>
                <td>{software.nome}</td>
                <td>{software.versao}</td>
                <td>{software.classificacaoMedia ? software.classificacaoMedia.toFixed(1) : 'N/A'}</td>
                <td class="actions">
                  <button class="btn btn-primary" onClick={() => handleEdit(software.idproduto)} style={{ width: '120px', marginRight: '10px' }}>Editar</button>
                  <button class="btn btn-danger btn-block" onClick={() => handleDelete(software.idproduto)} style={{ width: '120px' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAdmin;




