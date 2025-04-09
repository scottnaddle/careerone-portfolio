import React, { useState } from 'react';

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  certificateFile?: string;
}

interface Course {
  id: string;
  name: string;
  provider: string;
  completionDate: string;
  description: string;
}

const EducationPage: React.FC = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  
  const [currentTab, setCurrentTab] = useState<'education' | 'certification' | 'course'>('education');
  
  // Sample education data
  const sampleEducation: Education = {
    id: '1',
    institution: 'University of Colombo',
    degree: 'Bachelor of Science',
    fieldOfStudy: 'Computer Science',
    startDate: '2018-09-01',
    endDate: '2022-06-30',
    grade: 'First Class Honours',
    description: 'Focused on software engineering and data science modules. Completed final year project on machine learning applications in natural language processing.'
  };
  
  // Sample certification data
  const sampleCertification: Certification = {
    id: '1',
    name: 'Web Development Professional Certification',
    issuer: 'Careerone Skills Institute',
    issueDate: '2023-03-15',
    credentialUrl: 'https://careerone.gov.lk/certificates/web-dev-pro-123',
    certificateFile: 'https://example.com/sample-certificate.pdf'
  };
  
  // Sample course data
  const sampleCourse: Course = {
    id: '1',
    name: 'Advanced JavaScript Programming',
    provider: 'Careerone Platform',
    completionDate: '2023-01-20',
    description: 'Learned advanced JavaScript concepts including asynchronous programming, closures, and modern ES6+ features.'
  };
  
  // For demo purposes, initialize with sample data
  React.useEffect(() => {
    setEducations([sampleEducation]);
    setCertifications([sampleCertification]);
    setCourses([sampleCourse]);
  }, []);
  
  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: ''
  });
  
  const [newCertification, setNewCertification] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialUrl: '',
    certificateFile: ''
  });
  
  const [newCourse, setNewCourse] = useState<Omit<Course, 'id'>>({
    name: '',
    provider: '',
    completionDate: '',
    description: ''
  });
  
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showCertificationForm, setShowCertificationForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCertification(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setNewCertification(prev => ({
            ...prev,
            certificateFile: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    setEducations(prev => [...prev, { id, ...newEducation }]);
    setNewEducation({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: ''
    });
    setShowEducationForm(false);
  };
  
  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    setCertifications(prev => [...prev, { id, ...newCertification }]);
    setNewCertification({
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialUrl: '',
      certificateFile: ''
    });
    setShowCertificationForm(false);
  };
  
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    setCourses(prev => [...prev, { id, ...newCourse }]);
    setNewCourse({
      name: '',
      provider: '',
      completionDate: '',
      description: ''
    });
    setShowCourseForm(false);
  };
  
  const handleDeleteEducation = (id: string) => {
    setEducations(prev => prev.filter(edu => edu.id !== id));
  };
  
  const handleDeleteCertification = (id: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
  };
  
  const handleDeleteCourse = (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Education & Training</h1>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => setCurrentTab('education')}
            className={`py-4 px-6 font-medium ${
              currentTab === 'education'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Academic Qualifications
          </button>
          <button
            onClick={() => setCurrentTab('certification')}
            className={`py-4 px-6 font-medium ${
              currentTab === 'certification'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Certifications
          </button>
          <button
            onClick={() => setCurrentTab('course')}
            className={`py-4 px-6 font-medium ${
              currentTab === 'course'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Courses
          </button>
        </nav>
      </div>
      
      {currentTab === 'education' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Academic Qualifications</h2>
            <button
              onClick={() => setShowEducationForm(!showEducationForm)}
              className="btn btn-primary"
            >
              {showEducationForm ? 'Cancel' : 'Add Education'}
            </button>
          </div>
          
          {showEducationForm && (
            <div className="card mb-6">
              <h3 className="text-xl font-semibold mb-4">Add Education</h3>
              <form onSubmit={handleAddEducation}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Institution</label>
                    <input
                      type="text"
                      name="institution"
                      value={newEducation.institution}
                      onChange={handleEducationChange}
                      className="form-input"
                      placeholder="University or school name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={newEducation.degree}
                      onChange={handleEducationChange}
                      className="form-input"
                      placeholder="Degree type"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Field of Study</label>
                    <input
                      type="text"
                      name="fieldOfStudy"
                      value={newEducation.fieldOfStudy}
                      onChange={handleEducationChange}
                      className="form-input"
                      placeholder="Major or concentration"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Grade/GPA</label>
                    <input
                      type="text"
                      name="grade"
                      value={newEducation.grade}
                      onChange={handleEducationChange}
                      className="form-input"
                      placeholder="Your grade or GPA"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newEducation.startDate}
                      onChange={handleEducationChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newEducation.endDate}
                      onChange={handleEducationChange}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newEducation.description}
                    onChange={handleEducationChange}
                    className="form-input"
                    rows={3}
                    placeholder="Describe your studies, achievements, thesis, etc."
                  />
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">Add Education</button>
                </div>
              </form>
            </div>
          )}
          
          {educations.length === 0 ? (
            <p className="text-gray-500 italic">No academic qualifications added yet.</p>
          ) : (
            <div className="space-y-4">
              {educations.map(education => (
                <div key={education.id} className="card">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{education.degree} in {education.fieldOfStudy}</h3>
                      <p className="text-lg">{education.institution}</p>
                      <p className="text-gray-600">
                        {formatDate(education.startDate)} - {education.endDate ? formatDate(education.endDate) : 'Present'}
                      </p>
                      {education.grade && <p className="text-gray-600">Grade: {education.grade}</p>}
                      {education.description && <p className="mt-2">{education.description}</p>}
                    </div>
                    <button
                      onClick={() => handleDeleteEducation(education.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {currentTab === 'certification' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Certifications</h2>
            <button
              onClick={() => setShowCertificationForm(!showCertificationForm)}
              className="btn btn-primary"
            >
              {showCertificationForm ? 'Cancel' : 'Add Certification'}
            </button>
          </div>
          
          {showCertificationForm && (
            <div className="card mb-6">
              <h3 className="text-xl font-semibold mb-4">Add Certification</h3>
              <form onSubmit={handleAddCertification}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Certification Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newCertification.name}
                      onChange={handleCertificationChange}
                      className="form-input"
                      placeholder="Enter certification name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Issuing Organization</label>
                    <input
                      type="text"
                      name="issuer"
                      value={newCertification.issuer}
                      onChange={handleCertificationChange}
                      className="form-input"
                      placeholder="Organization that issued the certification"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Issue Date</label>
                    <input
                      type="date"
                      name="issueDate"
                      value={newCertification.issueDate}
                      onChange={handleCertificationChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date (if applicable)</label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={newCertification.expiryDate}
                      onChange={handleCertificationChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Credential URL (if any)</label>
                    <input
                      type="url"
                      name="credentialUrl"
                      value={newCertification.credentialUrl}
                      onChange={handleCertificationChange}
                      className="form-input"
                      placeholder="Link to verify the certification"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Upload Certificate</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleCertificateUpload}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">Add Certification</button>
                </div>
              </form>
            </div>
          )}
          
          {certifications.length === 0 ? (
            <p className="text-gray-500 italic">No certifications added yet.</p>
          ) : (
            <div className="space-y-4">
              {certifications.map(certification => (
                <div key={certification.id} className="card">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{certification.name}</h3>
                      <p className="text-lg">{certification.issuer}</p>
                      <p className="text-gray-600">
                        Issued: {formatDate(certification.issueDate)}
                        {certification.expiryDate && ` • Expires: ${formatDate(certification.expiryDate)}`}
                      </p>
                      {certification.credentialUrl && (
                        <a 
                          href={certification.credentialUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline mt-2 inline-block"
                        >
                          Verify Certification
                        </a>
                      )}
                      {certification.certificateFile && (
                        <div className="mt-3">
                          <a 
                            href={certification.certificateFile} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                          >
                            View Certificate
                          </a>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteCertification(certification.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {currentTab === 'course' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Courses</h2>
            <button
              onClick={() => setShowCourseForm(!showCourseForm)}
              className="btn btn-primary"
            >
              {showCourseForm ? 'Cancel' : 'Add Course'}
            </button>
          </div>
          
          {showCourseForm && (
            <div className="card mb-6">
              <h3 className="text-xl font-semibold mb-4">Add Course</h3>
              <form onSubmit={handleAddCourse}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Course Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newCourse.name}
                      onChange={handleCourseChange}
                      className="form-input"
                      placeholder="Enter course name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Provider</label>
                    <input
                      type="text"
                      name="provider"
                      value={newCourse.provider}
                      onChange={handleCourseChange}
                      className="form-input"
                      placeholder="Platform or institution that offered the course"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Completion Date</label>
                    <input
                      type="date"
                      name="completionDate"
                      value={newCourse.completionDate}
                      onChange={handleCourseChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newCourse.description}
                    onChange={handleCourseChange}
                    className="form-input"
                    rows={3}
                    placeholder="What did you learn from this course?"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">Add Course</button>
                </div>
              </form>
            </div>
          )}
          
          {courses.length === 0 ? (
            <p className="text-gray-500 italic">No courses added yet.</p>
          ) : (
            <div className="space-y-4">
              {courses.map(course => (
                <div key={course.id} className="card">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{course.name}</h3>
                      <p className="text-lg">{course.provider}</p>
                      <p className="text-gray-600">Completed: {formatDate(course.completionDate)}</p>
                      {course.description && <p className="mt-2">{course.description}</p>}
                    </div>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EducationPage; 