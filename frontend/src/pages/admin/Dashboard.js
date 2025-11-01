import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 150,
    pendingRequests: 7,
    approvedToday: 45
  });
  const [loading, setLoading] = useState(true);

  // Static data for demo - will be replaced with API call when backend is ready
  const staticRequests = [
    { id: 1, bankId: 'BNK001', username: 'john.doe', adGroup: 'Finance_Team', status: 'Pending' },
    { id: 2, bankId: 'BNK002', username: 'jane.smith', adGroup: 'IT_Admin', status: 'Pending' },
    { id: 3, bankId: 'BNK003', username: 'mike.johnson', adGroup: 'HR_Department', status: 'Pending' },
    { id: 4, bankId: 'BNK004', username: 'sarah.williams', adGroup: 'Marketing_Team', status: 'Pending' },
    { id: 5, bankId: 'BNK005', username: 'tom.brown', adGroup: 'Sales_Team', status: 'Pending' },
    { id: 6, bankId: 'BNK006', username: 'emily.davis', adGroup: 'Finance_Team', status: 'Pending' },
    { id: 7, bankId: 'BNK007', username: 'david.wilson', adGroup: 'IT_Admin', status: 'Pending' }
  ];

  // API integration code - uncomment when backend is ready
  /*
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch statistics
        const statsResponse = await fetch('http://localhost:8080/api/admin/stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // Fetch access requests
        const requestsResponse = await fetch('http://localhost:8080/api/access-requests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (requestsResponse.ok) {
          const requestsData = await requestsResponse.json();
          setRequests(requestsData);
        } else {
          setRequests(staticRequests);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setRequests(staticRequests);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    } else {
      setRequests(staticRequests);
      setLoading(false);
    }
  }, [token]);
  */

  // Temporary useEffect for demo - remove when API is integrated
  useEffect(() => {
    setRequests(staticRequests);
    setLoading(false);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAdGroup, setFilterAdGroup] = useState('');

  const handleGrantAccess = async (requestId) => {
    try {
      // Commented API call - uncomment when backend is ready
      /*
      const response = await fetch(`http://localhost:8080/api/access-requests/${requestId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert(`Access granted for request ID: ${requestId}`);
        // Refresh the requests list
        setRequests(requests.filter(req => req.id !== requestId));
      } else {
        alert('Failed to grant access');
      }
      */

      // Static behavior for demo
      alert(`Access granted for request ID: ${requestId}`);
    } catch (error) {
      console.error('Error granting access:', error);
      alert('Failed to grant access');
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.id.toString().includes(searchTerm) ||
      request.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.adGroup.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAdGroup = filterAdGroup === '' || request.adGroup === filterAdGroup;

    return matchesSearch && matchesAdGroup;
  });

  const uniqueAdGroups = [...new Set(requests.map(r => r.adGroup))];

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Dashboard</h2>
        <p className="text-muted">Access Request Management</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon bg-primary">
                <i className="bi bi-people"></i>
              </div>
              <div>
                <h3 className="fs-2 fw-bold mb-0 text-dark">{stats.totalUsers}</h3>
                <p className="mb-0 text-muted small">Total Users</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon bg-warning">
                <i className="bi bi-clock-history"></i>
              </div>
              <div>
                <h3 className="fs-2 fw-bold mb-0 text-dark">{requests.length}</h3>
                <p className="mb-0 text-muted small">Pending Requests</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon bg-success">
                <i className="bi bi-check-circle"></i>
              </div>
              <div>
                <h3 className="fs-2 fw-bold mb-0 text-dark">{stats.approvedToday}</h3>
                <p className="mb-0 text-muted small">Approved Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-3">Filter Requests</h5>
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label small text-muted">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID, username, or AD group..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label className="form-label small text-muted">Filter by AD Group</label>
              <select
                className="form-select"
                value={filterAdGroup}
                onChange={(e) => setFilterAdGroup(e.target.value)}
              >
                <option value="">All Groups</option>
                {uniqueAdGroups.map((group, index) => (
                  <option key={index} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('');
                  setFilterAdGroup('');
                }}
              >
                <i className="bi bi-x-circle me-2"></i>
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="fw-bold text-dark p-3">Bank ID</th>
                  <th className="fw-bold text-dark p-3">Username</th>
                  <th className="fw-bold text-dark p-3">AD Group</th>
                  <th className="fw-bold text-dark p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="p-3 align-middle">
                        <span className="bank-id-badge">{request.bankId}</span>
                      </td>
                      <td className="p-3 align-middle">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-circle me-2 fs-5 text-secondary"></i>
                          {request.username}
                        </div>
                      </td>
                      <td className="p-3 align-middle">{request.adGroup}</td>
                      <td className="p-3 align-middle">
                        <button 
                          className="btn btn-grant-access px-3 py-2"
                          onClick={() => handleGrantAccess(request.id)}
                        >
                          <i className="bi bi-check-circle me-2"></i>
                          Grant Access
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No requests found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
