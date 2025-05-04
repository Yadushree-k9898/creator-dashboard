// // src/components/Auth/RegisterForm.jsx
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../../redux/slices/authSlice';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { AlertCircle, Loader2, UserPlus } from 'lucide-react';

// const RegisterForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user');
//   const [error, setError] = useState('');

//   const { loading, error: authError } = useSelector((state) => state.auth);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const userData = { name, email, password, role };

//     dispatch(registerUser(userData))
//       .unwrap()
//       .then(() => {
//         navigate('/login');
//       })
//       .catch((err) => {
//         setError(err?.message || 'Registration failed');
//       });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-yellow-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center text-emerald-600">
//             <div className="flex items-center justify-center gap-2">
//               <UserPlus className="h-6 w-6" />
//               Create an Account
//             </div>
//           </CardTitle>
//           <CardDescription className="text-center">
//             Enter your information to create a new account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 autoComplete="username"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="name@example.com"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 autoComplete="new-password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Create a password"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="role">Role</Label>
//               <Select value={role} onValueChange={setRole}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select your role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="user">User</SelectItem>
//                   <SelectItem value="admin">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {(error || authError) && (
//               <Alert variant="destructive" className="mt-4">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>
//                   {error || authError}
//                 </AlertDescription>
//               </Alert>
//             )}

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-emerald-600 hover:bg-emerald-700"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Creating Account...
//                 </>
//               ) : (
//                 'Create Account'
//               )}
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <div className="text-sm text-muted-foreground">
//             Already have an account?{" "}
//             <a 
//               href="/login" 
//               className="text-emerald-600 hover:text-emerald-700 hover:underline"
//               onClick={(e) => {
//                 e.preventDefault();
//                 navigate('/login');
//               }}
//             >
//               Login
//             </a>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default RegisterForm;


"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, UserPlus } from "lucide-react"

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")
  const [error, setError] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const { loading, error: authError } = useSelector((state) => state.auth)

  useEffect(() => {
    // Animation effect on mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = { name, email, password, role }

    dispatch(registerUser(userData))
      .unwrap()
      .then(() => {
        navigate("/login")
      })
      .catch((err) => {
        setError(err?.message || "Registration failed")
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-transparent dark:from-gray-900 dark:via-gray-850 dark:to-gray-900 transition-all duration-500">
      <Card
        className={`w-full max-w-md shadow-lg transition-all duration-500 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        } hover:shadow-xl`}
      >
        <CardHeader className="space-y-1 pb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 transform transition-transform duration-300 hover:scale-110">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Enter your information to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              />
            </div>

            <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              />
            </div>

            <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              />
            </div>

            <div className="space-y-2 transition-all duration-300 transform hover:translate-x-1">
              <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">
                Role
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
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
                  Creating Account...
                </>
              ) : (
                <span className="flex items-center justify-center">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Account
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
              onClick={(e) => {
                e.preventDefault()
                navigate("/login")
              }}
            >
              Login
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterForm
