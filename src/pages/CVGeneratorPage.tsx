import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

enum CVTemplate {
  CLASSIC = 'classic',
  MODERN = 'modern',
  CREATIVE = 'creative',
}

interface CVSettings {
  template: CVTemplate;
  primaryColor: string;
  includePhoto: boolean;
  fontStyle: string;
  sections: {
    education: boolean;
    experience: boolean;
    skills: boolean;
    languages: boolean;
    summary: boolean;
  };
}

// Type for any indexed access to CVSettings
interface IndexableCVSettings extends CVSettings {
  [key: string]: any;
}

const CVGeneratorPage: React.FC = () => {
  const [settings, setSettings] = useState<CVSettings>({
    template: CVTemplate.CLASSIC,
    primaryColor: '#0056b3',
    includePhoto: true,
    fontStyle: 'Roboto',
    sections: {
      education: true,
      experience: true,
      skills: true,
      languages: true,
      summary: true,
    }
  });
  
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setSettings(prev => {
          const newSettings = { ...prev } as IndexableCVSettings;
          if (newSettings[parent] && typeof newSettings[parent] === 'object') {
            newSettings[parent] = {
              ...newSettings[parent],
              [child]: isChecked
            };
          }
          return newSettings;
        });
      } else {
        setSettings(prev => ({
          ...prev,
          [name]: isChecked
        }));
      }
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const generatePreview = () => {
    setIsGenerating(true);
    // In a real application, this would fetch user data and generate the preview
    setTimeout(() => {
      setIsPreviewReady(true);
      setIsGenerating(false);
    }, 1000);
  };
  
  const downloadCV = () => {
    const cvElement = document.getElementById('cv-preview');
    if (!cvElement) return;
    
    html2canvas(cvElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Careerone_CV.pdf');
    });
  };
  
  // Mock data for the CV preview
  const mockProfile = {
    firstName: 'Amal',
    lastName: 'Perera',
    email: 'amal.perera@example.com',
    phone: '+94 77 123 4567',
    address: 'Colombo, Sri Lanka',
    summary: 'Dedicated software developer with expertise in web development. Strong problem-solving skills and a passion for creating efficient, user-friendly applications.',
    photo: 'https://randomuser.me/api/portraits/men/35.jpg'
  };
  
  const mockEducation = [
    {
      institution: 'University of Colombo',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2018-09-01',
      endDate: '2022-06-30'
    }
  ];
  
  const mockExperience = [
    {
      company: 'Tech Innovators Lanka',
      position: 'Junior Software Developer',
      location: 'Colombo, Sri Lanka',
      startDate: '2022-07-15',
      endDate: '',
      current: true,
      description: 'Developing full-stack web applications using modern technologies.'
    }
  ];
  
  const mockSkills = [
    { name: 'JavaScript', proficiency: 'advanced' },
    { name: 'React', proficiency: 'intermediate' },
    { name: 'Node.js', proficiency: 'intermediate' }
  ];
  
  const mockLanguages = [
    { name: 'English', proficiency: 'advanced' },
    { name: 'Sinhala', proficiency: 'native' }
  ];
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };
  
  const renderClassicTemplate = () => (
    <div className="bg-white p-8" style={{ maxWidth: '210mm', margin: '0 auto', fontFamily: settings.fontStyle }}>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: settings.primaryColor }}>
            {mockProfile.firstName} {mockProfile.lastName}
          </h1>
          <p className="text-xl text-gray-600">Software Developer</p>
        </div>
        
        {settings.includePhoto && (
          <div className="mt-4 md:mt-0">
            <img 
              src={mockProfile.photo} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover" 
            />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div>
            <h2 className="text-lg font-bold pb-2 border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>Contact</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">📧</span> {mockProfile.email}
              </li>
              <li className="flex items-center">
                <span className="mr-2">📱</span> {mockProfile.phone}
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span> {mockProfile.address}
              </li>
            </ul>
          </div>
          
          {settings.sections.skills && (
            <div>
              <h2 className="text-lg font-bold pb-2 border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>Skills</h2>
              <ul className="space-y-2">
                {mockSkills.map((skill, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{skill.name}</span>
                    <div className="flex">
                      {Array.from({ length: skill.proficiency === 'beginner' ? 1 : skill.proficiency === 'intermediate' ? 3 : 5 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="w-2 h-2 rounded-full mx-0.5" 
                          style={{ backgroundColor: settings.primaryColor }}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {settings.sections.languages && (
            <div>
              <h2 className="text-lg font-bold pb-2 border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>Languages</h2>
              <ul className="space-y-2">
                {mockLanguages.map((language, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{language.name}</span>
                    <div className="flex">
                      {Array.from({ length: language.proficiency === 'beginner' ? 1 : language.proficiency === 'intermediate' ? 3 : language.proficiency === 'advanced' ? 4 : 5 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="w-2 h-2 rounded-full mx-0.5" 
                          style={{ backgroundColor: settings.primaryColor }}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="md:col-span-2 space-y-6">
          {settings.sections.summary && (
            <div>
              <h2 className="text-lg font-bold pb-2 border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>Profile Summary</h2>
              <p>{mockProfile.summary}</p>
            </div>
          )}
          
          {settings.sections.experience && (
            <div>
              <h2 className="text-lg font-bold pb-2 border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>Experience</h2>
              <div className="space-y-4">
                {mockExperience.map((exp, index) => (
                  <div key={index}>
                    <h3 className="text-md font-semibold">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company} | {exp.location}</p>
                    <p className="text-gray-600 text-sm">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                    <p className="mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {settings.sections.education && (
            <div>
              <h2 className="text-lg font-bold pb-2 border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>Education</h2>
              <div className="space-y-4">
                {mockEducation.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-md font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-gray-600 text-sm">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  const renderModernTemplate = () => (
    <div className="bg-white p-8" style={{ maxWidth: '210mm', margin: '0 auto', fontFamily: settings.fontStyle }}>
      <div className="relative mb-8 pb-6" style={{ borderBottom: `2px solid ${settings.primaryColor}` }}>
        <h1 className="text-4xl font-bold" style={{ color: settings.primaryColor }}>
          {mockProfile.firstName} <span className="font-light">{mockProfile.lastName}</span>
        </h1>
        <p className="text-xl text-gray-600 mt-1">Software Developer</p>
        
        <div className="flex mt-4 space-x-4">
          <p className="text-sm"><span className="font-semibold">Email:</span> {mockProfile.email}</p>
          <p className="text-sm"><span className="font-semibold">Phone:</span> {mockProfile.phone}</p>
          <p className="text-sm"><span className="font-semibold">Location:</span> {mockProfile.address}</p>
        </div>
        
        {settings.includePhoto && (
          <div className="absolute top-0 right-0">
            <img 
              src={mockProfile.photo} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4" 
              style={{ borderColor: settings.primaryColor }}
            />
          </div>
        )}
      </div>
      
      {settings.sections.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: settings.primaryColor }}>PROFILE</h2>
          <p className="text-gray-700">{mockProfile.summary}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {settings.sections.experience && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: settings.primaryColor }}>EXPERIENCE</h2>
              <div className="space-y-4">
                {mockExperience.map((exp, index) => (
                  <div key={index}>
                    <h3 className="text-md font-semibold">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company} | {exp.location}</p>
                    <p className="text-gray-600 text-sm">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                    <p className="mt-1 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {settings.sections.education && (
            <div>
              <h2 className="text-lg font-bold mb-3" style={{ color: settings.primaryColor }}>EDUCATION</h2>
              <div className="space-y-4">
                {mockEducation.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-md font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-gray-600 text-sm">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div>
          {settings.sections.skills && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: settings.primaryColor }}>SKILLS</h2>
              <div className="space-y-2">
                {mockSkills.map((skill, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-medium">{skill.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{ 
                          backgroundColor: settings.primaryColor,
                          width: skill.proficiency === 'beginner' ? '30%' : skill.proficiency === 'intermediate' ? '60%' : '90%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {settings.sections.languages && (
            <div>
              <h2 className="text-lg font-bold mb-3" style={{ color: settings.primaryColor }}>LANGUAGES</h2>
              <div className="space-y-2">
                {mockLanguages.map((language, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-medium">{language.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{ 
                          backgroundColor: settings.primaryColor,
                          width: language.proficiency === 'beginner' ? '30%' : language.proficiency === 'intermediate' ? '60%' : language.proficiency === 'advanced' ? '80%' : '100%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">CV Generator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="section-title">CV Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Template</label>
                <select
                  name="template"
                  value={settings.template}
                  onChange={handleSettingsChange}
                  className="form-input"
                >
                  <option value={CVTemplate.CLASSIC}>Classic</option>
                  <option value={CVTemplate.MODERN}>Modern</option>
                  <option value={CVTemplate.CREATIVE}>Creative</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Primary Color</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    name="primaryColor"
                    value={settings.primaryColor}
                    onChange={handleSettingsChange}
                    className="w-10 h-10 p-1 border border-gray-300 rounded"
                  />
                  <span className="ml-2">{settings.primaryColor}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Font Style</label>
                <select
                  name="fontStyle"
                  value={settings.fontStyle}
                  onChange={handleSettingsChange}
                  className="form-input"
                >
                  <option value="Roboto">Roboto</option>
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includePhoto"
                  name="includePhoto"
                  checked={settings.includePhoto}
                  onChange={handleSettingsChange}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="includePhoto" className="text-sm font-medium">Include Photo</label>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Sections to Include</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeSummary"
                      name="sections.summary"
                      checked={settings.sections.summary}
                      onChange={handleSettingsChange}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="includeSummary" className="text-sm">Profile Summary</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeEducation"
                      name="sections.education"
                      checked={settings.sections.education}
                      onChange={handleSettingsChange}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="includeEducation" className="text-sm">Education</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeExperience"
                      name="sections.experience"
                      checked={settings.sections.experience}
                      onChange={handleSettingsChange}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="includeExperience" className="text-sm">Experience</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeSkills"
                      name="sections.skills"
                      checked={settings.sections.skills}
                      onChange={handleSettingsChange}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="includeSkills" className="text-sm">Skills</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeLanguages"
                      name="sections.languages"
                      checked={settings.sections.languages}
                      onChange={handleSettingsChange}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="includeLanguages" className="text-sm">Languages</label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={generatePreview}
                  className="btn btn-primary w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Preview'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner min-h-[600px] flex items-center justify-center">
            {!isPreviewReady ? (
              <div className="text-center">
                <p className="text-gray-500 mb-2">
                  {isGenerating ? 'Generating CV Preview...' : 'Configure your CV settings and click "Generate Preview"'}
                </p>
                {isGenerating && (
                  <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                )}
              </div>
            ) : (
              <div className="w-full overflow-auto bg-white shadow-lg" id="cv-preview">
                {settings.template === CVTemplate.CLASSIC ? renderClassicTemplate() : renderModernTemplate()}
              </div>
            )}
          </div>
          
          {isPreviewReady && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={downloadCV}
                className="btn btn-primary"
              >
                Download CV as PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVGeneratorPage; 