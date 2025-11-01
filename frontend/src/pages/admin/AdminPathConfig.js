import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminPathConfig.css';

const AdminPathConfig = () => {
  const { token } = useAuth();
  const [alert, setAlert] = useState('');
  const [pathConfigs, setPathConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static data for demo - will be replaced with API call when backend is ready
  const staticPathConfigs = [
    {
      adGroup: 'Wealth Compliance',
      description: 'Compliance Reports',
      path: 'SG/Retail/Customer',
      reports: 'KYC Reports, Dormant Reports, AML Reports'
    },
    {
      adGroup: 'Wealth User Admin',
      description: 'Global User Management',
      path: 'Global/User',
      reports: 'Active User, Inactive User'
    }
  ];

  // API integration code - uncomment when backend is ready
  /*
  useEffect(() => {
    const fetchPathConfigs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/path-configs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPathConfigs(data);
        } else {
          console.error('Failed to fetch path configs');
          setPathConfigs(staticPathConfigs);
        }
      } catch (error) {
        console.error('Error fetching path configs:', error);
        setPathConfigs(staticPathConfigs);
      } finally {
        setLoading(false);
      }
    };

    fetchPathConfigs();
  }, [token]);
  */

  // Temporary useEffect for demo - remove when API is integrated
  useEffect(() => {
    setPathConfigs(staticPathConfigs);
    setLoading(false);
  }, []);

  const handleApiCall = async (config) => {
    try {
      const response = await fetch('http://localhost:8080/api/path-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setAlert('API call successful!');
      } else {
        setAlert('API call failed!');
      }
    } catch (error) {
      console.error('Error calling API:', error);
      setAlert('API call failed!');
    }

    setTimeout(() => setAlert(''), 3000);
  };

  return (
    <div className="admin-path-config">
      <h2>Path Configuration</h2>
      <table className="path-config-table">
        <thead>
          <tr>
            <th>AD Group</th>
            <th>Description</th>
            <th>Path</th>
            <th>Reports</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pathConfigs.map((config, index) => (
            <tr key={index}>
              <td>{config.adGroup}</td>
              <td>{config.description}</td>
              <td>{config.path}</td>
              <td>{config.reports}</td>
              <td>
                <button
                  className="call-api-btn"
                  onClick={() => handleApiCall(config)}
                >
                  Call API
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {alert && <div className="alert">{alert}</div>}
    </div>
  );
};

export default AdminPathConfig;
