// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';
// import AllProjects from './pages/AllProjects';
// import { CssBaseline } from '@mui/material';
// import UserManagement from './pages/UserManagement';
// import ProjectPage from './pages/ProjectsPage';

// const App = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);


//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <Router>
//       <CssBaseline />
//       <div style={{ display: 'flex' }}>
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <div
//           style={{
//             flexGrow: 1,
//             marginLeft: isSidebarOpen ? 240 : 0,
//             transition: 'margin 0.3s ease',
//           }}
//         >
//           <Navbar toggleSidebar={toggleSidebar} />
//           <div style={{ padding: '16px' }}>
//             <Routes>
//               <Route path="/" element={<AllProjects />} />
//               <Route path="/user-management" element={<UserManagement />} />
//               <Route path="/project/:id" element={<ProjectPage />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AllProjects from './pages/AllProjects';
import { CssBaseline, useMediaQuery } from '@mui/material';
import UserManagement from './pages/UserManagement';
import ProjectPage from './pages/ProjectsPage';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Router>
      <CssBaseline />
      <div style={{ display: 'flex' }}>
        {!isMobile && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        <div
          style={{
            flexGrow: 1,
            marginLeft: isMobile ? 0 : isSidebarOpen ? 240 : 0,
            transition: 'margin 0.3s ease',
          }}
        >
          {!isMobile && <Navbar toggleSidebar={toggleSidebar} />}
          
          <div style={{ padding: '16px' }}>
            <Routes>
              <Route path="/" element={<AllProjects />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/project/:id" element={<ProjectPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

