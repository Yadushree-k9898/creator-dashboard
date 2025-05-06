import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../redux/slices/authSlice"
import RegisterForm from "../../components/auth/RegisterForm"
import  Spinner  from "../../components/common/Spinner"
import  ErrorAlert  from "../../components/common/ErrorAlert"

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const { loading } = useSelector((state) => state.auth)

  const handleRegister = async (userData) => {
    try {
      const result = await dispatch(registerUser(userData)).unwrap()
      const role = result.user?.role?.toLowerCase()

      // Redirect based on user role
      if (role === "admin") {
        navigate("/dashboard/admin")
      } else {
        navigate("/dashboard/user")
      }
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {error && <ErrorAlert message={error} />}
      <RegisterForm onRegister={handleRegister} />
    </div>
  )
}

export default Register
