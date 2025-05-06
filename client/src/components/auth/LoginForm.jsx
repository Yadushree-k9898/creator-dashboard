// import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { loginUser } from "../../redux/slices/authSlice"
// import { useNavigate, useLocation } from "react-router-dom"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
// import { Input } from "../ui/input"
// import { Button } from "../ui/button"
// import { Label } from "../ui/label"
// import { Alert, AlertDescription } from "../ui/alert"
// import { AlertCircle, Loader2, LogIn, Eye, EyeOff } from "lucide-react"

// const LoginForm = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [isVisible, setIsVisible] = useState(false)

//   // Accessing authentication state from Redux store
//   const { loading, error: authError } = useSelector((state) => state.auth)

//   // Get the redirect path from location state or default to dashboard
//   const from = location.state?.from || "/dashboard"

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
    

//     try {
//       const result = await dispatch(loginUser({ email, password })).unwrap()
//       const role = result.user?.role?.toLowerCase()

//       // Redirect based on user role
//       if (role === "admin") {
//         navigate("/dashboard/admin")
//       } else if (role === "user") {
//         navigate("/dashboard/user")
//       } else {
//         setError("Invalid user role")
//       }
//     } catch (err) {
//       setError(err?.message || "Login failed. Please check your credentials.")
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
//             <LogIn className="h-8 w-8 text-primary" />
//           </div>
//           <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">Welcome Back</CardTitle>
//           <CardDescription className="text-center text-gray-600 dark:text-gray-300">
//             Enter your credentials to access your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
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
//                 autoComplete="username"
//                 placeholder="name@example.com"
//                 className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
//               />
//             </div>

//             <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
//                   Password
//                 </Label>
//                 <a
//                   href="/forgot-password"
//                   className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   autoComplete="current-password"
//                   placeholder="Enter your password"
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

//             {(error || authError) && (
//               <Alert variant="destructive" className="mt-4 animate-fadeIn">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>{error || authError}</AlertDescription>
//               </Alert>
//             )}

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full h-11 bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   Logging in...
//                 </>
//               ) : (
//                 <span className="flex items-center justify-center">
//                   <LogIn className="mr-2 h-5 w-5" />
//                   Login
//                 </span>
//               )}
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-center pb-6">
//           <div className="text-sm text-gray-600 dark:text-gray-300">
//             Don't have an account?{" "}
//             <a
//               href="/register"
//               className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
//               onClick={(e) => {
//                 e.preventDefault()
//                 navigate("/auth/register")
//               }}
//             >
//               Create an account
//             </a>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default LoginForm



import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, Loader2, LogIn, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Accessing authentication state from Redux store
  const { loading, error: authError } = useSelector((state) => state.auth);

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from || "/dashboard";

  useEffect(() => {
    // Animation effect on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      const role = result.user?.role?.toLowerCase();

      // Redirect based on user role
      if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "user") {
        navigate("/dashboard/user");
      } else {
        setError("Invalid user role");
      }
    } catch (err) {
      setError(err?.message || "Login failed. Please check your credentials.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-transparent dark:from-gray-900 dark:via-gray-850 dark:to-gray-900 transition-all duration-500">
      <Card
        className={`w-full max-w-md shadow-lg transition-all duration-500 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        } hover:shadow-xl`}
      >
        <CardHeader className="space-y-1 pb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 transform transition-transform duration-300 hover:scale-110">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">Welcome Back</CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                placeholder="name@example.com"
                className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              />
            </div>

            <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <a
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {(error || authError) && (
              <Alert variant="destructive" className="mt-4 animate-fadeIn">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error || authError}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
              onClick={(e) => {
                e.preventDefault();
                navigate("/auth/register");
              }}
            >
              Create an account
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
