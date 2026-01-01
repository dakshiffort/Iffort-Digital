import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CASE_STUDIES } from '../constants';
import CaseStudyDetail from '../components/CaseStudyDetail';

const CaseStudyPage: React.FC = () => {
  const { caseStudyId } = useParams<{ caseStudyId: string }>();

  // Find the case study by ID from URL
  const study = CASE_STUDIES.find(s => s.id === caseStudyId);

  // Scroll to top when page loads or case study changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [caseStudyId]);

  // If not found, redirect to 404
  if (!study) {
    return <Navigate to="/404" replace />;
  }

  return <CaseStudyDetail study={study} />;
};

export default CaseStudyPage;
