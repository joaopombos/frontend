import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/ware.css'; // Importe o arquivo CSS separado

const AddSoftware = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [versao, setVersao] = useState('');
  const [precoproduto, setPrecoProduto] = useState('');
  const [logotipo, setLogotipo] = useState(null);
  const [imagenssoftware, setImagensSoftware] = useState(null);
  const [idproduto, setIdProduto] = useState('');
  const [idtipo, setIdTipo] = useState(''); // Adicionar estado para idtipo
  const [, setError] = useState('');

  // Função para lidar com a mudança de tipo (Software ou Addon)
  const handleTipoChange = (e) => {
    setIdTipo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      
      // Verificar se o token existe
      if (!token) {
        window.alert('Token de autenticação não encontrado.');
        return;
      }

      // Função para converter arquivo para base64
      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      };

      // Converter logotipo para base64
      const logotipoBase64 = logotipo ? await convertToBase64(logotipo) : null;
      // Converter imagens do software para base64
      const imagenssoftwareBase64 = imagenssoftware ? await convertToBase64(imagenssoftware) : null;

      // Dados do software a serem enviados
      const softwareData = {
        nome,
        descricao,
        categoria,
        versao,
        precoproduto,
        idproduto,
        logotipo: logotipoBase64,
        imagenssoftware: imagenssoftwareBase64,
        idtipo // Adicionando idtipo ao softwareData
      };

      console.log('Dados do software a serem enviados:', softwareData);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      console.log('Configuração da requisição:', config);

      console.log('Enviando requisição para adicionar software...');
      const response = await axios.post('postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/add/admin', softwareData, config);

      console.log('Resposta do servidor:', response.data);
      // Lógica de tratamento da resposta
      window.alert('Software adicionado com sucesso!');

      // Limpar campos após sucesso (opcional)
      setNome('');
      setDescricao('');
      setCategoria('');
      setVersao('');
      setPrecoProduto('');
      setIdProduto('');
      setLogotipo(null);
      setImagensSoftware(null);
      setIdTipo(''); // Limpar idtipo

    } catch (error) {
      console.error('Erro ao adicionar software:', error);
      // Tratamento de erro
      if (error.response) {
        console.error('Erro de resposta:', error.response.data);
        setError(error.response.data.error); // Define o erro para exibição na interface
        window.alert(`Erro ao adicionar software: ${error.response.data.error}`);
      } else if (error.request) {
        console.error('Erro de requisição:', error.request);
        window.alert('Erro ao adicionar software: Erro de requisição.');
      } else {
        console.error('Erro geral:', error.message);
        window.alert(`Erro ao adicionar software: ${error.message}`);
      }
    }
  };

  // Função para lidar com seleção de logotipo
  const handleLogotipoChange = (e) => {
    setLogotipo(e.target.files[0]);
  };

  // Função para lidar com seleção de imagens do software
  const handleImagensSoftwareChange = (e) => {
    setImagensSoftware(e.target.files[0]);
  };

  // Verificar se o usuário está autenticado (exemplo simples)
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
          <li class="active">
            <a href="/add/admin"><i class="fas fa-plus"></i> Adicionar Software/Addon</a>
          </li>
          <li>
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
        <h2 class="tituloadmin">Adicionar Software/Addon</h2>
        <div class="form-container">
          <div class="row">
            <div class="col-md-6">
              <label htmlFor="nome">Nome</label>
              <input type="text" class="formadmin form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
              <label htmlFor="descricao" class="mt-3">Descrição</label>
              <textarea class="formadmin form-control" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows="3" placeholder="Descrição"></textarea>
              <label htmlFor="categoria" class="mt-3">Categoria</label>
              <input type="text" class="formadmin form-control" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoria" />
              <label htmlFor="versao" class="mt-3">Versão do Software</label>
              <input type="text" class="formadmin form-control" id="versao" value={versao} onChange={(e) => setVersao(e.target.value)} placeholder="Versão do Software" />
              <label htmlFor="precoproduto" class="mt-3">Preço</label>
              <input type="text" class="formadmin form-control" id="precoproduto" value={precoproduto} onChange={(e) => setPrecoProduto(e.target.value)} placeholder="Preço" />
              <label htmlFor="idproduto" class="mt-3">ID do Produto</label>
              <input
                type="number"
                class="form-control"
                id="idproduto"
                value={idproduto}
                onChange={(e) => setIdProduto(e.target.value)}
                placeholder="ID do Produto"
              />
              <label htmlFor="idtipo" class="mt-3">Tipo</label>
              <select class="formadmin form-control" id="idtipo" value={idtipo} onChange={handleTipoChange}>
                <option value="">Selecione o tipo</option>
                <option value="1">Software</option>
                <option value="2">Addon</option>
              </select>
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

export default AddSoftware;

