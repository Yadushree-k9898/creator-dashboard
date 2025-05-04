// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const ProfileSettings = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     bio: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [profileCompleted, setProfileCompleted] = useState(false);
//   const [credits, setCredits] = useState(0);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get('http://localhost:5000/api/users/profile', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setFormData({
//         name: data.name,
//         email: data.email,
//         bio: data.bio || ''
//       });
//       setProfileCompleted(data.profileCompleted);
//       setCredits(data.credits || 0);
//     } catch (error) {
//       toast.error('Failed to fetch profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleChange = e => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const { data } = await axios.put('http://localhost:5000/api/users/profile', formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setFormData({
//         name: data.user.name,
//         email: data.user.email,
//         bio: data.user.bio
//       });
//       setProfileCompleted(data.user.profileCompleted);
//       setCredits(data.user.credits);
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       toast.error('Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 shadow rounded-md mt-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Profile Settings</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
//           <textarea
//             name="bio"
//             rows={4}
//             value={formData.bio}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
//           />
//         </div>

//         <div className="text-sm text-gray-500 dark:text-gray-400">
//           Profile Completed: <strong>{profileCompleted ? 'Yes' : 'No'}</strong><br />
//           Current Credits: <strong>{credits}</strong>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//           disabled={loading}
//         >
//           {loading ? 'Updating...' : 'Update Profile'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileSettings;



"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  })
  const [loading, setLoading] = useState(false)
  const [profileCompleted, setProfileCompleted] = useState(false)
  const [credits, setCredits] = useState(0)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setFormData({
        name: data.name,
        email: data.email,
        bio: data.bio || "",
      })
      setProfileCompleted(data.profileCompleted)
      setCredits(data.credits || 0)
    } catch (error) {
      toast.error("Failed to fetch profile")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.put("http://localhost:5000/api/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setFormData({
        name: data.user.name,
        email: data.user.email,
        bio: data.user.bio,
      })
      setProfileCompleted(data.user.profileCompleted)
      setCredits(data.user.credits)
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-6 transition-all duration-300 transform hover:shadow-xl animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white relative inline-block after:content-[''] after:absolute after:w-1/3 after:h-1 after:bg-primary/30 after:left-0 after:bottom-0">
        Profile Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="transition-all duration-300 transform hover:translate-x-1">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300"
            required
          />
        </div>

        <div className="transition-all duration-300 transform hover:translate-x-1">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300"
            required
          />
        </div>

        <div className="transition-all duration-300 transform hover:translate-x-1">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 resize-none"
          />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-sm text-gray-500 dark:text-gray-400 transition-all duration-300">
          <div className="flex justify-between items-center mb-2">
            <span>Profile Completed:</span>
            <span className={`font-semibold ${profileCompleted ? "text-green-500" : "text-yellow-500"}`}>
              {profileCompleted ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Current Credits:</span>
            <span className="font-semibold text-primary">{credits}</span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating...
            </span>
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  )
}

export default ProfileSettings
