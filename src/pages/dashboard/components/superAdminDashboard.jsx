import TopNav from './topNav';
import '../styles/superAdminDashboard.css';

const SuperAdminDashboard = ({content}) => {
  const topNavLinks = [
      {
        "name": "Dashboard",
        "url": "/super-admin/dashboard"
      },
      {
        "name": "Profile",
        "url": "/profile"
      },
      {
        "name": "Logout",
        "url": "/logout"
      }
    ];


  return (
    <div className="cultify-super-admin-dashboard">
        <TopNav links={topNavLinks}/>
        {content}
    </div>
  );
};

export default SuperAdminDashboard;
