import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Dashboard.css";
import ReportSearch from "../../components/Reportsearch/ReportSearch";
import FavouritesSection from "./FavouritesSection";
import UserNotification from "../../components/notification/UserNotification";
import axios from "axios";

const Dashboard = () => {
  const { user, userObj } = useAuth();
  const [subscribedGroups, setSubscribedGroups] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedReports, setSelectedReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const email = "user1@example.com";
  const groupsPerPage = 4;

  // 🔹 Load dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const groupsRes = await axios.get(
          `http://localhost:8080/api/users/subscribed-groups?email=${email}`
        );
        setSubscribedGroups(groupsRes.data || []);

        const reportsRes = await axios.get(
          `http://localhost:8080/api/users/recent-reports?email=${email}`
        );
        const formattedReports = reportsRes.data.map((r) => ({
          id: r.id,
          reportName: r.name,
          groupName: r.groupName,
          dateAccessed: r.date ? r.date : "N/A",
        }));
        setRecentReports(formattedReports);

        if (userObj?.id) {
          const favRes = await axios.get(
            `http://localhost:8080/api/bookmarks/user/${userObj.id}`
          );
          setFavourites(favRes.data.map((fav) => fav.reportId));
        }
      } catch {
        setSubscribedGroups([]);
        setRecentReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userObj]);

  // 🔹 Fetch reports for selected group
  const handleGroupClick = async (group) => {
    setSelectedGroup(group);
    setSelectedReports([]);
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/groups/${group.id}/reports`
      );
      const formattedReports = res.data.map((r) => ({
        id: r.id,
        reportName: r.name,
        groupName: r.group?.name || group.name,
        dateAccessed: r.date ? r.date : "N/A",
      }));
      setRecentReports(formattedReports);
    } catch {
      setRecentReports([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Back to recent reports
  const handleBackToRecent = async () => {
    setSelectedGroup(null);
    setSelectedReports([]);
    setLoading(true);

    try {
      const reportsRes = await axios.get(
        `http://localhost:8080/api/users/recent-reports?email=${email}`
      );
      const formattedReports = reportsRes.data.map((r) => ({
        id: r.id,
        reportName: r.name,
        groupName: r.groupName,
        dateAccessed: r.date ? r.date : "N/A",
      }));
      setRecentReports(formattedReports);
    } catch {
      setRecentReports([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Pagination
  const totalPages = Math.ceil(subscribedGroups.length / groupsPerPage);
  const currentGroups = subscribedGroups.slice(
    currentIndex * groupsPerPage,
    (currentIndex + 1) * groupsPerPage
  );

  const handlePrevious = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));

  // 🔹 Selection
  const handleCheckboxChange = (id) =>
    setSelectedReports((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleSelectAll = (e) =>
    setSelectedReports(e.target.checked ? recentReports.map((r) => r.id) : []);

  // 🔹 Dummy ZIP bulk download
  const handleBulkDownload = () => {
    if (selectedReports.length === 0) return;
    const link = document.createElement("a");
    link.href = "/sample.zip";
    link.download = `Reports_${selectedReports.length}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🔹 Dummy PDF individual download
  const handleIndividualDownload = (id, name) => {
    const link = document.createElement("a");
    link.href = "/sample.pdf";
    link.download = `${name.replace(/\.[^/.]+$/, "")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🔹 Toggle bookmark
  const handleStarToggle = async (report) => {
    if (!userObj?.id || !report.id) return;
    const isFav = favourites.includes(report.id);
    try {
      if (isFav) {
        await axios.delete(
          `http://localhost:8080/api/bookmarks?userId=${userObj.id}&reportId=${report.id}`
        );
        setFavourites(favourites.filter((id) => id !== report.id));
      } else {
        await axios.post(
          `http://localhost:8080/api/bookmarks?userId=${userObj.id}&reportId=${report.id}`
        );
        setFavourites([...favourites, report.id]);
      }
    } catch {}
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="container-fluid p-4">
      <div className="dashboard-header mb-4">
        <div className="dashboard-header-left">
          <h2 className="fw-bold text-dark mb-1">User Dashboard</h2>
          <p className="text-muted">Welcome back!</p>
        </div>
        <div className="dashboard-header-right">
          <ReportSearch />
          <UserNotification userId={userObj?.id} />
        </div>
      </div>

      {/* ✅ Favourites Section Inserted Here */}
      
        <FavouritesSection
          
        />
      

      {/* Groups */}
      <div className="groups-section mb-4">
        <h5 className="text-dark mb-3">My Subscribed Groups</h5>
        <div className="groups-carousel position-relative">
          <button className="carousel-btn carousel-btn-prev" onClick={handlePrevious} disabled={currentIndex === 0}>
            ‹
          </button>

          <div className="groups-grid-container">
            <div className="row g-3">
              {currentGroups.map((group) => (
                <div key={group.id} className="col-md-3">
                  <div className="card h-100 group-card" onClick={() => handleGroupClick(group)}>
                    <div className="card-body text-center">
                      <div className="group-icon mb-2">🏷️</div>
                      <h6 className="card-title group-card-title">{group.name}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn carousel-btn-next" onClick={handleNext} disabled={currentIndex === totalPages - 1}>
            ›
          </button>
        </div>

        <div className="page-indicator text-muted mt-2">
          Page {currentIndex + 1} of {totalPages}
        </div>
      </div>

      {/* Reports */}
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <div>
            {selectedGroup && (
              <button className="btn btn-outline-secondary btn-sm me-3" onClick={handleBackToRecent}>
                <i className="bi bi-arrow-left me-2"></i>Back
              </button>
            )}
            <h5 className="d-inline">
              {selectedGroup ? `${selectedGroup.name} Reports` : "Recent Reports"}
            </h5>
          </div>

          <button className="btn btn-success btn-sm" disabled={selectedReports.length === 0} onClick={handleBulkDownload}>
            <i className="bi bi-download me-2"></i>
            Download Selected ({selectedReports.length})
          </button>
        </div>

        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Report Name</th>
                <th>Group</th>
                <th>Date Accessed</th>
                <th style={{ textAlign: "center" }}>★</th>
                <th style={{ textAlign: "center" }}>⬇</th>
                <th style={{ textAlign: "center" }}>
                  <input type="checkbox" className="form-check-input" onChange={handleSelectAll}
                    checked={selectedReports.length === recentReports.length && recentReports.length > 0} />
                </th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report, i) => (
                <tr key={report.id}>
                  <td>{i + 1}</td>
                  <td>{report.reportName}</td>
                  <td>{report.groupName}</td>
                  <td>{report.dateAccessed}</td>
                  <td style={{ textAlign: "center" }}>
                    <i
                      className={`bi ${favourites.includes(report.id) ? "bi-star-fill text-warning" : "bi-star"} action-icon`}
                      onClick={() => handleStarToggle(report)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <i
                      className="bi bi-download action-icon"
                      onClick={() => handleIndividualDownload(report.id, report.reportName)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input type="checkbox" className="form-check-input"
                      checked={selectedReports.includes(report.id)}
                      onChange={() => handleCheckboxChange(report.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
