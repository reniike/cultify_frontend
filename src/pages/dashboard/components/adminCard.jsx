import React from 'react';

const AdminCard = ({ admin }) => {
  return (
    <React.Fragment>
    <div className="admin-card">
      <h2>{admin.name}</h2>
      <p>Email: {admin.email}</p>
      <p>Role: {admin.role}</p>
      {/* Add additional admin information as needed */}
    </div>
    </React.Fragment>
  );
};

export default AdminCard;
