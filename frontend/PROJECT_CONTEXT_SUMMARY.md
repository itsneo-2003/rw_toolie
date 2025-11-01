# React Application - Complete Project Context

## Project Overview
This is a React-based web application for Standard Chartered GBS Bank with role-based access control for Admin, User, and Operations roles.

---

## Project Structure

```
react-app/
├── src/
│   ├── App.js                          # Main app component with routing
│   ├── index.js                        # Entry point
│   ├── components/
│   │   ├── Navbar/                     # Navigation bar with user dropdown
│   │   ├── Sidebar/                    # Role-based sidebar navigation
│   │   ├── Reportsearch/               # Search component for reports
│   │   ├── notification/               # Notification panel for pending reports
│   │   ├── ErrorBoundary/              # Error handling component
│   │   └── ProtectedRoute/             # Route protection component
│   ├── context/
│   │   └── AuthContext.js              # Authentication context provider
│   ├── pages/
│   │   ├── LoginPage/                  # Login screen
│   │   ├── admin/                      # Admin dashboard, users, path config
│   │   ├── user/                       # User dashboard, subscriptions
│   │   └── operations/                 # Operations dashboard with sync
│   └── Data/
│       ├── reports.json                # Report data with group attribute
│       └── Images/                     # Application images
├── public/
│   └── index.html                      # HTML template
├── docs/                               # Documentation files
├── package.json                        # Dependencies
└── webpack.config.js                   # Webpack configuration
```

---

## Key Features

### 1. Authentication System
- **Login Credentials**:
  - Admin: `admin@sc.com` / `123`
  - User: `user@sc.com` / `123`
  - Operations: `operations@sc.com` / `123`
- **AuthContext**: Manages user state, role, login/logout
- **LocalStorage**: Persists user session
- **Protected Routes**: Role-based access control

### 2. Role-Based Dashboards

#### Admin Dashboard
- View and manage access requests
- Grant access to users for AD groups
- User management
- Path configuration
- Statistics: Total users, pending requests, active groups

#### User Dashboard
- View subscribed groups (carousel with 4 groups per page)
- Search reports functionality
- Recent reports table with:
  - Bookmark feature
  - Individual download
  - Bulk download with checkboxes
- Subscription status page
- Subscribe to new groups page

#### Operations Dashboard
- **Reports to be Synced**: Table showing pending reports
- **Sync Functionality**: 
  - Individual sync per report
  - Sync all pending reports
  - Progress indicator during sync
- **Transfer Logs**: 
  - Searchable log history
  - Date range filtering
  - Shows: ID, Report Name, Report Date, Status, Folder, Transfer Time
- **Bell Icon Notification**: 
  - Shows count of pending reports
  - Notification panel with pending report details
- **Summary Cards**: Total, Synced, and Pending reports count

### 3. Navigation Components

#### Navbar
- Standard Chartered GBS branding
- User profile dropdown with logout
- Responsive design
- Click-outside-to-close functionality

#### Sidebar
- Dynamic navigation based on user role
- Admin: Dashboard, Users, Path Configuration
- User: Dashboard, Subscription Status, Subscribe to Groups
- Operations: Operations Dashboard
- Bootstrap icons for menu items

---

## Recent Updates & Changes

### Latest Session (Operations Page Update)
**Date**: January 2025

**Changes Made**:
1. Fixed import path in OpsPage.js from `../data/reports.json` to `../../Data/reports.json`
2. Added bell icon notification feature with badge showing pending report count
3. Integrated Notification component to display pending reports
4. Updated header layout with bell icon on the right side
5. Added `group` attribute to reports.json for categorization

### Previous Session (Login & Dashboard Updates)
**Changes Made**:
1. **Login Page**:
   - Moved Show/Hide password button outside input field
   - Styled as blue button with proper borders
   - Removed focus effects from input fields
   
2. **User Dashboard**:
   - Restored original layout with search bar at top right
   - Changed "Subscribed Groups" to plain "My subscribed Groups" heading
   - Removed card wrapper and blue background from groups section
   - Maintained carousel functionality with dark-bordered group cards

### Code Simplification Session
**Changes Made**:
1. Removed unused/commented code across all files
2. Added ErrorBoundary component for error handling
3. Added ProtectedRoute component for route protection
4. Cleaned up imports and removed redundant code
5. Improved code organization and readability

---

## Technical Stack

### Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.9.4",
  "bootstrap": "^5.3.8",
  "bootstrap-icons": "^1.13.1"
}
```

### Dev Dependencies
- Webpack 5
- Babel (React, ES6+)
- CSS Loader, Style Loader
- Webpack Dev Server

### Build Configuration
- **Development**: `npm start` - Runs on localhost:3000
- **Production**: `npm run build` - Creates optimized build

---

## Data Structure

### reports.json
```json
{
  "id": 1,
  "name": "Sales Report Jan",
  "date": "2025-10-01",
  "group": "Sales"
}
```

**Groups**: Sales, Finance, HR, Marketing, Inventory

---

## Styling Approach

### CSS Files
- Component-specific CSS files (e.g., `Navbar.css`, `Dashboard.css`)
- Bootstrap 5 for layout and utilities
- Bootstrap Icons for iconography
- Custom CSS for specific styling needs

### Design Patterns
- Flexbox for layouts
- Grid system from Bootstrap
- Responsive design with media queries
- Card-based UI components
- Table-based data display

---

## Key Components Explained

### 1. AuthContext
- Provides authentication state to entire app
- Methods: `login()`, `logout()`
- Properties: `user`, `userRole`, `isAuthenticated`
- Persists to localStorage

### 2. Notification Component
- Displays pending reports in a panel
- Props: `reports`, `isOpen`, `onClose`
- Shows report ID, name, date, and status
- Styled with custom CSS

### 3. ReportSearch Component
- Search functionality for reports
- Filters by report name
- Displays results in a table
- Used in User Dashboard

### 4. Sidebar Component
- Dynamic navigation based on role
- Uses NavLink for active state
- Bootstrap icons for menu items
- Footer with copyright

### 5. Navbar Component
- User profile with dropdown
- Logout functionality
- Click-outside-to-close
- Responsive design

---

## Routing Structure

```javascript
/ or /login              → LoginScreen
/User/Dashboard          → User Dashboard
/subscription_status     → Subscription Status
/user_subscribe          → Subscribe to Groups
/Admin/Dashboard         → Admin Dashboard
/users                   → Users Management
/path_configuration      → Path Configuration
/OpsPage/OpsPage         → Operations Dashboard
```

---

## State Management

### Local State (useState)
- Component-level state for UI interactions
- Form inputs, toggles, selections
- Temporary data like search queries

### Context State (AuthContext)
- Global authentication state
- User information and role
- Shared across all components

### LocalStorage
- Persists user session
- Stores: `user` (email), `userRole`
- Cleared on logout

---

## Features by Role

### Admin Features
- ✅ View access requests
- ✅ Grant access to users
- ✅ Manage users
- ✅ Configure paths
- ✅ View statistics

### User Features
- ✅ View subscribed groups (carousel)
- ✅ Search reports
- ✅ Bookmark reports
- ✅ Download reports (individual/bulk)
- ✅ View subscription status
- ✅ Subscribe to new groups

### Operations Features
- ✅ View pending reports
- ✅ Sync individual reports
- ✅ Sync all reports
- ✅ View transfer logs
- ✅ Search and filter logs
- ✅ Date range filtering
- ✅ Bell notification with pending count
- ✅ View summary statistics

---

## Development Workflow

### Git Repository
- **URL**: https://github.com/Harsh-kumar-git/FinalYearProject.git
- **Branch**: main
- **Recent Commits**:
  1. Operations page update with bell notification
  2. Login page and dashboard styling updates
  3. Code simplification and cleanup

### Running the Application
1. Install dependencies: `npm install`
2. Start dev server: `npm start`
3. Access at: `http://localhost:3000`
4. Login with appropriate credentials

### Making Changes
1. Edit files in `src/` directory
2. Webpack hot-reloads changes automatically
3. Test in browser
4. Commit changes: `git add .` → `git commit -m "message"` → `git push origin main`

---

## Common Issues & Solutions

### Issue: Port 3000 already in use
**Solution**: Kill the process or use a different port

### Issue: Import path errors
**Solution**: Use correct relative paths (e.g., `../../Data/reports.json`)

### Issue: Bootstrap icons not showing
**Solution**: Ensure `bootstrap-icons` is imported in component

### Issue: State not persisting
**Solution**: Check localStorage implementation in AuthContext

---

## Future Enhancements (Potential)

- Backend API integration
- Real database instead of JSON files
- Advanced search and filtering
- Export functionality for reports
- Email notifications
- User profile management
- Advanced analytics dashboard
- Multi-language support
- Dark mode theme

---

## Documentation Files

Located in `docs/` folder:
- ADMIN_PANEL_SUMMARY.md
- CODE_REVIEW_REPORT.md
- DEBUGGING_REPORT.md
- DYNAMIC_SIDEBAR_IMPLEMENTATION.md
- INTEGRATION_SUMMARY.md
- LAYOUT_FIX_SUMMARY.md
- LOGIN_CSS_FIX_EXPLANATION.md
- NAVBAR_DROPDOWN_FINAL_FIX.md
- And more...

Root level:
- CODE_REVIEW_SUMMARY.md
- CODE_SIMPLIFICATION_SUMMARY.md
- OPSPAGE_UPDATE_SUMMARY.md

---

## Contact & Support

For questions or issues:
1. Check documentation files in `docs/` folder
2. Review commit history on GitHub
3. Check this PROJECT_CONTEXT_SUMMARY.md file

---

## Quick Reference

### Login Credentials
```
Admin:      admin@sc.com / 123
User:       user@sc.com / 123
Operations: operations@sc.com / 123
```

### Important Paths
```
Reports Data:    src/Data/reports.json
Auth Context:    src/context/AuthContext.js
Main App:        src/App.js
Navbar:          src/components/Navbar/Navbar.js
Sidebar:         src/components/Sidebar/Sidebar.js
```

### Key Commands
```bash
npm install          # Install dependencies
npm start            # Start development server
npm run build        # Build for production
git add .            # Stage changes
git commit -m "msg"  # Commit changes
git push origin main # Push to GitHub
```

---

**Last Updated**: January 2025
**Project Status**: Active Development
**Version**: 1.0.0
