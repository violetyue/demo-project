import login from "../views/login/index";
import homepage from "../views/admin/homepage";
import gongdan from "../views/admin/gongdan";
import wuliao from "../views/admin/wuliao";
import gongxu from "../views/admin/gongxu";

export const loginRoutes= [
    {
        path: "/login",
        component: login
    }
]

export const mainRoutes = [
    {
        path: "/admin/homepage",
        component: homepage,
        breadcrumbName: '主页'
    }, {
        path: "/admin/gongdan",
        component: gongdan,
        breadcrumbName: '生产管理/工单'
    }, {
        path: "/admin/wuliao",
        component: wuliao,
        breadcrumbName: '基础管理/物料'
    }, {
        path: "/admin/gongxu",
        component: gongxu,
        breadcrumbName: '基础管理/数据'
    }
]