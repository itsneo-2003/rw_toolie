import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './User_Subscribe.css';

const User_Subscribe = () => {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [availableGroups, setAvailableGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticAvailableGroups = [
    { id: 1, name: 'Treasury Group', description: 'Access to treasury and cash management reports' },
    { id: 2, name: 'Operations Group', description: 'Operational reports and metrics' },
    { id: 3, name: 'Compliance Group', description: 'Regulatory and compliance reports' },
    { id: 4, name: 'Analytics Group', description: 'Business intelligence and analytics' },
    { id: 5, name: 'Marketing Group', description: 'Marketing campaigns and customer insights' },
    { id: 6, name: 'HR Group', description: 'Human resources and employee data' },
    { id: 7, name: 'IT Security Group', description: 'Security reports and incident tracking' },
    { id: 8, name: 'Finance Group', description: 'Financial statements and budgets' },
  ];


    // API integration code - uncomment when backend is ready
  /*
  useEffect(() => {
    const fetchAvailableGroups = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/groups/available', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAvailableGroups(data);
        } else {
          console.error('Failed to fetch available groups');
          setAvailableGroups(staticAvailableGroups);
        }
      } catch (error) {
        console.error('Error fetching available groups:', error);
        setAvailableGroups(staticAvailableGroups);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableGroups();
  }, [token]);
  */

  // Temporary useEffect for demo - remove when API is integrated
  useEffect(() => {
    setAvailableGroups(staticAvailableGroups);
    setLoading(false);
  }, []);


  const filteredGroups = availableGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubscribe = (groupName) => {
    alert(`Subscription request sent for: ${groupName}`);
  };

  return (
    <div className="subscribe-container container-fluid py-4">
      <div className="text-center mb-5">
        <h2 className="subscribe-title">Subscribe to Groups</h2>
        <p className="subscribe-subtitle">
          Explore available groups and request access instantly
        </p>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-6 col-lg-5">
          <div className="input-group subscribe-search-box shadow-sm rounded">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-primary"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="btn btn-outline-secondary"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Loading available groups...</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <div className="col-md-6 col-lg-4" key={group.id}>
                <div className="card subscribe-group-card h-100">
                  <div className="card-body text-center">
                    <h5 className="subscribe-group-title">{group.name}</h5>
                    <p className="subscribe-group-description">{group.description}</p>
                    <div className="d-grid">
                      <button
                        className="subscribe-btn btn"
                        onClick={() => handleSubscribe(group.name)}
                      >
                        <i className="bi bi-plus-circle me-2"></i>Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <i className="bi bi-inbox display-1 text-muted"></i>
              <h5 className="mt-3 text-muted">No groups found</h5>
              <p className="text-muted">Try adjusting your search keywords</p>
            </div>
          )}
        </div>
      )}

      <div className="card mt-5 shadow-sm bg-light border-0">
        <div className="card-body">
          <h6 className="fw-bold text-primary mb-3">
            <i className="bi bi-info-circle me-2"></i>Subscription Information
          </h6>
          <ul className="text-muted small mb-0">
            <li>Subscription requests are reviewed by administrators.</li>
            <li>You’ll receive a notification once your request is processed.</li>
            <li>Access is typically granted within 24–48 hours.</li>
            <li>Track your status in the “Subscription Status” page.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User_Subscribe;
