import React, { useState } from 'react';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
}

interface Language {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'native';
}

const ExperiencePage: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  
  const [currentTab, setCurrentTab] = useState<'experience' | 'skills' | 'languages'>('experience');
  
  // Sample experience data
  const sampleExperience: Experience = {
    id: '1',
    company: 'Tech Innovators Lanka',
    position: 'Junior Software Developer',
    location: 'Colombo, Sri Lanka',
    startDate: '2022-07-15',
    endDate: '',
    current: true,
    description: 'Working on full-stack web development projects using React, Node.js, and MongoDB. Contributing to both frontend and backend development of enterprise applications.'
  };
  
  // Sample skills data
  const sampleSkills: Skill[] = [
    {
      id: '1',
      name: 'JavaScript',
      proficiency: 'advanced',
      yearsOfExperience: 3
    },
    {
      id: '2',
      name: 'React',
      proficiency: 'intermediate',
      yearsOfExperience: 2
    },
    {
      id: '3',
      name: 'Node.js',
      proficiency: 'intermediate',
      yearsOfExperience: 1
    }
  ];
  
  // Sample languages data
  const sampleLanguages: Language[] = [
    {
      id: '1',
      name: 'English',
      proficiency: 'advanced'
    },
    {
      id: '2',
      name: 'Sinhala',
      proficiency: 'native'
    },
    {
      id: '3',
      name: 'Tamil',
      proficiency: 'beginner'
    }
  ];
  
  // For demo purposes, initialize with sample data
  React.useEffect(() => {
    setExperiences([sampleExperience]);
    setSkills(sampleSkills);
    setLanguages(sampleLanguages);
  }, []);
  
  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    proficiency: 'beginner',
    yearsOfExperience: 0
  });
  
  const [newLanguage, setNewLanguage] = useState<Omit<Language, 'id'>>({
    name: '',
    proficiency: 'beginner'
  });
  
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showLanguageForm, setShowLanguageForm] = useState(false);
  
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name === 'current') {
      setNewExperience(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value === 'true',
        ...(type === 'checkbox' && (e.target as HTMLInputElement).checked ? { endDate: '' } : {})
      }));
    } else {
      setNewExperience(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSkill(prev => ({
      ...prev,
      [name]: name === 'yearsOfExperience' ? parseInt(value) || 0 : value
    }));
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewLanguage(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    setExperiences(prev => [...prev, { id, ...newExperience }]);
    setNewExperience({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    setShowExperienceForm(false);
  };
  
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    setSkills(prev => [...prev, { id, ...newSkill }]);
    setNewSkill({
      name: '',
      proficiency: 'beginner',
      yearsOfExperience: 0
    });
    setShowSkillForm(false);
  };
  
  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    setLanguages(prev => [...prev, { id, ...newLanguage }]);
    setNewLanguage({
      name: '',
      proficiency: 'beginner'
    });
    setShowLanguageForm(false);
  };
  
  const handleDeleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };
  
  const handleDeleteSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };
  
  const handleDeleteLanguage = (id: string) => {
    setLanguages(prev => prev.filter(lang => lang.id !== id));
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };
  
  const getProficiencyLabel = (proficiency: string) => {
    switch (proficiency) {
      case 'beginner':
        return 'Beginner';
      case 'intermediate':
        return 'Intermediate';
      case 'advanced':
        return 'Advanced';
      case 'expert':
        return 'Expert';
      case 'native':
        return 'Native';
      default:
        return proficiency;
    }
  };
  
  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'beginner':
        return 'bg-gray-300';
      case 'intermediate':
        return 'bg-blue-300';
      case 'advanced':
        return 'bg-green-300';
      case 'expert':
        return 'bg-purple-300';
      case 'native':
        return 'bg-yellow-300';
      default:
        return 'bg-gray-300';
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Experience & Skills</h1>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => setCurrentTab('experience')}
            className={`py-4 px-6 font-medium ${
              currentTab === 'experience'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Work Experience
          </button>
          <button
            onClick={() => setCurrentTab('skills')}
            className={`py-4 px-6 font-medium ${
              currentTab === 'skills'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setCurrentTab('languages')}
            className={`py-4 px-6 font-medium ${
              currentTab === 'languages'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Languages
          </button>
        </nav>
      </div>
      
      {currentTab === 'experience' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Work Experience</h2>
            <button
              onClick={() => setShowExperienceForm(!showExperienceForm)}
              className="btn btn-primary"
            >
              {showExperienceForm ? 'Cancel' : 'Add Experience'}
            </button>
          </div>
          
          {showExperienceForm && (
            <div className="card mb-6">
              <h3 className="text-xl font-semibold mb-4">Add Work Experience</h3>
              <form onSubmit={handleAddExperience}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={newExperience.company}
                      onChange={handleExperienceChange}
                      className="form-input"
                      placeholder="Company name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={newExperience.position}
                      onChange={handleExperienceChange}
                      className="form-input"
                      placeholder="Your job title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={newExperience.location}
                      onChange={handleExperienceChange}
                      className="form-input"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      id="currentJob"
                      name="current"
                      checked={newExperience.current}
                      onChange={handleExperienceChange}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="currentJob" className="text-sm font-medium">I currently work here</label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newExperience.startDate}
                      onChange={handleExperienceChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  {!newExperience.current && (
                    <div>
                      <label className="block text-sm font-medium mb-1">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={newExperience.endDate}
                        onChange={handleExperienceChange}
                        className="form-input"
                      />
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newExperience.description}
                    onChange={handleExperienceChange}
                    className="form-input"
                    rows={3}
                    placeholder="Describe your responsibilities and achievements"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">Add Experience</button>
                </div>
              </form>
            </div>
          )}
          
          {experiences.length === 0 ? (
            <p className="text-gray-500 italic">No work experience added yet.</p>
          ) : (
            <div className="space-y-4">
              {experiences.map(experience => (
                <div key={experience.id} className="card">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{experience.position}</h3>
                      <p className="text-lg">{experience.company}</p>
                      {experience.location && <p className="text-gray-600">{experience.location}</p>}
                      <p className="text-gray-600">
                        {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                      </p>
                      {experience.description && <p className="mt-2">{experience.description}</p>}
                    </div>
                    <button
                      onClick={() => handleDeleteExperience(experience.id)}
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
      
      {currentTab === 'skills' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Skills</h2>
            <button
              onClick={() => setShowSkillForm(!showSkillForm)}
              className="btn btn-primary"
            >
              {showSkillForm ? 'Cancel' : 'Add Skill'}
            </button>
          </div>
          
          {showSkillForm && (
            <div className="card mb-6">
              <h3 className="text-xl font-semibold mb-4">Add Skill</h3>
              <form onSubmit={handleAddSkill}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Skill Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newSkill.name}
                      onChange={handleSkillChange}
                      className="form-input"
                      placeholder="Enter skill name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Proficiency Level</label>
                    <select
                      name="proficiency"
                      value={newSkill.proficiency}
                      onChange={handleSkillChange}
                      className="form-input"
                      required
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Years of Experience</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      name="yearsOfExperience"
                      value={newSkill.yearsOfExperience}
                      onChange={handleSkillChange}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">Add Skill</button>
                </div>
              </form>
            </div>
          )}
          
          {skills.length === 0 ? (
            <p className="text-gray-500 italic">No skills added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map(skill => (
                <div key={skill.id} className="card">
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{skill.name}</h3>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-xs ${getProficiencyColor(skill.proficiency)}`}>
                          {getProficiencyLabel(skill.proficiency)}
                        </span>
                        <span className="text-sm text-gray-600">{skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{
                            width: skill.proficiency === 'beginner' ? '25%'
                              : skill.proficiency === 'intermediate' ? '50%'
                              : skill.proficiency === 'advanced' ? '75%'
                              : '100%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {currentTab === 'languages' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Languages</h2>
            <button
              onClick={() => setShowLanguageForm(!showLanguageForm)}
              className="btn btn-primary"
            >
              {showLanguageForm ? 'Cancel' : 'Add Language'}
            </button>
          </div>
          
          {showLanguageForm && (
            <div className="card mb-6">
              <h3 className="text-xl font-semibold mb-4">Add Language</h3>
              <form onSubmit={handleAddLanguage}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <input
                      type="text"
                      name="name"
                      value={newLanguage.name}
                      onChange={handleLanguageChange}
                      className="form-input"
                      placeholder="Enter language name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Proficiency Level</label>
                    <select
                      name="proficiency"
                      value={newLanguage.proficiency}
                      onChange={handleLanguageChange}
                      className="form-input"
                      required
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="native">Native</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">Add Language</button>
                </div>
              </form>
            </div>
          )}
          
          {languages.length === 0 ? (
            <p className="text-gray-500 italic">No languages added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {languages.map(language => (
                <div key={language.id} className="card">
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{language.name}</h3>
                        <button
                          onClick={() => handleDeleteLanguage(language.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="mb-2">
                        <span className={`px-2 py-1 rounded text-xs ${getProficiencyColor(language.proficiency)}`}>
                          {getProficiencyLabel(language.proficiency)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{
                            width: language.proficiency === 'beginner' ? '25%'
                              : language.proficiency === 'intermediate' ? '50%'
                              : language.proficiency === 'advanced' ? '75%'
                              : '100%'
                          }}
                        ></div>
                      </div>
                    </div>
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

export default ExperiencePage; 