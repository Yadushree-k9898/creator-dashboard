// // src/hooks/useAuth.js
// import { useSelector } from "react-redux"

// export const useAuth = () => {
//   const user = useSelector((state) => state.auth.user)
//   const isAuthenticated = Boolean(user)

//   return { user, isAuthenticated }
// }


"use client"

// src/hooks/useAuth.js
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchCurrentUser } from "../redux/slices/authSlice"

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, token, loading, error } = useSelector((state) => state.auth)
  const isAuthenticated = Boolean(user && token)

  // Fetch current user on mount if we have a token but no user
  useEffect(() => {
    if (token && !user && !loading) {
      dispatch(fetchCurrentUser())
    }
  }, [token, user, loading, dispatch])

  return {
    user,
    isAuthenticated,
    isLoading: loading,
    error,
  }
}
