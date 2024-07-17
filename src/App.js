import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/home';
import SignupComprador from './views/signup_comprador';
import Shop from './views/Shop';
import ShopProd from './views/ShopProd';
import Shopconfirm from './views/Shopconfirm';
import ShopSucess from './views/Shopsucess';
import EditAdmin from './views/EditAdmin';
import AddAdmin from './views/AddAdmin';
import ListAdmin from './views/ListAdmin';
import BudgetAdmin from './views/BudgetAdmin';
import BudgetAdminOrc from './views/BudgetAdminOrc';
import MetricsAdmin from './views/MetricsAdmin';
import Login from './views/Login';
import LoginAdmin from './views/LoginAdmin';
import SignTipo from './views/Sign_tipo';
import SignGestor from './views/Sign_gestor';
import SignSucess from './views/Sign_sucess';
import SignCGestor from './views/Sign_cGestor';
import Library from './views/Library';
import License from './views/License';
import ListClientAdmin from './views/ListClientAdmin';
import EditClientAdmin from './views/EditClientAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/comprador" element={<SignupComprador />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:idproduto/" element={<ShopProd />} />
        <Route path="/shop/cancel" element={<Shopconfirm />} />
        <Route path="/shop/sucess" element={<ShopSucess />} />
        <Route path="/edit/admin/:idproduto" element={<EditAdmin />} />
        <Route path="/add/admin" element={<AddAdmin />} />
        <Route path="/list/admin" element={<ListAdmin />} />
        <Route path="/budget/admin" element={<BudgetAdmin />} />
        <Route path="/budget/admin/:idorca" element={<BudgetAdminOrc />} />
        <Route path="/metrics/admin/" element={<MetricsAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/signin/tipo" element={<SignTipo />} />
        <Route path="/signin/gestor" element={<SignGestor />} />
        <Route path="/signin/sucess" element={<SignSucess />} />
        <Route path="/signin/c_gestor" element={<SignCGestor />} />
        <Route path="/library" element={<Library />} />
        <Route path="/license/:chaveproduto" element={<License />} />
        <Route path="/list/admin/clientes" element={<ListClientAdmin />} />
        <Route path="/edit/admin/clientes/:nif" element={<EditClientAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
