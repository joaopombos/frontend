import React, { useEffect, useState } from 'react';
export default function PricingCard() {
    return (
        <div className="col-lg-4 col-md-12 mb-4">
            <div className="card h-80 shadow-lg">
                <div className="card-body">
                    <div className="text-center p-3">
                        <h5 className="card-title">Pequenas Empresas</h5>
                        <br />
                        <span className="h2">€</span>/preço unitário
                        <br /><br />
                    </div>
                    <h4 style={{ textAlign: 'center' }}>-10% de desconto</h4>
                    <p className="card-text" style={{ textAlign: 'center' }}>A partir de 50 licenças e máximo de 100.</p>
                </div>
                <div className="card-body text-center">
                    <button className="btn btn-outline-dark btn-lg" style={{ borderRadius: '30px' }}>Selecionar</button>
                </div>
            </div>
        </div>
    );
}