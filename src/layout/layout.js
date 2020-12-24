import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { mainRoutes } from '../routes/index'
import {
    SolutionOutlined,
    LaptopOutlined,
    ReadOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './layout.css'

const { Sider, Content, Header } = Layout
const { SubMenu } = Menu

function layout(props) {
    const logout = ( 
        <Menu>
            <Menu.Item key='logOut'>
                <Link 
                  to="/login" 
                  onClick={()=>{localStorage.removeItem('auth')}}
                >退出
                </Link>
            </Menu.Item>
        </Menu>
    )
  
    const routes = mainRoutes
    function itemRender(route, params, routes, paths) {
        
        // const last = routes.indexOf(route) === routes.length - 1;
        // return last ? (
        //   <span>{route.breadcrumbName}</span>
        // ) : (
        //   <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        // );
        if (props.children._owner.pendingProps.location.pathname === route.path) {
            return(<span>{route.breadcrumbName}</span>)
        }
      }
    
      
    
    return (
        <Layout style={{minHeight: '100vh' }}>
            <Sider>
                <div className='logo'>
                    小工单
                </div>
                <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
                    
                    <SubMenu key='sub1' icon={<LaptopOutlined />} title='生产管理'>
                        <Menu.Item key='2'><Link to="/admin/gongdan">工单</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub2' icon={<ReadOutlined />} title='基础数据'>
                        <Menu.Item key='3'><Link to="/admin/wuliao">物料</Link></Menu.Item>
                        <Menu.Item key='4'><Link to="/admin/gongxu">工序</Link></Menu.Item>
                        <Menu.Item key='5'><Link to="/admin/danwei">单位</Link></Menu.Item>
                        <Menu.Item key='6'><Link to="/admin/cipin">次品项</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub3' icon={<LaptopOutlined />} title='系统配置'>
                        <Menu.Item key='7'><Link to="/admin/yonghu">用户</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className='container'>
                <Header className='site-header'>               
                    <Breadcrumb className='site-breadcrumb' itemRender={itemRender} routes={routes} />
                    <Dropdown overlay={logout}>
                        <div>
                            <UserOutlined />
                            <span>系统管理员</span>
                        </div>
                    </Dropdown>
                </Header>
                <Content>
                    <div>
                        {props.children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
    
}

export default layout