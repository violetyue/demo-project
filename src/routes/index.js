import login from "../views/login/index";
import homepage from "../views/admin/homepage";

export const loginRoutes= [
    {
        path: "/login",
        component: login
    }
]

export const mainRoutes = [
    {
        path: "/admin/homepage",
        component: homepage
    }
]