
import UserProfile from "./views/recruiter/UserProfile.js";
import Interviews from "./views/recruiter/Interviews.js";
import Jobs from "./views/recruiter/Jobs.js";
import AddJob from "./views/recruiter/JobForm.js";
import Applicants from "./views/recruiter/Applicants.js";
import People from "./views/recruiter/People.js";
import JobSeeker from "./views/recruiter/jobSeeker";
const dashboardRoutes = [

    {
   
    },
    {
        path: "/jobForm",
        name: "Add Job",
        icon: "nc-icon nc-simple-add",
        component: AddJob,
        layout: "/recruiter"
    },
    {
        path: "/jobs",
        name: "Posted jobs",
        icon: "nc-icon nc-bag",
        component: Jobs,
        layout: "/recruiter"
    },

    {
        path: "/user",
        name: "My Profile",
        icon: "nc-icon nc-badge",
        component: UserProfile,
        layout: "/recruiter"

    },

    {
        path: "/applicants",
        name: "Job Seekers",
        icon: "fas fa-user-friends",
        component: People,
        layout: "/recruiter"

    },

    {
        path: "/interviews/:id",
        component: Interviews,
        layout: "/recruiter"

    },
    {
        path: "/apps/:id",
        component: Applicants,
        layout: "/recruiter"

    },
    {
        path: "/details/:id",
        component: JobSeeker,
        layout: "/recruiter"

    },


];

export default dashboardRoutes;
