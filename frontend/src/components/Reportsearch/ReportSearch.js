import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReportSearch.css';
import reportsData from '../../Data/reports.json';

const ReportSearch = () => {
  const { token } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Static data for demo - will be replaced with API call when backend is ready
  const staticReports = reportsData;

  const handleSearch = async (searchText) => {
    const trimmed = searchText.trim();
    if (trimmed === "") {
      setResults([]);
      return;
    }

    setLoading(true);

    // API integration code - uncomment when backend is ready
    /*
    try {
      const response = await fetch(`http://localhost:8080/api/reports/search?q=${encodeURIComponent(trimmed)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error('Failed to search reports');
        // Fallback to static data
        const filtered = staticReports.filter((report) =>
          report.name?.toLowerCase().includes(trimmed.toLowerCase())
        );
        setResults(filtered);
      }
    } catch (error) {
      console.error('Error searching reports:', error);
      // Fallback to static data
      const filtered = staticReports.filter((report) =>
        report.name?.toLowerCase().includes(trimmed.toLowerCase())
      );
      setResults(filtered);
    } finally {
      setLoading(false);
    }
    */

    // Temporary static search for demo - remove when API is integrated
    const filtered = staticReports.filter((report) =>
      report.name?.toLowerCase().includes(trimmed.toLowerCase())
    );
    setResults(filtered);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <div className="report-search-container">
      <div className="search-bar-wrapper">
        <div className="search-input-group">
          <input
            type="text"
            className="form-control search-input"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter report name..."
          />
          <button
            className="btn btn-primary search-button"
            onClick={() => handleSearch(query)}
          >
            Search
          </button>
        </div>
      </div>

      <div className="search-results-wrapper">
        {results.length > 0 ? (
          <table className="table table-bordered search-results-table">
            <thead className="table-light">
              <tr>
                <th>Report Name</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.status}</td>
                  <td>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          query && <p className="no-results-message">No reports found.</p>
        )}
      </div>
    </div>
  );
};

export default ReportSearch;
