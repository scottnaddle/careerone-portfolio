import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import EducationPage from './pages/EducationPage';
import ExperiencePage from './pages/ExperiencePage';
import CVGeneratorPage from './pages/CVGeneratorPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/cv-generator" element={<CVGeneratorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
