import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [credits, setCredits] = useState(0);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFormData({
        name: data.name,
        email: data.email,
        bio: data.bio || ''
      });
      setProfileCompleted(data.profileCompleted);
      setCredits(data.credits || 0);
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put('http://localhost:5000/api/users/profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFormData({
        name: data.user.name,
        email: data.user.email,
        bio: data.user.bio
      });
      setProfileCompleted(data.user.profileCompleted);
      setCredits(data.user.credits);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 shadow rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Profile Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Profile Completed: <strong>{profileCompleted ? 'Yes' : 'No'}</strong><br />
          Current Credits: <strong>{credits}</strong>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
