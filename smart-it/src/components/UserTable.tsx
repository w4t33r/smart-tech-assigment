import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { DataTable } from './DataTable/DataTable';
import { columns } from './DataTable/components/DataTableColumns';
import { fetchUsers } from '@/slices/userSlice';

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <DataTable data={users} columns={columns} />}
    </div>
  );
};

export default UserTable;
