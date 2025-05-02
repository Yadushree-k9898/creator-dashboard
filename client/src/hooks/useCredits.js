"use client"

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creditService } from '@/services/creditService';
import { setCredits } from '@/store/slices/creditSlice';

export const useCredits = () => {
  const dispatch = useDispatch();
  const credits = useSelector((state) => state.credits.data);
  const loading = useSelector((state) => state.credits.loading);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await creditService.getUserCredits();
        dispatch(setCredits(response.data));
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };

    fetchCredits();
  }, [dispatch]);

  return { credits, loading };
};
