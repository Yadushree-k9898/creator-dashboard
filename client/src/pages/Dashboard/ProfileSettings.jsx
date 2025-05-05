import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { User, Mail, FileText, Shield, CreditCard, CheckCircle, AlertTriangle } from "lucide-react"


const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  })
  const [loading, setLoading] = useState(false)
  const [profileCompleted, setProfileCompleted] = useState(false)
  const [credits, setCredits] = useState(0)
  const [activeTab, setActiveTab] = useState("profile")

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

        {/* Tabs Navigation */}
        <div className="border-b dark:border-gray-700">
          <nav className="flex overflow-x-auto" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-6 font-medium text-sm flex items-center transition-colors ${
                activeTab === "profile"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <User size={18} className="mr-2" />
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`py-4 px-6 font-medium text-sm flex items-center transition-colors ${
                activeTab === "security"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Shield size={18} className="mr-2" />
              Security
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`py-4 px-6 font-medium text-sm flex items-center transition-colors ${
                activeTab === "billing"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <CreditCard size={18} className="mr-2" />
              Billing
            </button>
          </nav>
        </div>

        {/* Profile Content */}
        {activeTab === "profile" && (
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
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Your bio will be shown on your public profile
                </p>
              </div>

              {/* Profile Status Card */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                  <CheckCircle size={18} className="mr-2 text-primary" />
                  Profile Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Profile Completion</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: profileCompleted ? '100%' : '60%' }}
                        ></div>
                      </div>
                      <span className={profileCompleted ? "text-green-500" : "text-yellow-500"}>
                        {profileCompleted ? "100%" : "60%"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Available Credits</span>
                    <span className="font-medium text-primary">{credits}</span>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
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
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Placeholder content for other tabs */}
        {activeTab === "security" && (
          <div className="p-6 min-h-64 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Shield size={40} className="mx-auto mb-2 opacity-40" />
              <h3 className="text-lg font-medium">Security Settings</h3>
              <p>Password and authentication settings will appear here.</p>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="p-6 min-h-64 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <CreditCard size={40} className="mx-auto mb-2 opacity-40" />
              <h3 className="text-lg font-medium">Billing Information</h3>
              <p>Your payment methods and subscription details will appear here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileSettings