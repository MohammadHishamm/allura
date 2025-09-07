import React from 'react';

const AdminHome: React.FC = () => {
  return (
    <div className="admin-home">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* KPI Cards Row */}
      <div className="kpi-cards-row">
        <div className="kpi-card">
          <div className="kpi-content">
            <div className="kpi-main">
              <h3 className="kpi-value">$24k</h3>
              <p className="kpi-label">Budget</p>
            </div>
            <div className="kpi-change positive">
              <span className="change-icon">↑</span>
              <span className="change-text">12% Since last month</span>
            </div>
          </div>
          <div className="kpi-icon budget">💰</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-content">
            <div className="kpi-main">
              <h3 className="kpi-value">1.6k</h3>
              <p className="kpi-label">Total Customers</p>
            </div>
            <div className="kpi-change negative">
              <span className="change-icon">↓</span>
              <span className="change-text">16% Since last month</span>
            </div>
          </div>
          <div className="kpi-icon customers">👥</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-content">
            <div className="kpi-main">
              <h3 className="kpi-value">75.5%</h3>
              <p className="kpi-label">Task Progress</p>
            </div>
            <div className="kpi-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75.5%' }}></div>
              </div>
            </div>
          </div>
          <div className="kpi-icon progress">📊</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-content">
            <div className="kpi-main">
              <h3 className="kpi-value">$15k</h3>
              <p className="kpi-label">Total Profit</p>
            </div>
            <div className="kpi-change positive">
              <span className="change-icon">↑</span>
              <span className="change-text">8% Since last month</span>
            </div>
          </div>
          <div className="kpi-icon profit">💎</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card sales-chart">
          <div className="chart-header">
            <h3 className="chart-title">Sales</h3>
            <button className="sync-button">🔄</button>
          </div>
          <div className="sales-chart-container">
            <div className="chart-bars">
              {[
                { month: 'Jan', value: 12, value2: 8 },
                { month: 'Feb', value: 15, value2: 10 },
                { month: 'Mar', value: 18, value2: 12 },
                { month: 'Apr', value: 14, value2: 9 },
                { month: 'May', value: 20, value2: 15 },
                { month: 'Jun', value: 16, value2: 11 },
                { month: 'Jul', value: 22, value2: 17 },
                { month: 'Aug', value: 19, value2: 14 },
                { month: 'Sep', value: 25, value2: 20 },
                { month: 'Oct', value: 21, value2: 16 },
                { month: 'Nov', value: 24, value2: 19 },
                { month: 'Dec', value: 28, value2: 22 }
              ].map((data, index) => (
                <div key={index} className="bar-group">
                  <div className="bar bar-1" style={{ height: `${(data.value / 30) * 100}%` }}></div>
                  <div className="bar bar-2" style={{ height: `${(data.value2 / 30) * 100}%` }}></div>
                  <span className="bar-month">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="chart-y-axis">
              <span>20K</span>
              <span>15K</span>
              <span>10K</span>
              <span>5K</span>
              <span>0</span>
            </div>
          </div>
        </div>

        <div className="chart-card traffic-chart">
          <div className="chart-header">
            <h3 className="chart-title">Traffic source</h3>
          </div>
          <div className="traffic-chart-container">
            <div className="donut-chart">
              <div className="donut-ring">
                <div className="donut-segment desktop" style={{ '--percentage': '63%' } as React.CSSProperties}></div>
                <div className="donut-segment tablet" style={{ '--percentage': '15%' } as React.CSSProperties}></div>
                <div className="donut-segment phone" style={{ '--percentage': '22%' } as React.CSSProperties}></div>
              </div>
              <div className="donut-center">
                <span className="center-value">100%</span>
              </div>
            </div>
            <div className="traffic-legend">
              <div className="legend-item">
                <div className="legend-color desktop"></div>
                <span className="legend-label">Desktop 63%</span>
              </div>
              <div className="legend-item">
                <div className="legend-color tablet"></div>
                <span className="legend-label">Tablet 15%</span>
              </div>
              <div className="legend-item">
                <div className="legend-color phone"></div>
                <span className="legend-label">Phone 22%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
