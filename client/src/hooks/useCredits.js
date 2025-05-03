// hooks/useCredits.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDashboard } from "@/redux/slices/creditSlice";

export const useCredits = () => {
  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.credits.dashboard);
  const loading = useSelector((state) => state.credits.loading);
  const error = useSelector((state) => state.credits.error);

  useEffect(() => {
    dispatch(fetchUserDashboard());
  }, [dispatch]);

  const creditStats = dashboard?.creditStats
    ? {
        totalCredits: Number(dashboard.creditStats.totalCredits || 0),
        // loginCredits: Number(dashboard.creditStats.loginPoints || 0),
        // profileCredits: Number(dashboard.creditStats.profileCompletionPoints || 0),
        // interactionCredits: Number(dashboard.creditStats.interactionPoints || 0),
      }
    : null;

  return {
    credits: creditStats,
    loading,
    error,
  };
};
