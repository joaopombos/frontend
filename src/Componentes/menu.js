import React, { useEffect, useState } from 'react';
export default function Sidebar() {
    return (
        <div className="d-flex">
            <div className="sidebar">
                <img src="frontend/public/images/Logos/logo.png" alt="Logo" className="logo" />
                <ul className="menu-options">
                    <li><a href="#Tickets"><i className="fas fa-ticket-alt"></i>Tickets</a></li>
                    <li><a href="#option2"><i className="fas fa-cog"></i>Atualizar/Editar Software</a></li>
                    <li><a href="#option3"><i className="fas fa-chart-line"></i>Adicionar Software</a></li>
                    <li><a href="#option4"><i className="fas fa-users"></i>Listar Softwares</a></li>
                    <li><a href="#option5"><i className="fas fa-envelope"></i>Orçamentos</a></li>
                    <li><a href="#option6"><i className="fas fa-sign-out-alt"></i>Métricas de vendas</a></li>
                </ul>
                <button className="btn-bottom">Terminar Sessão</button>
            </div>
        </div>
    );
}