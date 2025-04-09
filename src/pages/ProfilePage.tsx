import React, { useState } from 'react';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  summary: string;
  profileImage: string | null;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    summary: '',
    profileImage: null
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfile(prev => ({
            ...prev,
            profileImage: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the profile data to your backend
    console.log('Profile data submitted:', profile);
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Personal Profile</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 mb-4">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="mt-2">
                  <label className="btn btn-secondary block w-full text-center cursor-pointer">
                    Upload Photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="section-title">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="firstName" 
                      value={profile.firstName} 
                      onChange={handleChange}
                      className="form-input" 
                      placeholder="Enter your first name"
                      required
                    />
                  ) : (
                    <p className="py-2">{profile.firstName || 'Not specified'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="lastName" 
                      value={profile.lastName} 
                      onChange={handleChange}
                      className="form-input" 
                      placeholder="Enter your last name"
                      required
                    />
                  ) : (
                    <p className="py-2">{profile.lastName || 'Not specified'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      name="email" 
                      value={profile.email} 
                      onChange={handleChange}
                      className="form-input" 
                      placeholder="Enter your email address"
                      required
                    />
                  ) : (
                    <p className="py-2">{profile.email || 'Not specified'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      name="phone" 
                      value={profile.phone} 
                      onChange={handleChange}
                      className="form-input" 
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="py-2">{profile.phone || 'Not specified'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  {isEditing ? (
                    <input 
                      type="date" 
                      name="dob" 
                      value={profile.dob} 
                      onChange={handleChange}
                      className="form-input" 
                    />
                  ) : (
                    <p className="py-2">{profile.dob || 'Not specified'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="section-title">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Street Address</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="address" 
                  value={profile.address} 
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="Enter your street address"
                />
              ) : (
                <p className="py-2">{profile.address || 'Not specified'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="city" 
                  value={profile.city} 
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="Enter your city"
                />
              ) : (
                <p className="py-2">{profile.city || 'Not specified'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Province</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="province" 
                  value={profile.province} 
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="Enter your province"
                />
              ) : (
                <p className="py-2">{profile.province || 'Not specified'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="postalCode" 
                  value={profile.postalCode} 
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="Enter your postal code"
                />
              ) : (
                <p className="py-2">{profile.postalCode || 'Not specified'}</p>
              )}
            </div>
          </div>
          
          <h2 className="section-title">Career Summary</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Personal Summary / Career Objectives</label>
            {isEditing ? (
              <textarea 
                name="summary" 
                value={profile.summary} 
                onChange={handleChange}
                rows={5}
                className="form-input" 
                placeholder="Write a brief summary about yourself and your career objectives"
              />
            ) : (
              <p className="py-2">{profile.summary || 'Not specified'}</p>
            )}
          </div>
          
          {isEditing && (
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage; 