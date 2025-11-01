import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './notification.css';

const Notification = ({ reports, isOpen, onClose }) => {
  const { token } = useAuth();
  const [pendingReports, setPendingReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // API integration code - uncomment when backend is ready
  /*
  useEffect(() => {
    if (!isOpen) return;

    const fetchPendingReports = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/reports/pending', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPendingReports(data);
        } else {
          console.error('Failed to fetch pending reports');
          setPendingReports(reports.filter(report => report.status === 'Pending'));
        }
      } catch (error) {
        console.error('Error fetching pending reports:', error);
        setPendingReports(reports.filter(report => report.status === 'Pending'));
      } finally {
        setLoading(false);
      }
    };

    fetchPendingReports();
  }, [isOpen, token, reports]);
  */

  // Temporary useEffect for demo - remove when API is integrated
  useEffect(() => {
    if (!isOpen) return;
    setPendingReports(reports.filter(report => report.status === 'Pending'));
    setLoading(false);
  }, [isOpen, reports]);

  if (!isOpen) return null;

  return (
    <div className='notification-panel'>
      <div className='notification-header'>
        <h5>Pending Reports to Sync</h5>
        <button className='close-btn' onClick={onClose}>×</button>
      </div>
      <div className='notification-body'>
        {pendingReports.length > 0 ? (
          <ul className='notification-list'>
            {pendingReports.map((report) => (
              <li key={report.id} className='notification-item'>
                <div className='notification-item-header'>
                  <span className='report-id'>#{report.id}</span>
                  <span className='report-date'>{report.date}</span>
                </div>
                <div className='report-name'>{report.name}</div>
                <span className='status-badge pending'>Needs Sync</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className='no-notifications'>
            <p>No pending reports to sync</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
