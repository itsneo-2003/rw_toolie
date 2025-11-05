import React from 'react';
import axios from 'axios';

function FavouritesSection({ userId, favourites = [], setFavourites, recentReports = [] }) {
  const [error, setError] = React.useState('');

  async function handleRemove(reportId) {
    if (!userId || !reportId) {
      setError('User or report ID missing!');
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8080/api/bookmarks?userId=${userId}&reportId=${reportId}`
      );
      setFavourites(favourites.filter(id => id !== reportId));
    } catch (err) {
      setError('Failed to remove favourite.');
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        Favourites
      </div>
      <div className="card-body">
        {error && <p className="text-danger">{error}</p>}
        {favourites.length === 0 ? (
          <p>No favourites yet. Click the ★ in Recent Reports to add!</p>
        ) : (
          <ul className="list-group">
            {favourites.map(reportId => {
              const report = recentReports.find(r => r.id === reportId);
              return (
                <li
                  key={reportId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {report
                      ? `${report.reportName} (${report.groupName})`
                      : `Report ID: ${reportId}`}
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(reportId)}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FavouritesSection;

