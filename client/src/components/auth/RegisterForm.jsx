// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
// import { Input } from "../ui/input"
// import { Button } from "../ui/button"
// import { Label } from "../ui/label"
// import { Alert, AlertDescription } from "../ui/alert"
// import { AlertCircle, Loader2, UserPlus, Eye, EyeOff } from "lucide-react"
// import RoleSelector from "./RoleSelector"

// const RegisterForm = ({ onRegister }) => {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [role, setRole] = useState("user")
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     // Animation effect on mount
//     const timer = setTimeout(() => {
//       setIsVisible(true)
//     }, 100)

//     return () => clearTimeout(timer)
//   }, [])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")
//     console.log("Submitting role to backend:", role)

//     // Validate form
//     if (password !== confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long")
//       return
//     }

//     setIsLoading(true)
//     try {
//       await onRegister({ name, email, password, role })
//     } catch (err) {
//       setError(err?.message || "Registration failed. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-transparent dark:from-gray-900 dark:via-gray-850 dark:to-gray-900 transition-all duration-500">
//       <Card
//         className={`w-full max-w-md shadow-lg transition-all duration-500 transform ${
//           isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
//         } hover:shadow-xl`}
//       >
//         <CardHeader className="space-y-1 pb-6">
//           <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 transform transition-transform duration-300 hover:scale-110">
//             <UserPlus className="h-8 w-8 text-primary" />
//           </div>
//           <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">Create Account</CardTitle>
//           <CardDescription className="text-center text-gray-600 dark:text-gray-300">
//             Enter your information to create an account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
//               <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
//                 Full Name
//               </Label>
//               <Input
//                 id="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 placeholder="John Doe"
//                 className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
//               />
//             </div>

//             <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
//               <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="name@example.com"
//                 className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
//               />
//             </div>

//             <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
//               <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
//                 Password
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   placeholder="Create a password"
//                   className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 pr-10"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
//               <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
//                 Confirm Password
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="confirmPassword"
//                   type={showPassword ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                   placeholder="Confirm your password"
//                   className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 pr-10"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
//               <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">
//                 Account Type
//               </Label>
//               <RoleSelector selectedRole={role} onRoleChange={setRole} />
//             </div>

//             {error && (
//               <Alert variant="destructive" className="mt-4 animate-fadeIn">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full h-11 bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   Creating Account...
//                 </>
//               ) : (
//                 <span className="flex items-center justify-center">
//                   <UserPlus className="mr-2 h-5 w-5" />
//                   Register
//                 </span>
//               )}
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-center pb-6">
//           <div className="text-sm text-gray-600 dark:text-gray-300">
//             Already have an account?{" "}
//             <Link
//               to="/auth/login"
//               className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
//             >
//               Login
//             </Link>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default RegisterForm


import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Alert, AlertDescription } from "../ui/alert"
import { AlertCircle, Loader2, UserPlus, Eye, EyeOff, ShieldCheck } from "lucide-react"
import RoleSelector from "./RoleSelector"

const getPasswordStrength = (password) => {
  let score = 0
  if (password.length >= 6) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

const RegisterForm = ({ onRegister }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("user")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const passwordStrength = getPasswordStrength(password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setIsLoading(true)
    try {
      await onRegister({ name, email, password, role })
      // Clear form on success
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setRole("user")
    } catch (err) {
      const message = err?.message
      setError(Array.isArray(message) ? message.join(", ") : message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-transparent dark:from-gray-900 dark:via-gray-850 dark:to-gray-900 transition-all duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="space-y-1 pb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 transform transition-transform duration-300 hover:scale-110">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Create a password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="text-xs mt-1 text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>
                    Strength:{" "}
                    <span className={`font-medium ${passwordStrength >= 3 ? "text-green-600" : passwordStrength === 2 ? "text-yellow-500" : "text-red-500"}`}>
                      {["Weak", "Weak", "Medium", "Strong", "Strong"][passwordStrength]}
                    </span>
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Account Type</Label>
                <RoleSelector selectedRole={role} onRoleChange={setRole} />
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="animate-fadeIn">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white transition-transform transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <span className="flex items-center justify-center">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Register
                  </span>
                )}
              </Button>
            </form>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex justify-center pb-6">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
              >
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default RegisterForm
