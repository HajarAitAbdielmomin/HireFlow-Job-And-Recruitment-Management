
import UserProfile from "./views/applicant/UserProfile.js";
import Educations from "./views/applicant/Educations.js";
import Projects from "./views/applicant/Projects.js";
import Jobs from "./views/applicant/Jobs.js";
import Applications from "./views/applicant/Applications.js";
import Interviews from "./views/applicant/Interviews.js";
import InterviewResult from "./views/applicant/InterviewResult.js"
const dashboardRoutes = [

    {
    },
    {
        path: "/jobs",
        name: "Jobs",
        icon: "nc-icon nc-bag ",
        component: Jobs,
        layout: "/applicant"
    },
    {
        path: "/applications",
        name: "Applications",
        icon: "nc-icon nc-single-copy-04",
        component: Applications,
        layout: "/applicant"
    },
    {
        path: "/interviews",
        name: "Interviews",
        icon: "nc-icon nc-notification-70",
        component: Interviews,
        layout: "/applicant"
    },
    {
        path: "/educations",
        name: "Educations",
        icon: "nc-icon nc-backpack ",
        component: Educations,
        layout: "/applicant"
    },
    {
        path: "/projects",
        name: "Projects",
        icon: "nc-icon nc-bulb-63",
        component: Projects,
        layout: "/applicant"
    },
    {
        path: "/user",
        name: "My Profile",
        icon: "nc-icon nc-badge",
        component: UserProfile,
        layout: "/applicant"

    },
    {
        path: "/result/:idI",
        component: InterviewResult,
        layout: "/applicant"

    },



];

export default dashboardRoutes;
