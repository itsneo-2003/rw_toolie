import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserNotification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    if (!userId) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:8080/api/notifications/user/${userId}`);
      setNotifications(res.data);  // Expected: array of { id, message, status, createdAt, isRead }
    } catch (err) {
      setError('Could not load notifications');
    } finally {
      setLoading(false);
    }
  };

  // Load notifications on mount and when userId changes
  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.post(`http://localhost:8080/api/notifications/${notificationId}/read`);
      setNotifications(notifications.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
      ));
    } catch (err) {
      setError('Failed to mark as read.');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Notification Bell Icon */}
      <span
        className="bi bi-bell"
        style={{ fontSize: '1.8rem', cursor: 'pointer', color: unreadCount ? '#dc3545' : '#555' }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        title={`${unreadCount} unread notifications`}
      ></span>

      {/* Unread badge */}
      {unreadCount > 0 && (
        <span style={{
          position: 'absolute',
          top: 0,
          right: 0,
          background: '#dc3545',
          color: 'white',
          borderRadius: '50%',
          padding: '2px 6px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          userSelect: 'none',
          transform: 'translate(50%, -50%)'
        }}>
          {unreadCount}
        </span>
      )}

      {/* Dropdown Content */}
      {dropdownOpen && (
        <div style={{
          position: 'absolute',
          top: '30px',
          right: 0,
          width: '280px',
          maxHeight: '360px',
          overflowY: 'auto',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 1000,
          padding: '10px'
        }}>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && notifications.length === 0 && (
            <p style={{ color: '#666' }}>No notifications.</p>
          )}
          {!loading && !error && notifications.length > 0 && notifications.map(notification => (
            <div
              key={notification.id}
              style={{
                padding: '8px',
                borderBottom: '1px solid #eee',
                backgroundColor: notification.isRead ? '#f9f9f9' : '#e6f7ff',
                cursor: 'pointer'
              }}
              onClick={() => markAsRead(notification.id)}
              title="Click to mark as read"
            >
              <div style={{ fontWeight: notification.isRead ? 'normal' : 'bold' }}>
                {notification.message}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>
                {new Date(notification.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserNotification;

