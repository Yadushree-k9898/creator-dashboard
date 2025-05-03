"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserDashboard } from "../redux/slices/creditSlice"

export const useCredits = () => {
  const dispatch = useDispatch()

  const dashboard = useSelector((state) => state.credits.dashboard)
  const loading = useSelector((state) => state.credits.loading)
  const error = useSelector((state) => state.credits.error)

  useEffect(() => {
    dispatch(fetchUserDashboard())
  }, [dispatch])

  return {
    dashboard,
    loading,
    error,
    creditStats: dashboard?.creditStats || {},
    engagementStats: dashboard?.engagementStats || {},
    posts: dashboard?.posts || {},
  }
}
