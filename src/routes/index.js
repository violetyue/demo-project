import Login from "../views/login/index";
import gongdan from "../views/admin/gongdan";
import wuliao from "../views/admin/wuliao";
import gongxu from "../views/admin/gongxu";
import danwei from "../views/admin/danwei";
import cipin from "../views/admin/cipin";
import yonghu from "../views/admin/yonghu";
import wuliaocreate from "../views/admin/wuliaocreate";
import gongxucreate from "../views/admin/gongxucreate";


export const loginRoutes= [
    {
        path: "/login",
        component: Login
    }
]

export const mainRoutes = [
    {
        path: "/admin/gongdan",
        component: gongdan,
        breadcrumbName: '生产管理 > 工单'
    }, {
        path: "/admin/wuliao",
        component: wuliao,
        breadcrumbName: '基础管理 > 物料'
    }, {
        path: "/admin/gongxu",
        component: gongxu,
        breadcrumbName: '基础管理 > 工序'
    }, {
        path: "/admin/danwei",
        component: danwei,
        breadcrumbName: '基础管理 > 单位'
    }, {
        path: "/admin/cipin",
        component: cipin,
        breadcrumbName: '基础管理 > 次品项'
    }, {
        path: "/admin/yonghu",
        component: yonghu,
        breadcrumbName: '系统管理 > 用户'
    }, {
        path: "/admin/wuliaocreate/:code?",
        component: wuliaocreate,
        breadcrumbName: '基础管理 > 物料 > 创建物料'
    }, {
        path: "/admin/gongxucreate/:code?",
        component: gongxucreate,
        breadcrumbName: '基础管理 > 工序 > 创建工序'
    }
]