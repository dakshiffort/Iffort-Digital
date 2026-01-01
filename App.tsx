import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CaseStudyPage from './pages/CaseStudyPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change (except for hash navigation)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path=":caseStudyId" element={<CaseStudyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;