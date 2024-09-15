import React from 'react';
import UserTable from '@/components/UserTable.tsx';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users Dashboard</h1>
      <UserTable />
    </div>
  );
};

export default App;
