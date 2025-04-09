import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Student Portfolio Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/profile" className="card hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center p-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Profile</h2>
            <p className="text-gray-600 text-center mt-2">Manage your personal information</p>
          </div>
        </Link>
        
        <Link to="/education" className="card hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center p-6">
            <div className="w-16 h-16 bg-info rounded-full flex items-center justify-center text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Education</h2>
            <p className="text-gray-600 text-center mt-2">Add your qualifications and courses</p>
          </div>
        </Link>
        
        <Link to="/experience" className="card hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center p-6">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Experience</h2>
            <p className="text-gray-600 text-center mt-2">Add work experience and skills</p>
          </div>
        </Link>
        
        <Link to="/cv-generator" className="card hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center p-6">
            <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">CV Generator</h2>
            <p className="text-gray-600 text-center mt-2">Generate and download your CV</p>
          </div>
        </Link>
      </div>
      
      <div className="card mt-8">
        <h2 className="section-title">Recent Activities</h2>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded">
            <div className="w-10 h-10 bg-info rounded-full flex items-center justify-center text-white mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Profile Updated</h3>
              <p className="text-sm text-gray-600">You updated your profile information</p>
            </div>
            <div className="ml-auto text-sm text-gray-500">2 days ago</div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center text-white mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Certificate Uploaded</h3>
              <p className="text-sm text-gray-600">You uploaded a new certificate for Web Development course</p>
            </div>
            <div className="ml-auto text-sm text-gray-500">1 week ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 