import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/slices/adminSlice';
import UserTable from '../../components/admin/UserTable';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <UserTable users={users} />
    </div>
  );
};

export default AdminDashboard;
