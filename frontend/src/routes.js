
import Dashboard from "./views/admin/Dashboard.js";
import UserProfile from "./views/admin/UserProfile.js";
import Recruiters from "./views/admin/Recruiters.js";
import Applicants from "./views/admin/Applicants.js";
import UserForm from "./views/admin/userForm.js";

const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/addUser",
    name: "add User",
    icon: "nc-icon nc-simple-add",
    component: UserForm,
    layout: "/admin"
  },
  {
    path: "/recuiters",
    name: "Recruiters",
    icon: "nc-icon nc-circle-09",
    component: Recruiters,
    layout: "/admin"
  },
  {
    path: "/applicants",
    name: "Applicants",
    icon: "nc-icon nc-circle-09",
    component: Applicants,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "UserProfile",
    icon: "nc-icon nc-badge",
    component: UserProfile,
    layout: "/admin"

  },
  {
  },


];

export default dashboardRoutes;
