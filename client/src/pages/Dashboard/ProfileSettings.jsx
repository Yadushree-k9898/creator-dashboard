import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { User, Mail, FileText, CheckCircle, AlertTriangle, CreditCard } from "lucide-react";
import { getAccessToken, getUser, saveUser } from "../../utils/localStorage.js";

// Define the API URL from the environment variables
const API_URL = import.meta.env.VITE_API_URL;

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [credits, setCredits] = useState(0);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setFormData({
        name: data.name,
        email: data.email,
        bio: data.bio || "",
      });
      setProfileCompleted(data.profileCompleted);
      setCredits(data.credits || 0);
      saveUser(data);
    } catch (error) {
      toast.error("Failed to fetch profile: " + (error?.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        bio: user.bio || "",
      });
      setProfileCompleted(user.profileCompleted);
      setCredits(user.credits || 0);
    } else {
      fetchProfile();
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`${API_URL}/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setFormData({
        name: data.user.name,
        email: data.user.email,
        bio: data.user.bio,
      });
      setProfileCompleted(data.user.profileCompleted);
      setCredits(data.user.credits);
      saveUser(data.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile: " + (error?.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-primary/70 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <User size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{formData.name || "Your Profile"}</h1>
              <p className="opacity-80">{formData.email}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  profileCompleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {profileCompleted ? (
                    <CheckCircle size={14} className="mr-1" />
                  ) : (
                    <AlertTriangle size={14} className="mr-1" />
                  )}
                  {profileCompleted ? "Verified Profile" : "Complete Your Profile"}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-white">
                  <CreditCard size={14} className="mr-1" />
                  {credits} Credits
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <User size={16} className="mr-2 text-primary" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Mail size={16} className="mr-2 text-primary" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <FileText size={16} className="mr-2 text-primary" />
                Bio
              </label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 resize-none"
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
