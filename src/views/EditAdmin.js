import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/ware.css';

const SoftwareUpdate = () => {
    const { idproduto } = useParams();
    const [software, setSoftware] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        versao: '',
        precoproduto: ''
    });
    const [logotipo, setLogotipo] = useState(null);
    const [imagenssoftware, setImagensSoftware] = useState(null);
    const [, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSoftware = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/edit/admin/${idproduto}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                setSoftware(response.data);
            } catch (error) {
                console.error('Error fetching software:', error);
                setError('Error fetching software.');
            }
        };

        fetchSoftware();
    }, [idproduto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSoftware(prevSoftware => ({
            ...prevSoftware,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const convertToBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            };

            let logotipoBase64 = null;
            if (logotipo) {
                logotipoBase64 = await convertToBase64(logotipo);
            }

            let imagenssoftwareBase64 = null;
            if (imagenssoftware) {
                imagenssoftwareBase64 = await convertToBase64(imagenssoftware);
            }

            const updateData = {
                ...software,
                logotipo: logotipoBase64,
                imagenssoftware: imagenssoftwareBase64,
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };

            await axios.put(`http://localhost:3000/update/admin/${idproduto}`, updateData, config);

            window.alert('Software updated successfully!');
            navigate('/list/admin');
        } catch (error) {
            console.error('Error updating software:', error);
            setError('Error updating software.');
        }
    };

    const handleLogotipoChange = (e) => {
        setLogotipo(e.target.files[0]);
    };

    const handleImagensSoftwareChange = (e) => {
        setImagensSoftware(e.target.files[0]);
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
                <h2 class="tituloadmin">Update Software</h2>
                <div class="form-container">
                    <div class="row">
                        <div class="col-md-6">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" class="formadmin form-control" id="nome" name="nome" value={software.nome} onChange={handleChange} placeholder="Nome" />
                            <label htmlFor="descricao" class="mt-3">Descrição</label>
                            <textarea class="formadmin form-control" id="descricao" name="descricao" value={software.descricao} onChange={handleChange} rows="3" placeholder="Descrição"></textarea>
                            <label htmlFor="categoria" class="mt-3">Categoria</label>
                            <input type="text" class="formadmin form-control" id="categoria" name="categoria" value={software.categoria} onChange={handleChange} placeholder="Categoria" />
                            <label htmlFor="versao" class="mt-3">Versão do Software</label>
                            <input type="text" class="formadmin form-control" id="versao" name="versao" value={software.versao} onChange={handleChange} placeholder="Versão do Software" />
                            <label htmlFor="precoproduto" class="mt-3">Preço</label>
                            <input type="text" class="formadmin form-control" id="precoproduto" name="precoproduto" value={software.precoproduto} onChange={handleChange} placeholder="Preço" />
                        </div>
                        <div class="col-md-6">
                            <label htmlFor="logotipo" class="mt-3">Logotipo</label>
                            <div class="file-upload-container">
                                <input type="file" id="logotipo" class="formadmin form-control-file" onChange={handleLogotipoChange} />
                                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                                <button class="btn btn-primary">Selecionar arquivo</button>
                            </div>
                            <label htmlFor="imagenssoftware" class="mt-3">Imagens do Software</label>
                            <div class="file-upload-container">
                                <input type="file" id="imagenssoftware" class="formadmin form-control-file" onChange={handleImagensSoftwareChange} />
                                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                                <button class="btn btn-primary">Selecionar arquivo</button>
                            </div>
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

export default SoftwareUpdate;




