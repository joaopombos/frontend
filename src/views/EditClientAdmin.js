import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/ware.css';

const EditClientAdmin = () => {
    const { nif } = useParams();
    const [client, setClient] = useState({
        nome: '',
        email: '',
        codigopessoal: '',
        contacto: '',
        iduser: '',
        emp_nif: ''
    });
    const [companyNifs, setCompanyNifs] = useState([]);
    const [userTypes] = useState([
        { label: 'Comprador Gestor', value: 1 },
        { label: 'Comprador', value: 2 }
    ]);
    const [, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://backend-qbi5.onrender.com/admin/clientes/${nif}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                setClient(response.data);
            } catch (error) {
                console.error('Error fetching client:', error);
                setError('Error fetching client.');
            }
        };

        const fetchCompanyNifs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://backend-qbi5.onrender.com/admin/empresas', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                setCompanyNifs(response.data);
            } catch (error) {
                console.error('Error fetching company NIFs:', error);
                setError('Error fetching company NIFs.');
            }
        };

        fetchClient();
        fetchCompanyNifs();
    }, [nif]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient(prevClient => ({
            ...prevClient,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };

            await axios.put(`https://backend-qbi5.onrender.com/admin/clientes/${nif}`, client, config);

            window.alert('Client updated successfully!');
            navigate('/list/admin/clientes');
        } catch (error) {
            console.error('Error updating client:', error);
            setError('Error updating client.');
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
            <Link to="/add/admin"><i class="fas fa-plus"></i> Adicionar Software/Addon</Link>
          </li>
          <li >
            <Link to="/list/admin"><i class="fas fa-list"></i> Listar Softwares/Addons</Link>
          </li>
          <li class="active">
            <Link to="/list/admin/clientes"><i class="fas fa-list"></i> Listar Clientes</Link>
          </li>
          <li>
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

            <div id="content">
                <h2 class="tituloadmin">Gestão de Cliente</h2>
                <div class="form-container">
                    <div class="row">
                        <div class="col-md-6">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" class="formadmin form-control" id="nome" name="nome" value={client.nome} onChange={handleChange} placeholder="Name" />
                            <label htmlFor="email" class="mt-3">Email</label>
                            <input type="text" class="formadmin form-control" id="email" name="email" value={client.email} onChange={handleChange} placeholder="Email" />
                            <label htmlFor="codigopessoal" class="mt-3">Codígo Pessoal</label>
                            <input type="text" class="formadmin form-control" id="codigopessoal" name="codigopessoal" value={client.codigopessoal} onChange={handleChange} placeholder="Personal Code" />
                            <label htmlFor="contacto" class="mt-3">Contacto</label>
                            <input type="text" class="formadmin form-control" id="contacto" name="contacto" value={client.contacto} onChange={handleChange} placeholder="Contact" />
                            <label htmlFor="iduser" class="mt-3">Tipo de User</label>
                            <select class="formadmin form-control" id="iduser" name="iduser" value={client.iduser} onChange={handleChange}>
                                {userTypes.map(userType => (
                                    <option key={userType.value} value={userType.value}>
                                        {userType.label}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="emp_nif" class="mt-3">NIF da Empresa</label>
                            <select class="formadmin form-control" id="emp_nif" name="emp_nif" value={client.emp_nif} onChange={handleChange}>
                                {companyNifs.map(company => (
                                    <option key={company.nif} value={company.nif}>
                                        {company.nif} - {company.nomeempresa}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-end">
                            <button class="btn btn-danger" onClick={handleSubmit}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditClientAdmin;
