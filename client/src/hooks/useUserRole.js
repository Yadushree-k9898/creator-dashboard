// src/hooks/useUserRole.js

import { useEffect, useState } from "react";
import { USER_KEY } from "../utils/constants"; // Import constants where you store user data in localStorage

const useUserRole = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage or context
    const user = JSON.parse(localStorage.getItem(USER_KEY));

    // If user exists and role is 'admin', set isAdmin to true
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  return { isAdmin };
};

export { useUserRole };
