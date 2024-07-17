import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import '../CSS/ware.css';

const Metrics = () => {
  const totalPriceChartRef = useRef(null);
  const averagePriceChartRef = useRef(null);
  const totalBudgetsChartRef = useRef(null);
  const [, setMetrics] = useState({ totalCost: 0, averageCost: 0, totalBudgets: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('postgresql://warebd_user:MkoQDynXsw6PcSzyF1hHhi4aBPTZWUeh@dpg-cpup1qqj1k6c738f3fbg-a/warebd/metrics/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setMetrics(response.data);
        createCharts(response.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setError('Error fetching metrics');
      }
    };

    fetchMetrics();
  }, []);

  const createCharts = (data) => {
    const { totalCost, averageCost, totalBudgets } = data;

    const createChart = (ctx, label, data, backgroundColor, borderColor) => {
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [label],
          datasets: [{
            label,
            data: [data],
            backgroundColor,
            borderColor,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    if (totalPriceChartRef.current) totalPriceChartRef.current.destroy();
    if (averagePriceChartRef.current) averagePriceChartRef.current.destroy();
    if (totalBudgetsChartRef.current) totalBudgetsChartRef.current.destroy();

    totalPriceChartRef.current = createChart(document.getElementById('totalPriceChart'), 'Preço total', totalCost, 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)');
    averagePriceChartRef.current = createChart(document.getElementById('averagePriceChart'), 'Média de preço', averageCost, 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)');
    totalBudgetsChartRef.current = createChart(document.getElementById('totalBudgetsChart'), 'Total de Orçamentos', totalBudgets, 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)');
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
          <li>
            <a href="/list/admin"><i class="fas fa-list"></i> Listar Softwares/Addons</a>
          </li>
          <li>
            <a href="/list/admin/clientes"><i class="fas fa-list"></i> Listar Clientes</a>
          </li>
          <li>
            <a href="/budget/admin"><i class="fas fa-file-invoice-dollar"></i> Orçamentos</a>
          </li>
          <li class="active">
            <a href="/metrics/admin"><i class="fas fa-chart-line"></i> Métricas de vendas</a>
          </li>
        </ul>
        <div class="logout-button">
          <a href="/" class="btn btn-primary">Terminar Sessão</a>
        </div>
      </div>

      <div id="content">
        <h2 class="tituloadmin">Métricas de vendas</h2>
        {error && <div class="alert alert-danger">{error}</div>}
        <div class="chart-wrapper">
          <div class="chart-container">
            <h5 class="card-title">Preço total</h5>
            <canvas id="totalPriceChart"></canvas>
          </div>
          <div class="chart-container">
            <h5 class="card-title">Média de preço</h5>
            <canvas id="averagePriceChart"></canvas>
          </div>
          <div class="chart-container">
            <h5 class="card-title">Total de Orçamentos</h5>
            <canvas id="totalBudgetsChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Metrics;
