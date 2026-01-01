import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Page Not Found</h2>
        <p className="text-xl text-slate-600 mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-iffort-pink text-white px-8 py-4 rounded-full font-bold hover:bg-pink-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
